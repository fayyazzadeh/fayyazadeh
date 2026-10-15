import type { Metadata } from "next";
import HomePage from "./home-page";

const title = "رامین فیاض‌زاده | IT Specialist | Network & Infrastructure";
const description =
  "وب‌سایت شخصی رامین فیاض‌زاده؛ متخصص فناوری اطلاعات، شبکه، زیرساخت و پشتیبانی فنی با بیش از ۱۵ سال تجربه.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://fayyazzadeh.ir/",
    siteName: "رامین فیاض‌زاده",
    title,
    description,
    locale: "fa_IR",
  },
};

export default function Page() {
  return <HomePage />;
}
