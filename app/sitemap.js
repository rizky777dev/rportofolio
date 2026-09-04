const SITE_URL = "https://rizkyirawan.rcl.biz.id"; // ganti dengan domain asli saat deploy

export default function sitemap() {
  const sections = [
    "",
    "#about",
    "#skills",
    "#journey",
    "#projects",
    "#services",
    "#playground",
    "#faq",
    "#contact",
  ];

  return sections.map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
