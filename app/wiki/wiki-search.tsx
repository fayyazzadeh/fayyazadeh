"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { wikiArticles, searchWiki } from "@/lib/wiki";
import "./wiki.css";

export default function WikiPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchWiki(query), [query]);

  return (
    <main className="wiki-shell">
      <header className="wiki-header">
        <Link className="wiki-brand" href="/">RF<span>.</span></Link>
        <div>
          <div className="wiki-kicker">KNOWLEDGE BASE</div>
          <h1>دانش‌نامه فنی</h1>
          <p>مرجع شخصی برای شبکه، زیرساخت، Linux، Windows و عیب‌یابی IT.</p>
        </div>
        <Link className="wiki-chat-link" href="/wiki/chat">💬 پرسش از دستیار</Link>
      </header>

      <section className="wiki-search">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="مثلاً: DNS، MikroTik، Raspberry Pi..."
          aria-label="جستجو در دانش‌نامه"
        />
        <span>{results.length} نتیجه</span>
      </section>

      <section className="wiki-grid">
        {results.map((article) => (
          <Link className="wiki-card" href={`/wiki/${article.slug}`} key={article.slug}>
            <div className="wiki-card-meta">{article.category}</div>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <div className="wiki-tags">
              {article.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </Link>
        ))}
      </section>

      {!results.length && (
        <div className="wiki-empty">
          <strong>مطلبی پیدا نشد.</strong>
          <p>اگر دستیار هم نتواند پاسخ بدهد، می‌توانیم درخواست را برای بررسی انسانی ارسال کنیم.</p>
          <Link href="/wiki/chat">رفتن به دستیار ←</Link>
        </div>
      )}
    </main>
  );
}
