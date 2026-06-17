import Link from "next/link";
import Section from "@/components/ui/Section";

export default function CTAFinal() {
  return (
    <Section bg="slate" id="cta-final">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
          A decisão
        </p>
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Você já sabe o problema.
          <span className="block text-slate-300">A conta é simples.</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-slate-300">
          Cada dia que passa são mais 2 horas de WhatsApp que você poderia ter
          usado em trabalho técnico, em descanso, ou em mais clientes. A{" "}
          {"{PRODUTO}"} não resolve todos os problemas do seu consultório — mas
          resolve esse, de forma específica, em 30 minutos.
        </p>

        <Link
          href="/trial"
          className="inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-bold text-slate-900 shadow-sm transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          aria-label="Começar teste gratuito de 7 dias"
        >
          Começar meu teste gratuito de 7 dias
        </Link>

        <p className="mt-5 text-sm text-slate-400">
          Sem cartão de crédito nos primeiros 7 dias. Cancela com um clique.
          Seus dados ficam com você.
        </p>

        {/* Trust row */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <span aria-hidden="true">🔒</span>
            Dados no Brasil (LGPD)
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true">⚡</span>
            Setup em 30 minutos
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true">📱</span>
            Funciona no seu número atual
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true">✕</span>
            Sem contrato anual
          </span>
        </div>
      </div>
    </Section>
  );
}
