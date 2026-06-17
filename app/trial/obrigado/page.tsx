import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Pedido recebido",
  robots: { index: false },
};

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] py-16 text-[#1f211c]">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-[#d8cdb9] bg-[#fbf8f1]"
            aria-hidden="true"
          >
            <svg
              className="h-8 w-8 text-[#7a5a1f]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[#171813]">
            Pedido recebido
          </h1>
          <p className="mb-8 text-lg leading-8 text-[#5f584b]">
            A equipe Soul Genia vai revisar seu cadastro e entrar em contato
            para entender sua rotina e combinar os primeiros passos pelo
            WhatsApp.
          </p>

          <div className="mb-10 rounded-lg border border-[#d8cdb9] bg-[#fbf8f1] p-6 text-left shadow-[0_18px_50px_rgba(44,34,19,0.12)]">
            <h2 className="mb-4 font-semibold text-[#171813]">
              Próximos passos
            </h2>
            <ol className="space-y-3 text-sm leading-6 text-[#5f584b]">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#efe4cf] text-xs font-bold text-[#7a5a1f]">
                  1
                </span>
                <span>Entendemos o que hoje está espalhado na sua rotina.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#efe4cf] text-xs font-bold text-[#7a5a1f]">
                  2
                </span>
                <span>Escolhemos os primeiros lembretes, resumos e mensagens.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#efe4cf] text-xs font-bold text-[#7a5a1f]">
                  3
                </span>
                <span>Configuramos o uso assistido com aprovação antes de enviar.</span>
              </li>
            </ol>
          </div>

          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#b9aa91] px-6 text-sm font-semibold text-[#2d2b25] transition hover:border-[#8d7855] hover:bg-[#efe7d8]"
          >
            Voltar para a Soul Genia
          </Link>
        </div>
      </Container>
    </main>
  );
}
