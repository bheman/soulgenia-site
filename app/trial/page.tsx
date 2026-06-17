import { Metadata } from "next";
import Container from "@/components/ui/Container";
import TrialSignupForm from "@/components/forms/TrialSignupForm";

export const metadata: Metadata = {
  title: "Começar com a Soul Genia",
  description:
    "Comece pelo WhatsApp com a Soul Genia, uma secretária pessoal para organizar vida, trabalho, mensagens, lembretes e agenda.",
  robots: { index: false },
};

export default function TrialPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] py-16 text-[#1f211c]">
      <Container>
        <div className="mx-auto max-w-xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5a1f]">
              Soul Genia
            </p>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[#171813] sm:text-5xl">
              Comece pelo WhatsApp
            </h1>
            <p className="text-base leading-7 text-[#5f584b]">
              Nesta fase, o onboarding é assistido. Vamos entender sua rotina
              pessoal e profissional antes de configurar os primeiros lembretes,
              resumos e mensagens agendadas.
            </p>
          </div>

          <ul
            className="mb-8 grid gap-2 text-sm text-[#5f584b] sm:grid-cols-3"
            aria-label="Garantias do teste"
          >
            <li className="rounded-lg border border-[#d8cdb9] bg-[#fbf8f1] p-3 text-center">
              Sem cartão agora
            </li>
            <li className="rounded-lg border border-[#d8cdb9] bg-[#fbf8f1] p-3 text-center">
              Onboarding assistido
            </li>
            <li className="rounded-lg border border-[#d8cdb9] bg-[#fbf8f1] p-3 text-center">
              Aprova antes de enviar
            </li>
          </ul>

          <div className="rounded-lg border border-[#d8cdb9] bg-[#fbf8f1] p-6 shadow-[0_18px_50px_rgba(44,34,19,0.12)] sm:p-8">
            <TrialSignupForm />
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-[#8a806f]">
            Ao se cadastrar, você autoriza a Soul Genia a entrar em contato
            sobre o onboarding assistido. A Soul Genia não envia mensagens nem
            executa ações sensíveis sem a sua aprovação.
          </p>
        </div>
      </Container>
    </main>
  );
}
