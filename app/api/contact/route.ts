import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limit.
// This protects against repeated requests hitting the same server instance.
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function getClientIp(request: Request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);

  if (!current || now > current.resetAt) {
    rateLimit.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return false;
  }

  if (current.count >= MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

async function verifyTurnstile(token: string, request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured.");
    return false;
  }

  const remoteip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim();

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteip ? { remoteip } : {}),
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return false;
  }

  const result = await response.json();

  return result.success === true;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "تعداد درخواست‌ها زیاد است. لطفاً چند دقیقه بعد دوباره تلاش کنید.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const turnstileToken = String(body.turnstileToken || "").trim();
    const website = String(body.website || "").trim();

    // Honeypot: real users should never fill this hidden field.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "لطفاً همه فیلدها را تکمیل کنید." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "نام واردشده بیش از حد طولانی است." },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { error: "ایمیل واردشده معتبر نیست." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "پیام بیش از حد طولانی است." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "لطفاً یک آدرس ایمیل معتبر وارد کنید." },
        { status: 400 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { error: "لطفاً تأیید امنیتی را انجام دهید." },
        { status: 400 }
      );
    }

    const turnstileValid = await verifyTurnstile(turnstileToken, request);

    if (!turnstileValid) {
      return NextResponse.json(
        {
          error:
            "تأیید امنیتی ناموفق بود. لطفاً دوباره تلاش کنید.",
        },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Website Contact <website@fayyazzadeh.ir>",
      to: ["ramin@fayyazzadeh.ir"],
      replyTo: email,
      subject: `پیام جدید از سایت - ${name}`,
      text: `نام: ${name}

ایمیل: ${email}

پیام:
${message}`,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: "ارسال پیام انجام نشد. لطفاً دوباره تلاش کنید." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "خطایی در ارسال پیام رخ داد." },
      { status: 500 }
    );
  }
}
