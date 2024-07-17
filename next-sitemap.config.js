const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
module.exports = {
  changefreq: "daily",
  sitemapSize: 5000,
  generateRobotsTxt: true,
  siteUrl,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/preview"],
      },
    ],
    // additionalSitemaps: [`${siteUrl}/sitemap-0.xml`],
  },
  exclude: ["/preview"],
};
