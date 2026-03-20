import { useEffect, useState } from "react";

interface Article {
  title: string;
  link: string;
  pubDate: string;
}

const PunchNewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://punchng.com/feed/"
      );
      const data = await res.json();

      const formatted = data.items.slice(0, 6).map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
      }));

      setArticles(formatted);
    } catch (error) {
      console.error("Error fetching Punch news:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNews();

    // Refresh every 30 minutes (1800000 ms)
    const interval = setInterval(fetchNews, 3600000);

    // Cleanup to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.map((post, i) => (
        <a
          key={i}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-semibold px-3 py-1 rounded-full mb-3">
            Punch News
          </span>

          <h3 className="text-lg font-heading font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-xs">
            {new Date(post.pubDate).toDateString()}
          </p>
        </a>
      ))}
    </div>
  );
};

export default PunchNewsFeed;