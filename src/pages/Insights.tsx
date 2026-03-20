import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, BookOpen, Calendar, Tag } from "lucide-react";

// Categories (existing)
const categories = ["All", "IFRS Standards", "Governance", "Audit", "Public Sector", "Tax", "Ethics", "Forensics"];

interface Article {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  category?: string;
}

const Insights = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Article | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/punch-news");
        const data: Article[] = await res.json();

        if (data.length > 0) {
          setFeaturedPost(data[0]); // first item as featured
          setArticles(data.slice(1)); // rest for grid
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Layout>
      <section className="relative py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4"
          >
            Insights & Resources
          </motion.h1>
          <p className="text-xl text-primary-foreground/80">
            Expert perspectives on finance, governance, and professional development.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-8 md:p-12 mb-12"
            >
              <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-semibold px-3 py-1 rounded-full mb-4">
                {featuredPost.category || "Latest News"}
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-card-foreground mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {featuredPost.contentSnippet}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {featuredPost.pubDate}
                </span>
              </div>
            </motion.div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-heading font-medium transition-all ${
                  cat === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {articles.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
              >
                <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-semibold px-3 py-1 rounded-full mb-3">
                  {post.category || "News"}
                </span>
                <h3 className="font-heading font-semibold text-card-foreground mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground">{post.pubDate}</p>
              </motion.div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="bg-primary rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-2">Stay Informed</h3>
            <p className="text-primary-foreground/70 mb-6">
              Subscribe to receive our latest insights, training updates, and industry news.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold/90 text-gold-foreground font-heading font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Insights;