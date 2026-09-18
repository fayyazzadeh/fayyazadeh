import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string" ? body.email.trim() : "";

    const phone =
      typeof body.phone === "string" ? body.phone.trim() : "";

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    const website =
      typeof body.website === "string" ? body.website.trim() : "";

    const turnstileToken =
      typeof body.turnstileToken === "string"
        ? body.turnstileToken
        : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: "لطفاً نام، ایمیل و پیام را وارد کنید.",
        },
        { status: 400 }
      );
    }

    if (website) {
      return NextResponse.json(
        {
          error: "ارسال پیام انجام نشد.",
        },
        { status: 400 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        {
          error: "لطفاً تأیید امنیتی را کامل کنید.",
        },
        { status: 400 }
      );
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET_KEY is not configured.");

      return NextResponse.json(
        {
          error: "تنظیمات امنیتی سرور کامل نیست.",
        },
        { status: 500 }
      );
    }

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          error: "تأیید امنیتی ناموفق بود. لطفاً دوباره تلاش کنید.",
        },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");

      return NextResponse.json(
        {
          error: "تنظیمات ارسال ایمیل کامل نیست.",
        },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Website Contact <website@fayyazzadeh.ir>",
      to: ["ramin@fayyazzadeh.ir"],
      replyTo: email,
      subject: `پیام جدید از ${name}`,
      text: `
پیام جدید از سایت fayyazzadeh.ir

نام:
${name}

ایمیل:
${email}

شماره تماس:
${phone || "وارد نشده"}

پیام:
${message}
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          error: "ارسال ایمیل انجام نشد. لطفاً دوباره تلاش کنید.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "پیام با موفقیت ارسال شد.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        error: "خطایی در پردازش درخواست رخ داد.",
      },
      { status: 500 }
    );
  }
}
