"use client";

import { usePathname } from "next/navigation";
import TrackedCtaLink from "@/components/analytics/TrackedCtaLink";

export default function SiteFooter() {
  const pathname = usePathname();
  const isGatewayPortHost =
    typeof window !== "undefined" &&
    window.location.hostname === "gatewayport.vcnamidia.com.br";

  if (
    pathname?.startsWith("/gatewayport") ||
    (isGatewayPortHost && pathname === "/")
  ) {
    return <GatewayPortFooter locale="en" />;
  }

  if (pathname?.startsWith("/pt")) {
    return <GatewayPortFooter locale="pt" />;
  }

  return <SoulGeniaFooter />;
}

function GatewayPortFooter({ locale }: { locale: "en" | "pt" }) {
  const copy =
    locale === "pt"
      ? {
          description:
            "WhatsApp para Agentes: uma camada hospedada para agentes MCP/API, leitura de midia e fluxos com aprovacao humana.",
          disclaimer:
            "GatewayPort nao e afiliado ao WhatsApp ou a Meta. WhatsApp e marca de seu respectivo dono. GatewayPort foi desenhado para fluxos controlados, approval-first, e nao e plataforma de spam ou disparo em massa.",
          aria: "Links do rodape GatewayPort",
          baseHref: "/pt",
          links: {
            platform: "Plataforma",
            useCases: "Casos de uso",
            integrations: "Integracoes",
            safety: "Seguranca",
            plans: "Planos",
            language: "English",
            privacy: "Privacidade",
            terms: "Termos",
            follow: "Seguir @gatewayportlabs",
          },
          languageHref: "/",
        }
      : {
          description:
            "WhatsApp for Agents: a hosted operating layer for MCP/API agents, media understanding and human-approved workflows.",
          disclaimer:
            "GatewayPort is not affiliated with WhatsApp or Meta. WhatsApp is a trademark of its respective owner. GatewayPort is designed for controlled, approval-first agent workflows and is not a bulk messaging or spam platform.",
          aria: "GatewayPort footer links",
          baseHref: "",
          links: {
            platform: "Platform",
            useCases: "Use Cases",
            integrations: "Integrations",
            safety: "Safety",
            plans: "Plans",
            language: "Portugues",
            privacy: "Privacy",
            terms: "Terms",
            follow: "Follow @gatewayportlabs",
          },
          languageHref: "/pt",
        };

  const hashHref = (hash: string) =>
    copy.baseHref ? `${copy.baseHref}${hash}` : hash;

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 text-sm text-muted-foreground sm:px-8 lg:grid-cols-[1.2fr_1fr_auto] lg:items-center">
        <div className="max-w-md">
          <p className="font-display text-xl text-primary">GatewayPort</p>
          <p className="mt-2 leading-6">{copy.description}</p>
          <p className="mt-3 text-xs leading-5 text-[#8a806f]">
            {copy.disclaimer}
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-6 gap-y-3"
          aria-label={copy.aria}
        >
          <a href={hashHref("#platform")} className="hover:text-primary">
            {copy.links.platform}
          </a>
          <a href={hashHref("#use-cases")} className="hover:text-primary">
            {copy.links.useCases}
          </a>
          <a href={hashHref("#integrations")} className="hover:text-primary">
            {copy.links.integrations}
          </a>
          <a href={hashHref("#safety")} className="hover:text-primary">
            {copy.links.safety}
          </a>
          <a href={hashHref("#waitlist")} className="hover:text-primary">
            {copy.links.plans}
          </a>
          <a href={copy.languageHref} className="hover:text-primary">
            {copy.links.language}
          </a>
          <a
            href="https://x.com/gatewayportlabs"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            {copy.links.follow}
          </a>
          <a href="/privacidade" className="hover:text-primary">
            {copy.links.privacy}
          </a>
          <a href="/termos" className="hover:text-primary">
            {copy.links.terms}
          </a>
        </nav>
        <p className="text-xs text-[#8a806f]">
          &copy; {new Date().getFullYear()} GatewayPort.
        </p>
      </div>
    </footer>
  );
}

function SoulGeniaFooter() {
  const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "/trial";
  const hasWhatsapp = whatsappHref.startsWith("http");

  return (
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
  );
}
