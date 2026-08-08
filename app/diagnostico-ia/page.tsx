import type { Metadata } from "next";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import SoulGeniaDiagnostic from "@/components/funil/SoulGeniaDiagnostic";

// D2 (nome público da oferta) segue aberto no plano — título literal por ora.
export const metadata: Metadata = {
  title: "Diagnostico de IA | Quanto custa seu atendimento manual?",
  description:
    "Descubra em 2 minutos quantas horas e quanto dinheiro sua equipe gasta por mes respondendo cliente — e onde a IA devolve isso primeiro. Diagnostico com garantia: 5 horas por semana encontradas ou voce nao paga.",
  robots: {
    index: process.env.NEXT_PUBLIC_STAGING_NO_INDEX !== "true",
    follow: process.env.NEXT_PUBLIC_STAGING_NO_INDEX !== "true",
  },
};

export default function DiagnosticoIaPage() {
  return (
    <>
      <LandingAnalytics page="diagnostico_ia" />
      <SoulGeniaDiagnostic slug="diagnostico-ia-v1" />
    </>
  );
}
