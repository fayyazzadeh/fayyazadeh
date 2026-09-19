import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "رامین فیاض‌زاده | IT Specialist | Network & Infrastructure",
  description:
    "وب‌سایت شخصی رامین فیاض‌زاده؛ متخصص فناوری اطلاعات، شبکه، زیرساخت و پشتیبانی فنی با بیش از ۱۵ سال تجربه.",
  keywords: ["رامین فیاض‌زاده", "IT", "Network", "Infrastructure", "MikroTik", "VMware", "Linux", "Knowledge Base"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
