import { useEffect, useState } from "react";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  source: string;
}

const SOURCES = [
  { name: "Punch", url: "https://punchng.com/feed/" },
  { name: "Guardian Nigeria", url: "https://guardian.ng/feed/" },
  { name: "Vanguard", url: "https://www.vanguardngr.com/feed/" },
  { name: "BusinessDay", url: "https://businessday.ng/feed/" },
];

const stripHtml = (html: string) =>
  html?.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim() ?? "";

export default function LatestInsights() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const results = await Promise.allSettled(
          SOURCES.map((s) =>
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(s.url)}`)
              .then((r) => r.json())
              .then((d) =>
                (d.items || []).slice(0, 3).map((item: any) => ({
                  title: item.title,
                  link: item.link,
                  pubDate: new Date(item.pubDate).toDateString(),
                  contentSnippet: stripHtml(item.description).slice(0, 160),
                  source: s.name,
                }))
              )
          )
        );

        const merged = results
          .filter((r): r is PromiseFulfilledResult<Article[]> => r.status === "fulfilled")
          .flatMap((r) => r.value);

        setArticles(merged.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-2xl font-heading font-bold mb-6">Latest Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.link}
            target="_blank"
            rel="noreferrer"
            className="block p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/20 transition-all"
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-semibold px-3 py-1 rounded-full mb-3">
              {article.source}
            </span>
            <h3 className="font-heading font-semibold text-card-foreground mb-2 leading-snug">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{article.contentSnippet}</p>
            <small className="text-xs text-muted-foreground">{article.pubDate}</small>
          </a>
        ))}
      </div>
    </section>
  );
}
