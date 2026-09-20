"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import "../wiki.css";

type Message = { role: "user" | "assistant"; text: string };

export default function WikiChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "سلام! سؤال فنی‌ات را بپرس. ابتدا دانش‌نامه را بررسی می‌کنم؛ اگر پاسخ کافی پیدا نشود، امکان ارجاع به رامین وجود دارد." }
  ]);
  const [busy, setBusy] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function send(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    setInput("");
    setMessages((current) => [...current, { role: "user", text }]);
    setBusy(true);

    try {
      const response = await fetch("/api/wiki/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await response.json();

      setMessages((current) => [...current, { role: "assistant", text: data.answer || "پاسخی پیدا نشد." }]);

      if (data.needsContact) {
        setPendingQuestion(text);
        setContactOpen(true);
      }
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: "ارتباط با دستیار برقرار نشد. لطفاً دوباره تلاش کنید." }]);
    } finally {
      setBusy(false);
    }
  }

  async function submitContact(event: FormEvent) {
    event.preventDefault();
    if (!pendingQuestion || busy) return;

    setBusy(true);

    try {
      const response = await fetch("/api/wiki/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: pendingQuestion,
          submitTicket: true,
          name,
          email,
          phone
        })
      });
      const data = await response.json();

      if (!response.ok) {
        setMessages((current) => [...current, { role: "assistant", text: data.answer || "ثبت درخواست انجام نشد." }]);
        return;
      }

      setMessages((current) => [...current, { role: "assistant", text: data.answer }]);
      setContactOpen(false);
      setPendingQuestion("");
      setName("");
      setEmail("");
      setPhone("");
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: "ثبت درخواست انجام نشد. لطفاً دوباره تلاش کنید." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="wiki-shell chat-shell">
      <header className="article-top">
        <Link href="/wiki">← دانش‌نامه</Link>
        <Link href="/">fayyazzadeh.ir</Link>
      </header>

      <section className="chat-panel">
        <div className="wiki-kicker">AI SUPPORT</div>
        <h1>دستیار دانش‌نامه</h1>
        <p>پاسخ‌ها از محتوای دانش‌نامه شروع می‌شوند و در صورت نبودن پاسخ کافی، مسیر پشتیبانی انسانی فعال می‌شود.</p>

        <div className="messages" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`message ${message.role}`} key={index}>{message.text}</div>
          ))}
        </div>

        {contactOpen && (
          <form className="contact-ticket-form" onSubmit={submitContact}>
            <div className="wiki-kicker">HUMAN SUPPORT</div>
            <h2>اطلاعات تماس برای پیگیری</h2>
            <p>برای اینکه بتوانم درخواست شما را برای رامین ارسال کنم، نام و حداقل یکی از راه‌های تماس را وارد کنید.</p>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="نام و نام خانوادگی *"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ایمیل"
            />
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="شماره تماس"
            />
            <button disabled={busy}>{busy ? "در حال ثبت..." : "ثبت درخواست پشتیبانی"}</button>
          </form>
        )}

        <form className="chat-form" onSubmit={send}>
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="مشکل یا سؤال فنی را بنویس..." />
          <button disabled={busy}>{busy ? "در حال بررسی..." : "ارسال"}</button>
        </form>
      </section>
    </main>
  );
}
