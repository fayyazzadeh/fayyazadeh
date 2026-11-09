import { NextResponse } from "next/server";
import { Resend } from "resend";
import { searchWiki } from "@/lib/wiki";
import { readJsonBody, verifyTurnstile } from "@/lib/request-security.js";

function createTicketId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `WIKI-${timestamp}-${random}`;
}

export async function POST(request: Request) {
  const parsed = await readJsonBody(request, 8_192);
  if (!parsed.ok) {
    return NextResponse.json({ answer: parsed.error }, { status: parsed.status });
  }
  const body = parsed.data && typeof parsed.data === "object" ? parsed.data as Record<string, unknown> : {};
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const submitTicket = body.submitTicket === true;

  if (!message) {
    return NextResponse.json({ answer: "لطفاً سؤال یا شرح مشکل را وارد کنید." }, { status: 400 });
  }

  if (message.length > 2_000) {
    return NextResponse.json({ answer: "متن سؤال نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد." }, { status: 400 });
  }

  if (submitTicket) {
    const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
    if (!turnstileToken) {
      return NextResponse.json({ answer: "لطفاً تأیید امنیتی را کامل کنید." }, { status: 400 });
    }
    if (!(await verifyTurnstile(turnstileToken, "wiki_support"))) {
      return NextResponse.json({ answer: "تأیید امنیتی ناموفق بود. لطفاً دوباره تلاش کنید." }, { status: 403 });
    }
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!name) {
      return NextResponse.json({ answer: "لطفاً نام خود را وارد کنید." }, { status: 400 });
    }

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ answer: "نام و نام خانوادگی باید بین ۲ تا ۸۰ کاراکتر باشد." }, { status: 400 });
    }

    if (email.length > 254) {
      return NextResponse.json({ answer: "آدرس ایمیل بیش از حد طولانی است." }, { status: 400 });
    }

    if (phone.length > 20 || (phone && !/^[+()\d\s-]+$/.test(phone))) {
      return NextResponse.json({ answer: "شماره تماس واردشده معتبر نیست." }, { status: 400 });
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
      const from = "Wiki Chat <wikichat@fayyazzadeh.ir>";
      const ticketText = [
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
      ].join("\n");

      const adminEmail = await resend.emails.send({
        from,
        to: ["wikichat@fayyazzadeh.ir"],
        subject: `[${ticketId}] درخواست پشتیبانی جدید از دانش‌نامه`,
        text: ticketText,
      });

      if (adminEmail.error) {
        console.error("Wiki support admin email error:", adminEmail.error);
        return NextResponse.json(
          { answer: "ثبت درخواست انجام نشد. لطفاً دوباره تلاش کنید." },
          { status: 500 },
        );
      }

      if (email) {
        const userEmail = await resend.emails.send({
          from,
          to: [email],
          subject: `[${ticketId}] تأیید ثبت درخواست دانش‌نامه`,
          text: [
            `سلام ${name}`,
            "",
            "درخواست شما در دانش‌نامه با موفقیت ثبت شد.",
            "",
            `شماره درخواست: ${ticketId}`,
            "",
            "سؤال / مشکل ثبت‌شده:",
            message,
            "",
            "تیم پشتیبانی دانش‌نامه درخواست شما را بررسی خواهد کرد.",
            "",
            "Wiki Chat",
            "wikichat@fayyazzadeh.ir",
          ].join("\n"),
        });

        if (userEmail.error) {
          console.error("Wiki support user email error:", userEmail.error);
        }
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
