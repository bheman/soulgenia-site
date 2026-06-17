import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import TrackedCtaLink from "@/components/analytics/TrackedCtaLink";
import { blogPosts } from "@/lib/blog";

const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "/trial";
const hasWhatsapp = whatsappHref.startsWith("http");
const featuredPost = blogPosts[0];
const secondaryPosts = blogPosts.slice(1);
const clusters = Array.from(new Set(blogPosts.map((post) => post.cluster)));

export const metadata: Metadata = {
  title: "Blog Soul Genia | WhatsApp, rotina e organizacao",
  description:
    "Guias praticos para organizar WhatsApp, rotina, agenda, lembretes e proximos passos com mais clareza.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "Soul Genia",
    title: "Blog Soul Genia | WhatsApp, rotina e organizacao",
    description:
      "Conteudo util para quem quer diminuir pendencias soltas e organizar melhor a vida que acontece no WhatsApp.",
    images: [
      {
        url: featuredPost.heroImage,
        width: 1536,
        height: 864,
        alt: featuredPost.heroAlt,
      },
    ],
  },
};

export default function BlogIndexPage() {
  return (
    <main className="bg-[#f7f2e8] text-foreground">
      <LandingAnalytics page="blog_index" />

      <section className="relative overflow-hidden bg-[#071b1a] px-5 pb-14 pt-8 text-white sm:px-8 md:pb-20">
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(234,211,150,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(234,211,150,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="mx-auto max-w-7xl">
          <nav className="relative z-10 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/78 hover:text-white"
            >
              <Image
                src="/images/soul-genia-profile-mark.png"
                alt=""
                width={30}
                height={30}
                className="rounded-full"
              />
              Soul Genia
            </Link>
            <TrackedCtaLink
              href={whatsappHref}
              position="blog_index_nav_cta"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="hidden rounded-full border border-white/18 px-4 py-2 text-sm font-semibold text-white/78 hover:border-[#e6c668] hover:text-white sm:inline-flex"
            >
              Falar com a Soul Genia
            </TrackedCtaLink>
          </nav>

          <div className="relative z-10 mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="pb-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6c668]">
                Blog Soul Genia
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-display leading-[1.02] sm:text-6xl lg:text-7xl">
                WhatsApp, agenda e lembretes com criterio, calma e proximo passo.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/74">
                Guias para transformar mensagens, combinados, retornos e
                tarefas soltas em uma rotina mais clara. Primeiro vem alivio;
                a Soul Genia entra onde reduz ruido sem tirar voce do controle.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {clusters.map((cluster) => (
                  <a
                    key={cluster}
                    href={`#${cluster.toLowerCase().replaceAll(" ", "-")}`}
                    className="rounded-full bg-white/8 px-4 py-2 text-sm font-medium text-white/78 ring-1 ring-white/12 hover:bg-white/13 hover:text-white"
                  >
                    {cluster}
                  </a>
                ))}
              </div>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block overflow-hidden rounded-[1.5rem] border border-white/14 bg-white/8 p-3 shadow-[0_40px_120px_-58px_rgba(0,0,0,0.95)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem]">
                <Image
                  src={featuredPost.heroImage}
                  alt={featuredPost.heroAlt}
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  sizes="(min-width: 1024px) 680px, 94vw"
                />
              </div>
              <div className="grid gap-5 px-2 pb-2 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e6c668]">
                    Guia em destaque
                  </p>
                  <h2 className="mt-3 max-w-2xl text-2xl font-display leading-tight text-white sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                </div>
                <span className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#e6c668] px-5 text-sm font-semibold text-[#071b1a]">
                  Ler agora
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div>
            <div className="grid gap-6 md:grid-cols-3">
              {secondaryPosts.map((post) => (
                <article
                  key={post.id}
                  id={post.cluster.toLowerCase().replaceAll(" ", "-")}
                  className="motion-card group overflow-hidden rounded-[1.25rem] border border-[#dfd5c3] bg-[#fffaf0] shadow-[0_22px_70px_-52px_rgba(8,31,30,0.45)]"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.heroImage}
                        alt={post.heroAlt}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.035]"
                        sizes="(min-width: 768px) 31vw, 94vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6a20]">
                        <span>{post.cluster}</span>
                        <span className="text-[#9f9586]">/</span>
                        <span>{post.readingMinutes} min</span>
                      </div>
                      <h2 className="mt-4 text-2xl font-display leading-tight text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-4 leading-7 text-[#53605d]">{post.excerpt}</p>
                      <p className="mt-6 text-sm font-semibold text-primary-light">
                        Ler guia
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="overflow-hidden rounded-[1.25rem] border border-[#dfd5c3] bg-[#fffaf0]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/auria-hero-face-v21.png"
                  alt="Soul Genia, secretaria pessoal para WhatsApp"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 304px, 94vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6a20]">
                  Curadoria Soul Genia
                </p>
                <p className="mt-3 text-xl font-display leading-tight text-primary">
                  O melhor conteudo e o que melhora a rotina antes de vender uma
                  ferramenta.
                </p>
                <p className="mt-4 leading-7 text-[#53605d]">
                  Use os guias para enxergar onde a rotina escapa. Quando o
                  gargalo for recorrente, a Soul Genia entra com resumos,
                  lembretes, mensagens agendadas e aprovacao humana.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#081f1e] px-5 py-16 text-white sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e6c668]">
              Soul Genia
            </p>
            <h2 className="mt-4 text-4xl font-display leading-tight sm:text-5xl">
              Quer testar a organizacao no seu WhatsApp real?
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Comece pequeno: uma rotina, um problema claro e aprovacao humana
              antes de qualquer envio externo.
            </p>
          </div>
          <TrackedCtaLink
            href={whatsappHref}
            position="blog_index_cta"
            destination={hasWhatsapp ? "whatsapp" : "trial"}
            target={hasWhatsapp ? "_blank" : undefined}
            rel={hasWhatsapp ? "noreferrer" : undefined}
            className="motion-press inline-flex min-h-14 shrink-0 items-center justify-center rounded-full bg-[#e6c668] px-8 py-4 text-base font-semibold text-[#071b1a] hover:bg-[#f0d985]"
          >
            Falar com a Soul Genia
          </TrackedCtaLink>
        </div>
      </section>
    </main>
  );
}
