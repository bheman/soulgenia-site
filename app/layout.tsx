import type { Metadata } from "next";
import { Days_One, Inter, Outfit } from "next/font/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import TrackedCtaLink from "@/components/analytics/TrackedCtaLink";
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
  const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "/trial";
  const hasWhatsapp = whatsappHref.startsWith("http");

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} ${daysOne.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <MetaPixel />
        {children}
        <footer className="border-t border-border bg-background py-12">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 text-sm text-muted-foreground sm:px-8 lg:grid-cols-[1.2fr_1fr_auto] lg:items-center">
            <div className="max-w-md">
              <p className="font-display text-xl text-primary">Soul Genia</p>
              <p className="mt-2 leading-6">
                Secretaria pessoal para organizar vida, trabalho, mensagens,
                lembretes, email e calendario pelo WhatsApp.
              </p>
            </div>
            <nav
              className="flex flex-wrap gap-x-6 gap-y-3"
              aria-label="Links do rodape"
            >
              <TrackedCtaLink
                href={whatsappHref}
                position="footer"
                destination={hasWhatsapp ? "whatsapp" : "trial"}
                target={hasWhatsapp ? "_blank" : undefined}
                rel={hasWhatsapp ? "noreferrer" : undefined}
                className="hover:text-primary"
              >
                Falar com a Soul Genia
              </TrackedCtaLink>
              <a href="/#organiza" className="hover:text-primary">
                Como funciona
              </a>
              <a href="/blog" className="hover:text-primary">
                Blog
              </a>
              <a href="/privacidade" className="hover:text-primary">
                Privacidade
              </a>
              <a href="/termos" className="hover:text-primary">
                Termos
              </a>
              <a
                href="https://www.instagram.com/soulgenia/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                Instagram
              </a>
            </nav>
            <p className="text-xs text-[#8a806f]">
              &copy; {new Date().getFullYear()} Soul Genia.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
