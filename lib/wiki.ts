export type WikiArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  tags: string[];
};

export const wikiArticles: WikiArticle[] = [
  {
    slug: "mikrotik-basic-troubleshooting",
    title: "عیب‌یابی اولیه MikroTik",
    category: "شبکه",
    excerpt: "چک‌لیست سریع برای بررسی مشکل اتصال و سرویس‌های پایه در MikroTik.",
    tags: ["mikrotik", "router", "network", "شبکه"],
    content: [
      "ابتدا وضعیت لینک‌ها، IPها و Routeها را بررسی کنید.",
      "در ادامه DNS و Gateway را بررسی کنید و با یک مقصد مشخص تست Ping بگیرید.",
      "اگر مشکل فقط برای یک شبکه یا VLAN است، Bridge، VLAN و مسیرهای مربوط به همان بخش را بررسی کنید."
    ]
  },
  {
    slug: "dns-troubleshooting",
    title: "عیب‌یابی DNS",
    category: "Troubleshooting",
    excerpt: "مراحل بررسی خطاهای DNS در شبکه‌های سازمانی.",
    tags: ["dns", "network", "troubleshooting"],
    content: [
      "ابتدا مشخص کنید مشکل برای همه کاربران است یا فقط یک سیستم.",
      "Resolve شدن نام دامنه را از کلاینت و از سرور DNS بررسی کنید.",
      "اگر IP مقصد قابل دسترسی است اما نام دامنه Resolve نمی‌شود، DNS را از مسیر شبکه جداگانه بررسی کنید."
    ]
  },
  {
    slug: "windows-network-basics",
    title: "بررسی تنظیمات شبکه در Windows",
    category: "Windows",
    excerpt: "چک‌لیست IP، Gateway، DNS و تست اتصال در Windows.",
    tags: ["windows", "ip", "dns", "gateway"],
    content: [
      "با ipconfig وضعیت آدرس IP، Subnet Mask، Default Gateway و DNS را بررسی کنید.",
      "ابتدا Gateway و سپس یک IP مقصد را Ping کنید.",
      "در مرحله بعد یک نام دامنه را تست کنید تا مشخص شود مشکل از اتصال است یا DNS."
    ]
  },
  {
    slug: "raspberry-pi-network",
    title: "راه‌اندازی شبکه روی Raspberry Pi",
    category: "Raspberry Pi",
    excerpt: "مراحل پایه برای بررسی و راه‌اندازی اتصال شبکه در Raspberry Pi.",
    tags: ["raspberry pi", "linux", "network"],
    content: [
      "ابتدا وضعیت Interface شبکه و آدرس IP را بررسی کنید.",
      "Gateway پیش‌فرض و DNS را کنترل کنید.",
      "برای سرویس‌های ثابت، تنظیمات شبکه را مستند و قبل از اعمال تغییرات، وضعیت فعلی را ثبت کنید."
    ]
  },
  {
    slug: "network-troubleshooting-checklist",
    title: "چک‌لیست عمومی عیب‌یابی شبکه",
    category: "Troubleshooting",
    excerpt: "یک ترتیب مرحله‌ای برای پیدا کردن سریع محل خرابی در شبکه.",
    tags: ["network", "troubleshooting", "checklist"],
    content: [
      "از لایه فیزیکی شروع کنید: برق، کابل، لینک و وضعیت پورت.",
      "سپس IP، Subnet، Gateway و Route را بررسی کنید.",
      "در پایان DNS و سرویس مقصد را بررسی کنید. هر مرحله را جداگانه تست کنید تا محل خرابی مشخص شود."
    ]
  }
];

export function searchWiki(query: string) {
  const terms = query.toLowerCase().trim().split(/\\s+/).filter(Boolean);
  if (!terms.length) return wikiArticles;

  return wikiArticles
    .map((article) => {
      const haystack = [article.title, article.category, article.excerpt, ...article.tags, ...article.content]
        .join(" ")
        .toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { article, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ article }) => article);
}

export function getWikiArticle(slug: string) {
  return wikiArticles.find((article) => article.slug === slug);
}
