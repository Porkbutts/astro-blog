export const SITE = {
  website: "https://adriant.io/",
  author: "Adrian Teng-Amnuay",
  profile: "https://github.com/Porkbutts",
  desc: "Systems-level AI automation practitioner. Building agent-driven workflows, tools, and infrastructure.",
  title: "Adrian Teng-Amnuay",
  ogImage: "og-default.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/Porkbutts/Porkbutts.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/Los_Angeles", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
