import type { Metadata } from "next";
import WikiSearch from "./wiki-search";

const description =
  "دانش‌نامه فنی شبکه و زیرساخت شامل راهنماهای DNS، Windows، Linux، MikroTik و عیب‌یابی IT.";

export const metadata: Metadata = {
  title: "دانش‌نامه فنی | رامین فیاض‌زاده",
  description,
  alternates: {
    canonical: "/wiki",
  },
  openGraph: {
    type: "website",
    url: "https://fayyazzadeh.ir/wiki",
    title: "دانش‌نامه فنی | رامین فیاض‌زاده",
    description,
    locale: "fa_IR",
  },
};

export default function WikiPage() {
  return <WikiSearch />;
}
