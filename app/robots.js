const SITE_URL = "https://rizkyirawan.rcl.biz.id"; // ganti dengan domain asli saat deploy

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
