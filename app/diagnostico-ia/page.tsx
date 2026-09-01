import type { Metadata } from "next";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import SoulGeniaDiagnostic from "@/components/funil/SoulGeniaDiagnostic";

// Copy: copy-deck-diagnostico-ia.md §1 (deck aprovado em 2026-08-31).
export const metadata: Metadata = {
  // `absolute` porque o layout raiz aplica o template "%s | Soul Genia"; sem
  // ele o título do deck sairia com DOIS pipes.
  title: {
    absolute: "Diagnóstico de IA | Onde sua empresa perde 5 horas por semana",
  },
  description:
    "Em 2 minutos, descubra quantas horas e quanto dinheiro sua equipe gasta por mês respondendo cliente. Diagnóstico com garantia: encontramos pelo menos 5 horas por semana ou você não paga.",
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
