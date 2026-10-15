import Link from "next/link";
import { notFound } from "next/navigation";
import { getWikiArticle, wikiArticles } from "@/lib/wiki";
import "../wiki.css";

export function generateStaticParams() {
  return wikiArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getWikiArticle(slug);

  if (!article) {
    return {
      title: "مقاله پیدا نشد | دانش‌نامه فنی",
      robots: { index: false, follow: true },
    };
  }

  const title = `${article.title} | دانش‌نامه فنی`;
  const description = article.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/wiki/${article.slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://fayyazzadeh.ir/wiki/${article.slug}`,
      title,
      description,
      locale: "fa_IR",
    },
  };
}

export default async function WikiArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getWikiArticle(slug);
  if (!article) notFound();

  return (
    <main className="wiki-shell">
      <header className="article-top">
        <Link href="/wiki">← بازگشت به دانش‌نامه</Link>
        <Link href="/wiki/chat">پرسش از دستیار</Link>
      </header>

      <article className="wiki-article">
        <div className="wiki-card-meta">{article.category}</div>
        <h1>{article.title}</h1>
        <p className="article-excerpt">{article.excerpt}</p>
        <div className="article-body">
          {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="wiki-tags article-tags">
          {article.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </article>
    </main>
  );
}
