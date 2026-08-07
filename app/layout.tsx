import type { Metadata } from "next";
import { Days_One, Inter, Outfit } from "next/font/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const daysOne = Days_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-days-one",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Soul Genia | Secretaria pessoal no WhatsApp",
    template: "%s | Soul Genia",
  },
  description:
    "Soul Genia e uma secretaria pessoal dentro do WhatsApp para organizar vida pessoal e profissional com lembretes, briefings, resumos e mensagens agendadas.",
  keywords: [
    "Soul Genia",
    "secretaria pessoal",
    "assistente pessoal",
    "agente de IA",
    "assistente de WhatsApp",
    "organizacao pessoal",
    "rotina",
    "lembretes",
    "mensagens agendadas",
    "briefing matinal",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Soul Genia",
    title: "Soul Genia | Secretaria pessoal no WhatsApp",
    description:
      "Uma secretaria pessoal dentro do WhatsApp para organizar conversas, agenda, lembretes, emails e mensagens agendadas.",
    images: [
      {
        url: "/images/auria-watson-vale-avatar-v0.png",
        width: 1024,
        height: 1024,
        alt: "Identidade visual da Soul Genia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Genia | Secretaria pessoal no WhatsApp",
    description:
      "Organize vida pessoal e profissional pelo WhatsApp, sem instalar mais um app.",
    images: ["/images/auria-watson-vale-avatar-v0.png"],
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
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} ${daysOne.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <MetaPixel />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
