import type { Metadata } from "next";
import Link from "next/link";
import "./../wiki.css";

export const metadata: Metadata = {
  title: "چک‌لیست‌های اجرایی IT | دانش‌نامه فنی",
  description: "چک‌لیست‌های عمومی برای آماده‌سازی، نصب، پشتیبانی و تحویل تجهیزات فناوری اطلاعات.",
  alternates: { canonical: "/wiki/checklists" },
};

export default function ChecklistsPage() {
  return (
    <main className="wiki-shell">
      <header className="wiki-header">
        <Link className="wiki-brand" href="/">RF<span>.</span></Link>
        <div><div className="wiki-kicker">IT RUNBOOKS</div><h1>چک‌لیست‌های اجرایی</h1><p>راهنماهای مرحله‌به‌مرحله برای انجام و کنترل کارهای روزمره IT.</p></div>
        <Link className="wiki-chat-link" href="/wiki">بازگشت به دانش‌نامه</Link>
      </header>
      <section className="wiki-grid checklist-index-grid">
        <Link className="wiki-card" href="/wiki/checklists/office-computer-setup">
          <div className="wiki-card-meta">WORKSTATION · HELPDESK</div>
          <h2>نصب و آماده‌سازی کامپیوتر اداری</h2>
          <p>از بررسی سخت‌افزار و نصب ویندوز تا درایورها، نرم‌افزارها، شبکه، امنیت و تحویل نهایی به کاربر.</p>
          <span className="checklist-card-link">مشاهده و اجرای چک‌لیست ←</span>
        </Link>
      </section>
    </main>
  );
}
