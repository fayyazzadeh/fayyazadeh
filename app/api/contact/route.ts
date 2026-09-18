import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "لطفاً همه فیلدها را تکمیل کنید." },
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
      console.error(error);

      return NextResponse.json(
        { error: "ارسال پیام انجام نشد." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "خطایی در ارسال پیام رخ داد." },
      { status: 500 }
    );
  }
}
