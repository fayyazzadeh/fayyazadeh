import { NextResponse } from "next/server";
import { Resend } from "resend";
import { readJsonBody, verifyTurnstile } from "@/lib/request-security.js";
import { checkRateLimit } from "@/lib/rate-limit.js";

export async function POST(request: Request) {
  try {
    const rate = await checkRateLimit(request, { identifier: "contact", limit: 5, windowMs: 60_000 });
    if (rate.status === "unavailable") {
      return NextResponse.json(
        { error: "سرویس امنیتی موقتاً در دسترس نیست. لطفاً کمی بعد دوباره تلاش کنید." },
        { status: 503, headers: { "Retry-After": "30", "Cache-Control": "no-store" } },
      );
    }
    if (rate.status === "limited") {
      return NextResponse.json(
        { error: "تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی بعد دوباره تلاش کنید." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfter), "Cache-Control": "no-store" } },
      );
    }

    const parsed = await readJsonBody(request, 12_288);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: parsed.status });
    }
    const body = parsed.data && typeof parsed.data === "object" ? parsed.data as Record<string, unknown> : {};

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";
    const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "لطفاً نام، ایمیل و پیام را وارد کنید." }, { status: 400 });
    }

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: "نام و نام خانوادگی باید بین ۲ تا ۸۰ کاراکتر باشد." }, { status: 400 });
    }

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "لطفاً یک آدرس ایمیل معتبر وارد کنید." }, { status: 400 });
    }

    if (phone.length > 30 || (phone && !/^[+()\d\s-]+$/.test(phone))) {
      return NextResponse.json({ error: "شماره تماس واردشده معتبر نیست." }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: "متن پیام نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد." }, { status: 400 });
    }

    if (website) {
      return NextResponse.json({ error: "ارسال پیام انجام نشد." }, { status: 400 });
    }

    if (!turnstileToken) {
      return NextResponse.json({ error: "لطفاً تأیید امنیتی را کامل کنید." }, { status: 400 });
    }

    if (!(await verifyTurnstile(turnstileToken, "contact"))) {
      return NextResponse.json({ error: "تأیید امنیتی ناموفق بود. لطفاً دوباره تلاش کنید." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json({ error: "تنظیمات ارسال ایمیل کامل نیست." }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: "Website Contact <website@fayyazzadeh.ir>",
      to: ["ramin@fayyazzadeh.ir"],
      replyTo: email,
      subject: `پیام جدید از ${name}`,
      text: [
        "پیام جدید از سایت fayyazzadeh.ir",
        "",
        "نام:",
        name,
        "",
        "ایمیل:",
        email,
        "",
        "شماره تماس:",
        phone || "وارد نشده",
        "",
        "پیام:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "ارسال ایمیل انجام نشد. لطفاً دوباره تلاش کنید." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "پیام با موفقیت ارسال شد." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "خطایی در پردازش درخواست رخ داد." }, { status: 500 });
  }
}
