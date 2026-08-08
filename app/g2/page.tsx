import type { Metadata } from "next";
import Link from "next/link";

// Galeria interna da rodada design-factory 2026-08-08 (benchmark NewByte).
// noindex sempre — página de trabalho, nunca de tráfego.
export const metadata: Metadata = {
  title: "G2 — variantes /genia (interno)",
  robots: { index: false, follow: false },
};

const variants = [
  {
    slug: "farol",
    name: "Farol",
    axis: "NewByte pleno — navy + azul de ação único, aurora, Jakarta 800",
  },
  {
    slug: "meianoite",
    name: "Meia-noite",
    axis: "Estrutura NewByte com o teal da Gênia como cor de ação (continuidade de marca)",
  },
  {
    slug: "aurora",
    name: "Aurora",
    axis: "Evolução conservadora — só o hero vira escuro; resto claro como hoje",
  },
];

export default function G2Gallery() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        design factory · rodada 2026-08-08
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
        Variantes do /genia — padrão NewByte
      </h1>
      <p className="mt-3 text-slate-600">
        Briefing: benchmark NewByte. A página viva (/genia) não foi tocada.
      </p>
      <ul className="mt-8 space-y-4">
        {variants.map((v) => (
          <li key={v.slug} className="rounded-xl border border-slate-200 p-5">
            <Link href={`/g2/${v.slug}`} className="text-xl font-bold text-blue-700 underline">
              /g2/{v.slug} — {v.name}
            </Link>
            <p className="mt-1 text-sm text-slate-600">{v.axis}</p>
          </li>
        ))}
        <li className="rounded-xl border border-slate-200 p-5">
          <Link href="/genia" className="text-xl font-bold text-slate-700 underline">
            /genia — página atual (referência)
          </Link>
        </li>
      </ul>
    </main>
  );
}
