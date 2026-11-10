"use client";

import { useEffect, useMemo, useState } from "react";
import { clearChecklist, loadChecklist, saveChecklist, type ChecklistProgress } from "@/lib/checklist-storage.mjs";

const checklistId = "office-computer-setup";
const groups = [
  {
    id: "hardware",
    title: "۱. بررسی اولیه سخت‌افزار",
    description: "قبل از نصب، وضعیت فیزیکی و مشخصات دستگاه را ثبت کنید.",
    items: [
      "مدل دستگاه، پردازنده، RAM و ظرفیت ذخیره‌سازی ثبت شد.",
      "سلامت SSD یا HDD بررسی شد.",
      "مانیتور، کیبورد، ماوس، آداپتور و کابل‌ها بررسی شدند.",
      "شماره اموال یا شناسه دارایی ثبت شد.",
      "از اطلاعات قبلی نسخه پشتیبان تهیه شد یا تأیید شد که اطلاعاتی برای نگهداری وجود ندارد."
    ]
  },
  {
    id: "windows",
    title: "۲. نصب و پیکربندی ویندوز",
    description: "نسخه و روش نصب باید با استاندارد و مجوزهای سازمان مطابقت داشته باشد.",
    items: [
      "نسخه و ادیشن ویندوز متناسب با نیاز سازمان انتخاب شد.",
      "پیش از پارتیشن‌بندی، مقصد نصب و اطلاعات قابل حذف دوباره بررسی شد.",
      "ویندوز از رسانه معتبر نصب شد.",
      "نام کامپیوتر طبق الگوی نام‌گذاری سازمان تنظیم شد.",
      "منطقه زمانی، زبان و صفحه‌کلید تنظیم شدند.",
      "فعال‌سازی ویندوز با مجوز معتبر بررسی شد."
    ]
  },
  {
    id: "drivers",
    title: "۳. درایورها و به‌روزرسانی",
    description: "درایورها را از Windows Update یا وب‌سایت رسمی سازنده دریافت کنید.",
    items: [
      "درایور Chipset نصب و بررسی شد.",
      "درایور گرافیک نصب شد.",
      "درایور LAN و Wi-Fi نصب و آزمایش شد.",
      "درایور صدا و تجهیزات جانبی نصب شد.",
      "Windows Update اجرا و به‌روزرسانی‌های ضروری نصب شدند.",
      "Device Manager از نظر دستگاه ناشناخته یا خطادار بررسی شد."
    ]
  },
  {
    id: "software",
    title: "۴. نرم‌افزارهای عمومی و سازمانی",
    description: "فقط نرم‌افزارهای مورد تأیید سازمان و دارای مجوز معتبر نصب شوند.",
    items: [
      "مرورگر مورد تأیید سازمان نصب و به‌روز شد.",
      "مجموعه Office یا جایگزین مجاز نصب و فعال‌سازی شد.",
      "PDF Reader مورد تأیید نصب شد.",
      "ابزار فشرده‌سازی فایل نصب شد.",
      "نرم‌افزارهای ارتباطی و جلسات موردنیاز نصب شدند.",
      "نرم‌افزار حسابداری، اتوماسیون یا برنامه‌های تخصصی واحد نصب شدند.",
      "نسخه، منبع نصب و وضعیت مجوز نرم‌افزارهای مهم ثبت شد."
    ]
  },
  {
    id: "network",
    title: "۵. شبکه و تجهیزات اداری",
    description: "دسترسی‌ها را مطابق سیاست شبکه و حداقل سطح دسترسی لازم تنظیم کنید.",
    items: [
      "اتصال شبکه کابلی یا Wi-Fi آزمایش شد.",
      "تنظیم DHCP یا IP ثابت مطابق مستندات انجام شد.",
      "DNS و دسترسی به سرویس‌های داخلی بررسی شد.",
      "عضویت در Domain یا Entra ID در صورت نیاز و با مجوز انجام شد.",
      "چاپگر و اسکنر نصب و تست چاپ/اسکن انجام شد.",
      "دسترسی به فایل‌سرور، پوشه‌های اشتراکی و سامانه‌های سازمان بررسی شد."
    ]
  },
  {
    id: "security",
    title: "۶. امنیت و حفاظت اطلاعات",
    description: "رمزها و کلیدهای بازیابی را در چک‌لیست یا یادداشت عمومی وارد نکنید.",
    items: [
      "Windows Defender یا راهکار امنیتی مصوب فعال و به‌روز است.",
      "Windows Firewall فعال است و استثناهای غیرضروری وجود ندارد.",
      "حساب کاربری روزمره دسترسی Administrator غیرضروری ندارد.",
      "قفل صفحه و سیاست رمز عبور سازمان اعمال شد.",
      "BitLocker یا رمزگذاری مصوب در صورت نیاز فعال و کلید بازیابی در مخزن امن سازمان نگهداری شد.",
      "برنامه‌های غیرضروری و ابزارهای ناشناس حذف شدند."
    ]
  },
  {
    id: "handover",
    title: "۷. تست نهایی و تحویل",
    description: "قبل از تحویل، سیستم را با سناریوی واقعی کاربر آزمایش کنید.",
    items: [
      "سیستم حداقل یک بار راه‌اندازی مجدد شد و خطای غیرعادی ندارد.",
      "ورود کاربر و دسترسی به برنامه‌های موردنیاز آزمایش شد.",
      "اینترنت، شبکه داخلی، چاپگر و فایل‌های اشتراکی تست شدند.",
      "صدا، تصویر، وب‌کم و تجهیزات موردنیاز کاربر آزمایش شدند.",
      "مشخصات نهایی سیستم و نرم‌افزارهای نصب‌شده ثبت شدند.",
      "کاربر نهایی سیستم را تحویل گرفت و آموزش اولیه ارائه شد."
    ]
  }
];

