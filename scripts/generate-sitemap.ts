import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://adracconsulting.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/training", changefreq: "weekly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/founder", changefreq: "monthly", priority: "0.7" },
  { path: "/insights", changefreq: "weekly", priority: "0.7" },
  { path: "/case-studies", changefreq: "monthly", priority: "0.7" },
  { path: "/collaborations", changefreq: "monthly", priority: "0.7" },
  { path: "/adrac-business-school", changefreq: "monthly", priority: "0.8" },
  { path: "/defact-consult", changefreq: "monthly", priority: "0.8" },
  { path: "/defact-confywills", changefreq: "monthly", priority: "0.8" },
  { path: "/calebs-apartments", changefreq: "weekly", priority: "0.8" },
  { path: "/calebs-apartments/book", changefreq: "weekly", priority: "0.7" },
  { path: "/media-gallery", changefreq: "monthly", priority: "0.6" },
  { path: "/jobs", changefreq: "daily", priority: "0.7" },
  { path: "/jobs/post", changefreq: "monthly", priority: "0.6" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
