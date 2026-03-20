import { useEffect, useState } from "react";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

export default function LatestInsights() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/punch-news");
        const data: Article[] = await res.json();
        setArticles(data.slice(0, 3)); // Only top 3 for homepage
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section>
      <h2>Latest Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <a
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-lg hover:underline"
            >
              {article.title}
            </a>
            <p className="text-sm mt-2">{article.contentSnippet}</p>
            <small className="text-xs text-gray-500">{article.pubDate}</small>
          </div>
        ))}
      </div>
    </section>
  );
}