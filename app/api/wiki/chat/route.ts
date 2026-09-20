import { NextResponse } from "next/server";
import { Resend } from "resend";
import { searchWiki } from "@/lib/wiki";

function createTicketId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `WIKI-${timestamp}-${random}`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const submitTicket = body.submitTicket === true;

  if (!message) {
    return NextResponse.json({ answer: "لطفاً سؤال یا شرح مشکل را وارد کنید." }, { status: 400 });
  }

  if (submitTicket) {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!name) {
      return NextResponse.json({ answer: "لطفاً نام خود را وارد کنید." }, { status: 400 });
    }

    if (!email && !phone) {
      return NextResponse.json({ answer: "لطفاً حداقل ایمیل یا شماره تماس خود را وارد کنید." }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ answer: "لطفاً یک ایمیل معتبر وارد کنید." }, { status: 400 });
    }

    const ticketId = createTicketId();
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const { error } = await resend.emails.send({
        from: "Wiki Support <wiki@fayyazzadeh.ir>",
        to: ["ramin@fayyazzadeh.ir"],
        subject: `[${ticketId}] درخواست پشتیبانی جدید از دانش‌نامه`,
        text: [
          "درخواست جدید از fayyazzadeh.ir/wiki/chat",
          "",
          `شماره درخواست: ${ticketId}`,
          `نام: ${name}`,
          `ایمیل: ${email || "-"}`,
          `شماره تماس: ${phone || "-"}`,
          "",
          "سؤال / مشکل کاربر:",
          message,
          "",
          `زمان ثبت: ${new Date().toISOString()}`,
        ].join("\n"),
      });

      if (error) {
        console.error("Wiki support email error:", error);
        return NextResponse.json(
          { answer: "ثبت درخواست انجام نشد. لطفاً دوباره تلاش کنید." },
          { status: 500 },
        );
      }
    } else {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { answer: "تنظیمات ارسال ایمیل کامل نیست. لطفاً بعداً دوباره تلاش کنید." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      answer: `درخواست شما با شماره ${ticketId} ثبت شد. در اولین فرصت با اطلاعاتی که وارد کردید با شما تماس گرفته می‌شود.`,
      ticketId,
    });
  }

  const results = searchWiki(message);

  if (results.length) {
    const article = results[0];
    return NextResponse.json({
      answer: `یک مطلب مرتبط پیدا کردم: «${article.title}»\n\n${article.content.join("\n\n")}\n\nمطالعه کامل: /wiki/${article.slug}`
    });
  }

  return NextResponse.json({
    answer: "برای این سؤال در دانش‌نامه پاسخ کافی پیدا نکردم. اگر مایل باشید، مشخصات تماس خود را وارد کنید تا درخواست برای بررسی انسانی ثبت شود.",
    needsContact: true,
  });
}
