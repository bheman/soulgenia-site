import Image from "next/image";
import type { Metadata } from "next";
import "./v3-tokens.css";

export const metadata: Metadata = {
  title: "Variantes v3 (interno)",
  description: "Galeria interna das variantes de hero v3. Não indexar.",
  robots: {
    index: false,
    follow: false,
  },
};

const variants = [
  {
    slug: "orquestra",
    art: "H02",
    nome: "Orquestra",
    conceito:
      "Atelier branco, a secretária regendo os painéis. Hero clara, leve, com copy à direita.",
    img: "/images/heroes/v3/orquestra-desktop.webp",
    width: 1190,
    height: 941,
  },
  {
    slug: "visao",
    art: "H06",
    nome: "Visão",
    conceito:
      "Por cima do ombro dela: o que ela vê, você aprova. Hero escura e cinemática.",
    img: "/images/heroes/v3/visao-desktop.webp",
    width: 1672,
    height: 700,
  },
  {
    slug: "aprova",
    art: "H12",
    nome: "Aprova",
    conceito:
      "O toque no painel Aprovar resposta. Hero escura, macro, foco no gesto de controle.",
    img: "/images/heroes/v3/aprova-desktop.webp",
    width: 1202,
    height: 941,
  },
  {
    slug: "deverdade",
    art: "H18",
    nome: "De verdade",
    conceito:
      "Atelier diurno em sage e creme, escala humana. Hero clara e quente, copy à direita.",
    img: "/images/heroes/v3/deverdade-desktop.webp",
    width: 1030,
    height: 941,
  },
];

export default function V3IndexPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Interno · noindex
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
          Variantes de hero v3
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Quatro direções construídas sobre as artes geradas para a Soul Genia.
          A home atual continua intocada em <a className="underline" href="/">/</a>.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {variants.map((v) => (
            <a
              key={v.slug}
              href={`/v3/${v.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={v.img}
                  alt={`Prévia da variante ${v.nome} (arte ${v.art})`}
                  width={v.width}
                  height={v.height}
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(min-width: 640px) 45vw, 90vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {v.art} · /v3/{v.slug}
                </p>
                <p className="mt-1 font-display text-2xl">{v.nome}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {v.conceito}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
