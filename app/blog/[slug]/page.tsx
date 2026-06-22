import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import TrackedCtaLink from "@/components/analytics/TrackedCtaLink";
import { blogPosts, getBlogPost, getCtaCopy, getRelatedPosts } from "@/lib/blog";

const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "/trial";
const hasWhatsapp = whatsappHref.startsWith("http");

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: "Soul Genia",
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: ["Soul Genia"],
      images: [
        {
          url: post.heroImage,
          width: 1536,
          height: 864,
          alt: post.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);
  const cta = getCtaCopy(post.ctaType);
  const canonicalUrl = `https://soulgenia.com.br/blog/${post.slug}`;
  const absoluteHeroImage = `https://soulgenia.com.br${post.heroImage}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: "Soul Genia",
      url: "https://soulgenia.com.br",
    },
    publisher: {
      "@type": "Organization",
      name: "Soul Genia",
      logo: {
        "@type": "ImageObject",
        url: "https://soulgenia.com.br/images/soul-genia-profile-mark.png",
      },
    },
    image: [absoluteHeroImage],
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-[#f7f2e8] text-foreground">
      <LandingAnalytics page={`blog_${post.id.toLowerCase()}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article>
        <header className="relative overflow-hidden bg-[#071b1a] px-5 pb-10 pt-8 text-white sm:px-8 md:pb-16">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(234,211,150,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(234,211,150,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-white/64">
              <Link href="/" className="hover:text-white">
                Soul Genia
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white/88">{post.cluster}</span>
            </nav>

            <div className="mt-12 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6c668]">
                  {post.heroLabel}
                </p>
                <h1 className="mt-5 max-w-full break-words text-4xl font-display leading-[1.02] [overflow-wrap:anywhere] sm:text-6xl lg:text-7xl">
                  {post.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-white/74">
                  {post.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-white/9 px-4 py-2 text-white/82 ring-1 ring-white/10">
                    {formatDate(post.date)}
                  </span>
                  <span className="rounded-full bg-white/9 px-4 py-2 text-white/82 ring-1 ring-white/10">
                    {post.readingMinutes} min de leitura
                  </span>
                  <span className="rounded-full bg-white/9 px-4 py-2 text-white/82 ring-1 ring-white/10">
                    {post.primaryKeyword}
                  </span>
                </div>
              </div>

              <div className="min-w-0 overflow-hidden rounded-[1.5rem] border border-white/14 bg-white/8 p-3 shadow-[0_40px_120px_-58px_rgba(0,0,0,0.95)]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem]">
                  <Image
                    src={post.heroImage}
                    alt={post.heroAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 680px, 94vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            <section className="grid gap-6 rounded-[1.25rem] border border-[#dfd5c3] bg-[#fffaf0] p-6 md:grid-cols-[1fr_13rem] md:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a6a20]">
                  Neste guia
                </p>
                <ul className="mt-5 grid gap-3 leading-7 text-[#4f5b5d]">
                  {post.takeaways.map((takeaway) => (
                    <li key={takeaway} className="grid grid-cols-[1rem_1fr] gap-3">
                      <span className="mt-2.5 h-2 w-2 rounded-full bg-[#c6a249]" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-2xl bg-[#071b1a]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/auria-hero-face-v21.png"
                    alt="Soul Genia, secretaria pessoal para WhatsApp"
                    fill
                    className="object-cover"
                    sizes="208px"
                  />
                </div>
              </div>
            </section>

            <div className="mt-12 space-y-14">
              {post.sections.map((section, sectionIndex) => (
                <section key={section.heading} className="scroll-mt-24">
                  <div className="flex items-start gap-5">
                    <span className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#071b1a] text-sm font-semibold text-[#e6c668] sm:flex">
                      {sectionIndex + 1}
                    </span>
                    <div>
                      <h2 className="text-3xl font-display leading-tight text-primary sm:text-4xl">
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-5 text-lg leading-8 text-[#364347]">
                        {section.paragraphs?.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {section.bullets ? (
                    <ul className="mt-7 grid gap-3 rounded-[1.1rem] border border-[#dfd5c3] bg-[#fffaf0] p-6 text-[#364347]">
                      {section.bullets.map((item) => (
                        <li key={item} className="grid grid-cols-[1rem_1fr] gap-3 leading-7">
                          <span className="mt-3 h-2 w-2 rounded-full bg-primary-light" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.numbered ? (
                    <ol className="mt-7 grid gap-3 rounded-[1.1rem] border border-[#dfd5c3] bg-[#fffaf0] p-6 text-[#364347]">
                      {section.numbered.map((item, index) => (
                        <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 leading-7">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  ) : null}

                  {section.afterParagraphs ? (
                    <div className="mt-7 space-y-5 text-lg leading-8 text-[#364347]">
                      {section.afterParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {section.note ? (
                    <p className="mt-7 rounded-[1.1rem] border border-[#d8d0bd] bg-[#fffaf0] p-5 leading-7 text-[#4f5b5d]">
                      {section.note}
                    </p>
                  ) : null}
                </section>
              ))}
            </div>

            <section className="mt-16 overflow-hidden rounded-[1.35rem] bg-[#071b1a] text-white">
              <div className="grid gap-0 md:grid-cols-[1fr_15rem]">
                <div className="p-7 md:p-9">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e6c668]">
                    Soul Genia
                  </p>
                  <h2 className="mt-4 text-3xl font-display leading-tight sm:text-4xl">
                    {cta.label}
                  </h2>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-white/74">
                    {cta.text}
                  </p>
                  <TrackedCtaLink
                    href={whatsappHref}
                    position={`blog_article_${post.id.toLowerCase()}_cta`}
                    destination={hasWhatsapp ? "whatsapp" : "trial"}
                    target={hasWhatsapp ? "_blank" : undefined}
                    rel={hasWhatsapp ? "noreferrer" : undefined}
                    className="motion-press mt-7 inline-flex min-h-14 items-center justify-center rounded-full bg-[#e6c668] px-7 py-4 font-semibold text-[#071b1a] hover:bg-[#f0d985]"
                  >
                    Falar com a Soul Genia
                  </TrackedCtaLink>
                </div>
                <div className="relative min-h-72 md:min-h-0">
                  <Image
                    src="/images/auria-hero-face-v21.png"
                    alt="Soul Genia, secretaria pessoal para WhatsApp"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 240px, 94vw"
                  />
                </div>
              </div>
            </section>

            <section className="mt-16">
              <h2 className="text-3xl font-display leading-tight text-primary sm:text-4xl">
                Perguntas frequentes
              </h2>
              <div className="mt-6 grid gap-4">
                {post.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-[1.1rem] border border-[#dfd5c3] bg-[#fffaf0] p-6"
                  >
                    <summary className="cursor-pointer list-none text-lg font-semibold text-[#081314]">
                      <span className="inline-flex w-full items-center justify-between gap-4">
                        {faq.question}
                        <span className="text-primary-light transition-transform group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-4 leading-7 text-[#4f5b5d]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-[1.25rem] border border-[#dfd5c3] bg-[#fffaf0] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a6a20]">
                Serie
              </p>
              <h2 className="mt-3 text-2xl font-display leading-tight text-primary">
                Organizacao pelo WhatsApp
              </h2>
              <p className="mt-4 leading-7 text-[#53605d]">
                Leia em ordem para montar uma rotina mais clara: organizar,
                responder, priorizar e acompanhar.
              </p>
              <div className="mt-6 grid gap-3">
                {blogPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className={`rounded-xl px-4 py-3 text-sm leading-5 ${
                      item.slug === post.slug
                        ? "bg-primary text-white"
                        : "bg-[#f1e8d8] text-[#364347] hover:bg-[#eadcc5]"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className="bg-[#081f1e] px-5 py-16 text-white sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-display leading-tight sm:text-4xl">
            Continue lendo
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <article
                key={related.slug}
                className="motion-card group overflow-hidden rounded-[1.1rem] border border-white/12 bg-white/8"
              >
                <Link href={`/blog/${related.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={related.heroImage}
                      alt={related.heroAlt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.035]"
                      sizes="(min-width: 768px) 31vw, 94vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e6c668]">
                      {related.cluster}
                    </p>
                    <h3 className="mt-4 text-xl font-display leading-tight text-white">
                      {related.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/68">{related.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(`${date}T12:00:00-03:00`));
}