const emptyProgress: ChecklistProgress = { checked: {}, details: {} };

export default function OfficeComputerChecklist() {
  const [progress, setProgress] = useState<ChecklistProgress>(emptyProgress);
  const [loaded, setLoaded] = useState(false);
  const [savedAt, setSavedAt] = useState("");
  const total = useMemo(() => groups.reduce((sum, group) => sum + group.items.length, 0), []);
  const completed = Object.values(progress.checked).filter(Boolean).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  useEffect(() => {
    const stored = loadChecklist(window.localStorage, checklistId);
    if (stored) setProgress({ checked: stored.checked ?? {}, details: stored.details ?? {} });
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      saveChecklist(window.localStorage, checklistId, progress);
      setSavedAt(new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }));
    } catch {
      setSavedAt("ذخیره‌سازی در این مرورگر در دسترس نیست");
    }
  }, [loaded, progress]);

  function updateDetail(name: string, value: string) {
    setProgress((current) => ({ ...current, details: { ...current.details, [name]: value } }));
  }

  function toggleItem(key: string, checked: boolean) {
    setProgress((current) => ({ ...current, checked: { ...current.checked, [key]: checked } }));
  }

  function resetChecklist() {
    if (!window.confirm("همه تیک‌ها و مشخصات ثبت‌شده برای این چک‌لیست پاک شود؟")) return;
    clearChecklist(window.localStorage, checklistId);
    setProgress(emptyProgress);
  }

  return (
    <main className="wiki-shell checklist-shell">
      <header className="article-top checklist-top">
        <a href="/wiki">← بازگشت به دانش‌نامه</a>
        <a href="/wiki/checklists">همه چک‌لیست‌ها</a>
      </header>

      <section className="checklist-hero">
        <div className="wiki-kicker">PUBLIC IT RUNBOOK · WORKSTATION</div>
        <h1>چک‌لیست نصب و آماده‌سازی کامپیوتر اداری</h1>
        <p>راهنمای مرحله‌به‌مرحله کارشناس IT برای نصب ویندوز، درایورها، نرم‌افزارها، شبکه، امنیت و تحویل سیستم به کاربر.</p>
        <div className="checklist-notice"><strong>نکته امنیتی:</strong> پیش از نصب مجدد یا پارتیشن‌بندی، از اطلاعات موردنیاز نسخه پشتیبان تهیه کنید. رمز عبور، سریال محرمانه و کلید بازیابی را در این فرم ثبت نکنید.</div>
      </section>

      <section className="checklist-details">
        <h2>مشخصات سیستم و تحویل</h2>
        <div className="checklist-fields">
          <label>نام کامپیوتر<input value={progress.details.computerName ?? ""} onChange={(e) => updateDetail("computerName", e.target.value)} placeholder="مثلاً OFFICE-01" /></label>
          <label>شماره اموال / دارایی<input value={progress.details.assetTag ?? ""} onChange={(e) => updateDetail("assetTag", e.target.value)} placeholder="شناسه دارایی" /></label>
          <label>نام کاربر یا واحد<input value={progress.details.userOrUnit ?? ""} onChange={(e) => updateDetail("userOrUnit", e.target.value)} placeholder="نام کاربر یا واحد سازمانی" /></label>
          <label>نام کارشناس<input value={progress.details.technician ?? ""} onChange={(e) => updateDetail("technician", e.target.value)} placeholder="نام کارشناس IT" /></label>
          <label>مدل و مشخصات دستگاه<input value={progress.details.deviceModel ?? ""} onChange={(e) => updateDetail("deviceModel", e.target.value)} placeholder="مدل، CPU، RAM و SSD" /></label>
          <label>توضیحات تحویل<input value={progress.details.notes ?? ""} onChange={(e) => updateDetail("notes", e.target.value)} placeholder="توضیحات یا موارد باقی‌مانده" /></label>
        </div>
      </section>

      <section className="checklist-progress" aria-live="polite">
        <div><strong>پیشرفت چک‌لیست</strong><b>{percent}٪</b></div>
        <div className="checklist-progress-track"><span style={{ width: percent + "%" }} /></div>
        <small>{completed} از {total} مرحله انجام شده · {loaded ? (savedAt ? "ذخیره خودکار فعال است · آخرین ذخیره " + savedAt : "در حال آماده‌سازی ذخیره‌سازی") : "در حال بارگذاری اطلاعات ذخیره‌شده..."}</small>
      </section>

      <div className="checklist-groups">
        {groups.map((group) => {
          const groupDone = group.items.filter((_, index) => progress.checked[group.id + "-" + index]).length;
          return (
            <section className="checklist-group" key={group.id}>
              <div className="checklist-group-heading"><div><h2>{group.title}</h2><p>{group.description}</p></div><span>{groupDone}/{group.items.length}</span></div>
              <div className="checklist-items">
                {group.items.map((item, index) => {
                  const key = group.id + "-" + index;
                  return <label className={"checklist-item" + (progress.checked[key] ? " is-checked" : "")} key={key}>
                    <input type="checkbox" checked={!!progress.checked[key]} onChange={(event) => toggleItem(key, event.target.checked)} />
                    <span>{item}</span>
                  </label>;
                })}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="checklist-actions">
        <p>وضعیت این چک‌لیست به‌صورت محلی در همین مرورگر ذخیره می‌شود و به سرور ارسال نمی‌شود. برای ادامه کار روی دستگاه یا مرورگر دیگر، فعلاً از خروجی چاپی استفاده کنید.</p>
        <div><button type="button" onClick={() => window.print()}>چاپ / ذخیره PDF</button><button className="secondary" type="button" onClick={resetChecklist}>شروع مجدد</button></div>
      </footer>
    </main>
  );
}
