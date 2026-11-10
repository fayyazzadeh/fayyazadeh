import type { Metadata } from "next";
import OfficeComputerChecklist from "./office-computer-checklist";
import "../wiki.css";

export const metadata: Metadata = {
  title: "چک‌لیست نصب و آماده‌سازی کامپیوتر اداری | دانش‌نامه فنی",
  description: "چک‌لیست عمومی و قابل ذخیره برای نصب ویندوز، درایورها، نرم‌افزارهای اداری، شبکه، امنیت و تحویل کامپیوتر.",
  alternates: { canonical: "/wiki/checklists/office-computer-setup" },
  openGraph: {
    type: "article",
    url: "https://fayyazzadeh.ir/wiki/checklists/office-computer-setup",
    title: "چک‌لیست نصب و آماده‌سازی کامپیوتر اداری",
    description: "راهنمای مرحله‌به‌مرحله آماده‌سازی و تحویل سیستم‌های اداری.",
    locale: "fa_IR",
  },
};

export default function OfficeComputerSetupPage() {
  return <OfficeComputerChecklist />;
}
