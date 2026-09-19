import { NextResponse } from "next/server";
import { Resend } from "resend";
import { searchWiki } from "@/lib/wiki";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ answer: "لطفاً سؤال یا شرح مشکل را وارد کنید." }, { status: 400 });
  }

  const results = searchWiki(message);

  if (results.length) {
    const article = results[0];
    return NextResponse.json({
      answer: `یک مطلب مرتبط پیدا کردم: «${article.title}»\\n\\n${article.content.join("\\n\\n")}\\n\\nمطالعه کامل: /wiki/${article.slug}`
    });
  }

  if (process.env.RESEND_API_KEY) {
    await resend.emails.send({
      from: "Wiki Support <website@fayyazzadeh.ir>",
      to: ["ramin@fayyazzadeh.ir"],
      subject: "🚨 درخواست بررسی از دستیار دانش‌نامه",
      text: `درخواست جدید از fayyazzadeh.ir/wiki/chat\\n\\nپیام کاربر:\\n${message}\\n`
    });
  }

  return NextResponse.json({
    answer: "برای این سؤال در دانش‌نامه پاسخ کافی پیدا نکردم. درخواست برای بررسی انسانی ثبت شد و در صورت فعال بودن تنظیمات ایمیل، اطلاع‌رسانی برای مدیر ارسال شده است."
  });
}
