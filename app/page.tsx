import type { Metadata } from "next";
import InstitutionalHome from "./institucional-v1/page";

const description =
  "A Soul Gênia cria produtos de inteligência artificial para organizar rotinas, conectar agentes e transformar conhecimento em execução.";

export const metadata: Metadata = {
  title: { absolute: "Soul Gênia | Tecnologia para o trabalho real" },
  description,
  keywords: [
    "Soul Gênia",
    "inteligência artificial",
    "Gênia Secretária",
    "GatewayPort",
    "Mentora Beta",
    "tecnologia brasileira",
    "agentes de IA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Soul Gênia",
    title: "Soul Gênia | Tecnologia para o trabalho real",
    description,
    images: [
      {
        url: "/images/heroes/v3/orquestra-desktop.webp",
        width: 1280,
        height: 720,
        alt: "Tecnologia Soul Gênia integrada ao trabalho real",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Gênia | Tecnologia para o trabalho real",
    description,
    images: ["/images/heroes/v3/orquestra-desktop.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default InstitutionalHome;
