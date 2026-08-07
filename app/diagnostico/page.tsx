import type { Metadata } from "next";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import SoulGeniaDiagnostic from "@/components/funil/SoulGeniaDiagnostic";

export const metadata: Metadata = {
  title: "Diagnostico Soul Genia | Secretaria inteligente no WhatsApp",
  description:
    "Responda ao diagnostico da Soul Genia e descubra o melhor caminho para organizar mensagens, agenda e lembretes com uma secretaria inteligente no WhatsApp.",
  robots: {
    index: process.env.NEXT_PUBLIC_STAGING_NO_INDEX !== "true",
    follow: process.env.NEXT_PUBLIC_STAGING_NO_INDEX !== "true",
  },
};

export default function DiagnosticoPage() {
  return (
    <>
      <LandingAnalytics page="soul_genia_diagnostic" />
      <SoulGeniaDiagnostic />
    </>
  );
}
