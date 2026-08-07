import type { Metadata } from "next";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import TrackedCtaLink from "@/components/analytics/TrackedCtaLink";
import GatewayPortWaitlistForm from "@/components/forms/GatewayPortWaitlistForm";
import GatewayPortHandoffScreen from "@/components/gatewayport/GatewayPortHandoffScreen";

export type GatewayPortLocale = "en" | "pt";

const gatewayPortOgImage =
  "https://gatewayport.vcnamidia.com.br/images/soul-genia-profile-mark.png";

export const gatewayPortMetadata: Record<GatewayPortLocale, Metadata> = {
  en: {
    title: {
      absolute: "GatewayPort | WhatsApp for Agents",
    },
    description:
      "Hosted WhatsApp connectivity for AI agents: MCP/API tools, media understanding, approval-first drafts, audit logs, scheduled actions and connection health.",
    keywords: [
      "GatewayPort",
      "WhatsApp for Agents",
      "MCP WhatsApp",
      "AI agents",
      "WhatsApp API",
      "agent tools",
      "WhatsApp automation",
    ],
    alternates: {
      canonical: "https://gatewayport.vcnamidia.com.br/",
      languages: {
        "en-US": "https://gatewayport.vcnamidia.com.br/",
        "pt-BR": "https://gatewayport.vcnamidia.com.br/pt",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://gatewayport.vcnamidia.com.br/",
      siteName: "GatewayPort",
      title: "GatewayPort | WhatsApp for Agents",
      description:
        "Host a WhatsApp connection once, then let approved AI agents read context, process media, prepare drafts, schedule actions and act through APIs or MCP tools.",
      images: [
        {
          url: gatewayPortOgImage,
          width: 1024,
          height: 1024,
          alt: "GatewayPort visual identity",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GatewayPort | WhatsApp for Agents",
      description:
        "A hosted WhatsApp operating layer for MCP/API agents and human-approved automation.",
      images: [gatewayPortOgImage],
    },
  },
  pt: {
    title: {
      absolute: "GatewayPort | WhatsApp para Agentes",
    },
    description:
      "Conectividade hospedada de WhatsApp para agentes de IA: ferramentas MCP/API, leitura de midia, rascunhos com aprovacao humana, logs de auditoria, acoes programadas e saude da conexao.",
    keywords: [
      "GatewayPort",
      "WhatsApp para agentes",
      "MCP WhatsApp",
      "agentes de IA",
      "API WhatsApp",
      "automacao WhatsApp",
    ],
    alternates: {
      canonical: "https://gatewayport.vcnamidia.com.br/pt",
      languages: {
        "en-US": "https://gatewayport.vcnamidia.com.br/",
        "pt-BR": "https://gatewayport.vcnamidia.com.br/pt",
      },
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: "https://gatewayport.vcnamidia.com.br/pt",
      siteName: "GatewayPort",
      title: "GatewayPort | WhatsApp para Agentes",
      description:
        "Conectividade hospedada de WhatsApp para agentes: ferramentas MCP/API, leitura de midia, aprovacao humana, logs e saude da conexao.",
      images: [
        {
          url: gatewayPortOgImage,
          width: 1024,
          height: 1024,
          alt: "Identidade visual GatewayPort",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GatewayPort | WhatsApp para Agentes",
      description:
        "Uma camada hospedada de WhatsApp para agentes MCP/API e automacao com aprovacao humana.",
      images: [gatewayPortOgImage],
    },
  },
};

const gatewayPortCopy = {
  en: {
    analyticsVariant: "default",
    navAria: "GatewayPort navigation",
    brandHref: "/",
    languageLink: { href: "/pt", label: "Portugues" },
    headerTagline: "WhatsApp for Agents",
    headerCta: "Start trial",
    navLinks: [
      { href: "#platform", label: "Platform" },
      { href: "#onboarding", label: "Onboarding" },
      { href: "#agent-handoff", label: "Agent handoff" },
      { href: "#integrations", label: "Integrations" },
      { href: "#safety", label: "Safety" },
      { href: "#waitlist", label: "Plans" },
    ],
    hero: {
      eyebrow: "WhatsApp for Agents",
      title: "Give your AI agent a safe WhatsApp inbox.",
      body: "GatewayPort hosts the WhatsApp connection and exposes it as controlled MCP/API tools. Your agent can read context, understand voice notes, images and documents, prepare drafts, schedule approved actions, and keep a full audit trail.",
      primaryCta: "Start the 14-day trial",
      secondaryCta: "See the onboarding flow",
      secondaryHref: "#onboarding",
      microcopy:
        "Starter is planned at US$19/mo after a 14-day no-card trial: 1 WhatsApp connection, low-volume usage, media limits and approval-first sends.",
    },
    proofPoints: [
      "Hosted WhatsApp connection",
      "MCP and REST API tools",
      "Voice, image and document context",
      "Human approval before outbound sends",
    ],
    platform: {
      eyebrow: "The missing layer",
      title: "Agents cannot help with work they cannot see.",
      body: "Real business context lives inside WhatsApp: voice notes, photos, PDFs, customer threads, supplier follow-ups and messy operational decisions. Raw messaging APIs only move messages. GatewayPort turns WhatsApp into an agent-ready operating layer with context, media understanding, approval gates and logs.",
      cards: [
        {
          label: "WhatsApp context",
          title: "Expose the work agents cannot see today.",
          body: "Expose conversations, contacts, unread threads, attachments and message history as structured context your agent can safely inspect.",
        },
        {
          label: "Media understanding",
          title: "Voice notes, images and files become usable context.",
          body: "Transcribe voice notes, read images, extract document context and keep the source media tied to the conversation.",
        },
        {
          label: "Controlled action",
          title: "Agents can prepare. Humans approve.",
          body: "Let agents draft, summarize and prepare actions while approval rules decide what can actually be sent.",
        },
      ],
    },
    agents: {
      eyebrow: "What your agent gets",
      title: "The WhatsApp tools agents need before they act.",
      body: "GatewayPort gives MCP and API agents the context, media tools, approval surface and audit trail they need before any outbound action is allowed.",
      tools: [
        {
          title: "Read inbox state",
          body: "List conversations, fetch recent messages, detect unread threads and give your agent enough context to answer with memory instead of guessing.",
        },
        {
          title: "Understand voice notes",
          body: "Turn audio into searchable text so agents can extract tasks, urgency, names, decisions and next steps.",
        },
        {
          title: "Read images and documents",
          body: "Let agents inspect photos, receipts, screenshots, PDFs and files without treating WhatsApp as a black box.",
        },
        {
          title: "Prepare approval-ready drafts",
          body: "Agents or client workflows can prepare replies, summaries and follow-ups while humans keep the final say before anything leaves the account.",
        },
        {
          title: "Connect through API or MCP",
          body: "Use GatewayPort from Codex, Claude, ChatGPT, OpenClaw, n8n or your own agent stack through a controlled tool surface.",
        },
        {
          title: "Keep an audit trail",
          body: "Track reads, drafts, approvals, sends, failed actions and connection events so WhatsApp automation stays accountable.",
        },
      ],
    },
    useCases: {
      eyebrow: "Built for real agent workflows",
      title: "Start with context. Add action only when it is safe.",
      body: "The first screen speaks to AI-agent operators. Below the fold, the same product proves itself for developers, agencies and operators who need WhatsApp context without uncontrolled automation.",
      cards: [
        {
          title: "Agent builders",
          body: "Connect your custom agent to WhatsApp without rebuilding session hosting, media processing, approval queues and logs from scratch.",
          cta: "Build with MCP/API",
        },
        {
          title: "Automation agencies",
          body: "Run client WhatsApp agent workflows with clearer boundaries: hosted connections, media limits, approval-first sends and reconnect support.",
          cta: "Run client workflows",
        },
        {
          title: "WhatsApp-heavy operations",
          body: "Turn voice notes, photos, documents and scattered conversations into structured work your tools can organize before a human approves the next move.",
          cta: "Organize WhatsApp work",
        },
      ],
    },
    onboarding: {
      eyebrow: "Onboarding",
      title: "Start with an agent-ready workspace before connecting WhatsApp.",
      body: "The first setup is intentionally guided. GatewayPort verifies identity, explains the connection risk, captures the intended use case, then opens the WhatsApp connection path only after the right checks are complete.",
      note: "Workspace first. Payment or browser success never connects WhatsApp by itself.",
      labelsTitle: "Dashboard preview",
      labels: [
        "Connection health",
        "Pending approvals",
        "Media actions",
        "Scheduled actions",
        "Audit log",
        "Usage",
      ],
      steps: [
        {
          step: "01",
          title: "Create your workspace",
          body: "Sign in with Google or GitHub, verify email, and name the workspace your agents will use.",
        },
        {
          step: "02",
          title: "Choose the first workflow",
          body: "Tell us whether you need inbox context, media understanding, approval drafts, scheduled actions, or a custom MCP/API integration.",
        },
        {
          step: "03",
          title: "Review connection limits",
          body: "Confirm that the trial is approval-first, not for bulk messaging, and may require a lab or official-provider path depending on risk.",
        },
        {
          step: "04",
          title: "Connect when approved",
          body: "After the gate, follow the WhatsApp connection checklist and keep connection health visible in the dashboard.",
        },
      ],
    },
    integrations: {
      eyebrow: "API and MCP",
      title: "One gateway between WhatsApp and your agent stack.",
      body: "GatewayPort exposes WhatsApp as a controlled tool layer. Agents can list conversations, get messages, fetch media, prepare approval payloads, request approval, send approved messages and inspect audit logs without taking direct ownership of the WhatsApp session.",
      note: "Designed for Codex, Claude, ChatGPT, OpenClaw, n8n, Make, Zapier-style workflows and custom internal agents.",
      preview: "Tool surface preview",
      cta: "Start with the Starter plan",
    },
    safety: {
      eyebrow: "Approval-first by design",
      title: "Agents should prepare. Humans should approve.",
      body: "GatewayPort is not built for spam, bulk blasting or unattended outbound bots. The first product boundary is safety: approval gates, rate limits, idempotent sends, logs, retention controls and a clear separation between lab-mode prototypes and official provider production paths.",
      bullets: [
        "Human approval before sensitive outbound sends",
        "Audit logs for draft, approval and send events",
        "Rate limits and abuse controls",
        "Idempotency to avoid duplicate sends",
        "Retention controls for messages and media",
        "Official-provider path for production WhatsApp Business workflows",
      ],
    },
    waitlist: {
      eyebrow: "Early access plans",
      title: "Start with one WhatsApp connection for one agent workflow.",
      body: "GatewayPort is moving from waitlist to paid-plan onboarding. Start with the 14-day no-card Starter trial. The first paid plan is planned at US$19/month for one low-volume WhatsApp connection, 500 messages, 100 media understanding actions and 30-day retention.",
      plans: [
        {
          name: "Starter",
          price: "US$19/mo",
          body: "1 WhatsApp connection, low-volume context, 100 media actions, 30-day retention and approval-first scheduled sends.",
        },
        {
          name: "Builder",
          price: "US$49/mo",
          body: "More room for builder workflows, media-heavy tests and client demos. Limits open after the Starter path is stable.",
        },
        {
          name: "Pro",
          price: "US$99/mo",
          body: "For agencies and teams that need multiple workflows, stronger visibility and higher media volume.",
        },
      ],
      goodFitTitle: "Good fit",
      notFitTitle: "Not a fit",
      goodFit: [
        "Agent builders using Codex, Claude, ChatGPT, OpenClaw or custom tools",
        "Automation agencies serving WhatsApp-heavy clients",
        "Operations teams that receive voice notes, images and PDFs through WhatsApp",
        "Teams willing to start with approval-first workflows",
      ],
      notFit: [
        "Bulk messaging",
        "Scraping",
        "Unattended mass outbound",
        "Claims of zero ban risk",
        "Mission-critical usage on an unofficial lab connection without accepted risk",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "The questions to answer before promotion.",
      items: [
        {
          question: "Is GatewayPort an official WhatsApp or Meta product?",
          answer:
            "No. GatewayPort is not affiliated with WhatsApp or Meta. It is an independent hosted connection and agent tooling layer. For production business workflows, we can evaluate an official WhatsApp Business provider path.",
        },
        {
          question: "Is this for bulk messaging?",
          answer:
            "No. GatewayPort is built for agent workflows, context, drafts, approvals and operational follow-up. It is not positioned for spam, scraping or mass outbound campaigns.",
        },
        {
          question: "Can an agent send messages automatically?",
          answer:
            "The default product posture is approval-first. Agents can prepare drafts and request actions; outbound sends can require human approval, rate limits and audit logs.",
        },
        {
          question: "What can agents read?",
          answer:
            "Depending on the approved setup, agents can inspect conversations, recent messages, unread threads, contacts, attachments, voice notes, images, documents and audit events through controlled tools.",
        },
        {
          question: "Does GatewayPort support MCP?",
          answer:
            "MCP is part of the product direction. GatewayPort is designed around a tool surface that can serve MCP agents, REST API clients and automation workflows.",
        },
        {
          question: "What about audio, images and PDFs?",
          answer:
            "GatewayPort treats media as a core part of WhatsApp work. Voice transcription, image understanding and document extraction are planned as metered media actions because they drive real processing and storage cost.",
        },
      ],
    },
    formLocale: "en" as const,
    console: {
      aria: "GatewayPort demo panel",
      status: "Agent tools online",
      search: "Search conversations",
      threads: [
        ["Client onboarding", "Voice note processed"],
        ["Ops requests", "3 pending approvals"],
        ["Documents", "PDF context ready"],
      ],
      workspace: "Agent workspace",
      connected: "MCP tools connected",
      bubbles: [
        "New voice note from Maria. Transcription ready.",
        "Draft reply prepared. Waiting for approval.",
        "Context: image + last 12 messages + CRM note.",
      ],
      approvalQueue: "Approval queue",
      humanGate: "Human gate active",
      action: "Agent action",
      approveAsk: "Send summary and ask for the signed file?",
      approveAnswer: "Yes, but keep the tone short and professional.",
      previewLabel: "Draft awaiting approval",
      previewText:
        "Maria, I reviewed the audio and image. Please send the signed PDF so we can finish the setup today.",
      actions: ["Approve", "Edit"],
      audit: "Audit log ready",
    },
  },
  pt: {
    analyticsVariant: "default",
    navAria: "Navegacao GatewayPort",
    brandHref: "/pt",
    languageLink: { href: "/", label: "English" },
    headerTagline: "WhatsApp para Agentes",
    headerCta: "Comecar teste",
    navLinks: [
      { href: "#platform", label: "Plataforma" },
      { href: "#onboarding", label: "Onboarding" },
      { href: "#agent-handoff", label: "Handoff" },
      { href: "#integrations", label: "Integracoes" },
      { href: "#safety", label: "Seguranca" },
      { href: "#waitlist", label: "Planos" },
    ],
    hero: {
      eyebrow: "WhatsApp para Agentes",
      title: "De ao seu agente de IA uma caixa de WhatsApp segura.",
      body: "GatewayPort hospeda a conexao do WhatsApp e entrega uma superficie controlada de ferramentas MCP/API. Seu agente pode ler contexto, entender audios, imagens e documentos, preparar rascunhos, programar acoes aprovadas e manter auditoria completa.",
      primaryCta: "Comecar teste de 14 dias",
      secondaryCta: "Ver o onboarding",
      secondaryHref: "#onboarding",
      microcopy:
        "Starter previsto por R$97/mes depois de 14 dias sem cartao: 1 WhatsApp, baixo volume, limites de midia e envios com aprovacao.",
    },
    proofPoints: [
      "Conexao hospedada de WhatsApp",
      "Ferramentas MCP e API REST",
      "Contexto de audio, imagem e documento",
      "Aprovacao humana antes de envios",
    ],
    platform: {
      eyebrow: "A camada que faltava",
      title: "Agentes nao ajudam no trabalho que nao conseguem enxergar.",
      body: "Contexto real de negocio vive no WhatsApp: audios, fotos, PDFs, conversas com clientes, follow-ups de fornecedores e decisoes operacionais baguncadas. APIs cruas so movem mensagens. GatewayPort transforma WhatsApp em uma camada pronta para agentes, com contexto, leitura de midia, aprovacao e logs.",
      cards: [
        {
          label: "Contexto do WhatsApp",
          title: "Mostre o trabalho que os agentes nao veem hoje.",
          body: "Exponha conversas, contatos, nao lidos, anexos e historico como contexto estruturado que seu agente pode inspecionar com seguranca.",
        },
        {
          label: "Leitura de midia",
          title: "Audios, imagens e arquivos viram contexto utilizavel.",
          body: "Transcreva audios, leia imagens, extraia contexto de documentos e mantenha a midia de origem ligada a conversa.",
        },
        {
          label: "Acao controlada",
          title: "Agentes preparam. Humanos aprovam.",
          body: "Deixe agentes resumirem e prepararem acoes enquanto regras de aprovacao decidem o que realmente pode ser enviado.",
        },
      ],
    },
    agents: {
      eyebrow: "O que seu agente recebe",
      title: "As ferramentas de WhatsApp que agentes precisam antes de agir.",
      body: "GatewayPort da a agentes MCP e API o contexto, as ferramentas de midia, a superficie de aprovacao e a auditoria necessarios antes de qualquer acao de saida.",
      tools: [
        {
          title: "Ler estado da inbox",
          body: "Liste conversas, busque mensagens recentes, detecte nao lidos e de ao agente contexto suficiente para responder com memoria em vez de chutar.",
        },
        {
          title: "Entender audios",
          body: "Transforme audio em texto pesquisavel para extrair tarefas, urgencia, nomes, decisoes e proximos passos.",
        },
        {
          title: "Ler imagens e documentos",
          body: "Permita que agentes inspecionem fotos, recibos, prints, PDFs e arquivos sem tratar o WhatsApp como caixa-preta.",
        },
        {
          title: "Preparar rascunhos para aprovacao",
          body: "Agentes ou fluxos do cliente podem preparar respostas, resumos e follow-ups enquanto humanos mantem a decisao final antes de qualquer envio.",
        },
        {
          title: "Conectar via API ou MCP",
          body: "Use GatewayPort com Codex, Claude, ChatGPT, OpenClaw, n8n ou seu proprio stack de agentes por uma superficie controlada de ferramentas.",
        },
        {
          title: "Manter trilha de auditoria",
          body: "Rastreie leituras, rascunhos, aprovacoes, envios, falhas e eventos de conexao para manter a automacao responsavel.",
        },
      ],
    },
    useCases: {
      eyebrow: "Feito para fluxos reais de agentes",
      title: "Comece com contexto. Adicione acao so quando for seguro.",
      body: "A primeira tela fala com operadores de agentes de IA. Depois, o produto se prova para devs, agencias e operacoes que precisam de contexto de WhatsApp sem automacao descontrolada.",
      cards: [
        {
          title: "Builders de agentes",
          body: "Conecte seu agente ao WhatsApp sem reconstruir hospedagem de sessao, leitura de midia, filas de aprovacao e logs do zero.",
          cta: "Construir com MCP/API",
        },
        {
          title: "Agencias de automacao",
          body: "Rode fluxos de agentes para clientes com limites claros: conexoes hospedadas, limites de midia, envios approval-first e suporte de reconexao.",
          cta: "Rodar fluxos de clientes",
        },
        {
          title: "Operacoes intensas em WhatsApp",
          body: "Transforme audios, fotos, documentos e conversas espalhadas em trabalho estruturado que suas ferramentas organizam antes da aprovacao humana.",
          cta: "Organizar o WhatsApp",
        },
      ],
    },
    onboarding: {
      eyebrow: "Onboarding",
      title: "Comece com um workspace pronto para agentes antes de conectar o WhatsApp.",
      body: "A primeira configuracao e guiada. O GatewayPort verifica identidade, explica o risco da conexao, captura o caso de uso e so abre o caminho de conexao do WhatsApp depois dos checks certos.",
      note: "Workspace primeiro. Pagamento ou retorno do navegador nunca conecta o WhatsApp sozinho.",
      labelsTitle: "Preview do dashboard",
      labels: [
        "Saude da conexao",
        "Aprovacoes pendentes",
        "Acoes de midia",
        "Acoes programadas",
        "Log de auditoria",
        "Uso",
      ],
      steps: [
        {
          step: "01",
          title: "Crie seu workspace",
          body: "Entre com Google ou GitHub, verifique o email e nomeie o workspace que seus agentes vao usar.",
        },
        {
          step: "02",
          title: "Escolha o primeiro fluxo",
          body: "Diga se voce precisa de contexto de inbox, leitura de midia, rascunhos para aprovacao, acoes programadas ou integracao MCP/API customizada.",
        },
        {
          step: "03",
          title: "Revise os limites da conexao",
          body: "Confirme que o teste e approval-first, nao serve para disparo em massa e pode exigir modo laboratorio ou caminho oficial conforme o risco.",
        },
        {
          step: "04",
          title: "Conecte quando aprovado",
          body: "Depois do gate, siga o checklist de conexao do WhatsApp e acompanhe a saude da conexao no dashboard.",
        },
      ],
    },
    integrations: {
      eyebrow: "API e MCP",
      title: "Um gateway entre WhatsApp e seu stack de agentes.",
      body: "GatewayPort expoe o WhatsApp como uma camada controlada de ferramentas. Agentes podem listar conversas, buscar mensagens, acessar midia, preparar payloads para aprovacao, solicitar aprovacao, enviar mensagens aprovadas e consultar logs sem assumir a sessao do WhatsApp diretamente.",
      note: "Desenhado para Codex, Claude, ChatGPT, OpenClaw, n8n, Make, fluxos tipo Zapier e agentes internos customizados.",
      preview: "Preview da superficie de ferramentas",
      cta: "Comecar pelo Starter",
    },
    safety: {
      eyebrow: "Approval-first por design",
      title: "Agentes preparam. Humanos aprovam.",
      body: "GatewayPort nao foi feito para spam, disparo em massa ou bots de saida sem supervisao. O primeiro limite do produto e seguranca: gates de aprovacao, limites de uso, envios idempotentes, logs, controles de retencao e separacao clara entre prototipos em modo laboratorio e caminhos oficiais de producao.",
      bullets: [
        "Aprovacao humana antes de envios sensiveis",
        "Logs para rascunho, aprovacao e envio",
        "Limites de uso e controles antiabuso",
        "Idempotencia para evitar envios duplicados",
        "Controles de retencao de mensagens e midia",
        "Caminho oficial para fluxos de WhatsApp Business em producao",
      ],
    },
    waitlist: {
      eyebrow: "Planos em early access",
      title: "Comece com uma conexao de WhatsApp para um fluxo de agente.",
      body: "GatewayPort esta saindo da lista de espera para onboarding com plano pago. Comece pelo teste Starter de 14 dias sem cartao. O primeiro plano pago esta previsto em R$97/mes para uma conexao de WhatsApp de baixo volume, 500 mensagens, 100 acoes de midia e 30 dias de retencao.",
      plans: [
        {
          name: "Starter",
          price: "R$97/mes",
          body: "1 WhatsApp, contexto de baixo volume, 100 acoes de midia, 30 dias de retencao e envios programados com aprovacao.",
        },
        {
          name: "Builder",
          price: "Em seguida",
          body: "Mais espaco para fluxos de builders, testes com midia e demos para clientes depois que o Starter estiver estavel.",
        },
        {
          name: "Pro",
          price: "Sob consulta",
          body: "Para agencias e times que precisam de mais fluxos, visibilidade e volume de midia.",
        },
      ],
      goodFitTitle: "Bom fit",
      notFitTitle: "Nao e fit",
      goodFit: [
        "Builders usando Codex, Claude, ChatGPT, OpenClaw ou ferramentas proprias",
        "Agencias de automacao com clientes intensivos em WhatsApp",
        "Operacoes que recebem audios, imagens e PDFs pelo WhatsApp",
        "Times dispostos a comecar com fluxos approval-first",
      ],
      notFit: [
        "Disparo em massa",
        "Scraping",
        "Saida em massa sem supervisao",
        "Promessas de risco zero de banimento",
        "Inbox critica em conexao laboratorio sem aceite de risco",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Perguntas para responder antes da promocao.",
      items: [
        {
          question: "GatewayPort e um produto oficial do WhatsApp ou Meta?",
          answer:
            "Nao. GatewayPort nao e afiliado ao WhatsApp ou a Meta. Ele e uma camada independente de conexao hospedada e ferramentas para agentes. Para fluxos de negocio em producao, avaliamos um caminho oficial de WhatsApp Business.",
        },
        {
          question: "Isso serve para disparo em massa?",
          answer:
            "Nao. GatewayPort foi construido para fluxos de agentes, contexto, rascunhos, aprovacoes e follow-up operacional. Nao e posicionado para spam, scraping ou campanhas de massa.",
        },
        {
          question: "Um agente pode enviar mensagens automaticamente?",
          answer:
            "A postura padrao e approval-first. Agentes podem preparar rascunhos e solicitar acoes; envios podem exigir aprovacao humana, limites e logs.",
        },
        {
          question: "O que agentes podem ler?",
          answer:
            "Dependendo da configuracao aprovada, agentes podem inspecionar conversas, mensagens recentes, nao lidos, contatos, anexos, audios, imagens, documentos e eventos de auditoria por ferramentas controladas.",
        },
        {
          question: "GatewayPort suporta MCP?",
          answer:
            "MCP faz parte da direcao do produto. GatewayPort foi desenhado em torno de uma superficie de ferramentas para agentes MCP, clientes REST API e automacoes.",
        },
        {
          question: "E audio, imagens e PDFs?",
          answer:
            "GatewayPort trata midia como parte central do trabalho no WhatsApp. Transcricao de audio, leitura de imagem e extracao de documentos sao planejadas como acoes de midia medidas porque geram custo real de processamento e armazenamento.",
        },
      ],
    },
    formLocale: "pt" as const,
    console: {
      aria: "Painel demo GatewayPort",
      status: "Ferramentas do agente online",
      search: "Buscar conversas",
      threads: [
        ["Onboarding do cliente", "Audio processado"],
        ["Pedidos operacionais", "3 aprovacoes pendentes"],
        ["Documentos", "Contexto de PDF pronto"],
      ],
      workspace: "Workspace do agente",
      connected: "Ferramentas MCP conectadas",
      bubbles: [
        "Novo audio da Maria. Transcricao pronta.",
        "Rascunho preparado. Aguardando aprovacao.",
        "Contexto: imagem + ultimas 12 mensagens + nota do CRM.",
      ],
      approvalQueue: "Fila de aprovacao",
      humanGate: "Gate humano ativo",
      action: "Acao do agente",
      approveAsk: "Enviar resumo e pedir o arquivo assinado?",
      approveAnswer: "Sim, mas mantenha o tom curto e profissional.",
      previewLabel: "Rascunho aguardando aprovacao",
      previewText:
        "Maria, revisei o audio e a imagem. Envie o PDF assinado para finalizarmos o setup hoje.",
      actions: ["Aprovar", "Editar"],
      audit: "Log de auditoria pronto",
    },
  },
};

const integrationTools = [
  "list_connections",
  "list_conversations",
  "get_messages",
  "fetch_media",
  "process_media",
  "schedule_message",
  "cancel_scheduled_message",
  "request_approval",
  "send_approved_message",
  "get_audit_log",
];

export default function GatewayPortPageContent({
  locale = "en",
}: {
  locale?: GatewayPortLocale;
}) {
  const copy = gatewayPortCopy[locale];

  return (
    <main className="bg-[#f7f3ea] text-[#171813]">
      <LandingAnalytics page="gatewayport" variant="default" />
      <section className="v21-hero-shell relative overflow-hidden text-white">
        <div className="v21-hero-grid absolute inset-0" aria-hidden="true" />
        <div className="v21-hero-glow absolute inset-0" aria-hidden="true" />
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <a href={copy.brandHref} className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white/10 font-display text-lg">
              GP
            </span>
            <span>
              <span className="block font-display text-xl">GatewayPort</span>
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                {copy.headerTagline}
              </span>
            </span>
          </a>
          <nav
            className="hidden items-center gap-7 text-sm font-semibold text-white/72 md:flex"
            aria-label={copy.navAria}
          >
            {copy.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
            <a href={copy.languageLink.href} className="hover:text-white">
              {copy.languageLink.label}
            </a>
          </nav>
          <TrackedCtaLink
            href="#waitlist"
            position="header"
            destination="trial"
            className="rounded-md bg-white px-4 py-2 text-sm font-bold text-[#054048] shadow-[0_18px_45px_-30px_rgba(0,0,0,0.9)] transition hover:bg-[#f7f3ea]"
          >
            {copy.headerCta}
          </TrackedCtaLink>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:pb-24 lg:pt-16">
          <div className="hero-copy max-w-2xl">
            <p className="inline-flex rounded-md border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-[#9deaf4]">
              {copy.hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
              {copy.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/74 sm:text-xl">
              {copy.hero.body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedCtaLink
                href="#waitlist"
                position="hero"
                destination="trial"
                className="rounded-md bg-[#d6b25c] px-6 py-3.5 text-center text-base font-extrabold text-[#152022] transition hover:bg-[#e4c878]"
              >
                {copy.hero.primaryCta}
              </TrackedCtaLink>
              <a
                href={copy.hero.secondaryHref}
                className="rounded-md border border-white/20 px-6 py-3.5 text-center text-base font-extrabold text-white transition hover:border-white/38 hover:bg-white/8"
              >
                {copy.hero.secondaryCta}
              </a>
            </div>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-white/72 sm:grid-cols-2">
              {copy.proofPoints.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9deaf4]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-lg text-sm font-semibold leading-6 text-white/58">
              {copy.hero.microcopy}
            </p>
          </div>

          <HeroConsole copy={copy.console} />
        </div>
      </section>

      <section id="platform" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
                {copy.platform.eyebrow}
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight text-[#0b2f35] sm:text-5xl">
                {copy.platform.title}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-[#5f5a4d]">
              {copy.platform.body}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.platform.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-[#ded4c0] bg-white/82 p-6 shadow-[0_22px_70px_-58px_rgba(5,64,72,0.58)]"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
                  {card.label}
                </p>
                <h3 className="mt-4 text-2xl font-black leading-tight text-[#0b2f35]">
                  {card.title}
                </h3>
                <p className="mt-4 leading-7 text-[#625b4d]">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agents" className="bg-[#edf4ef] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
              {copy.agents.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b2f35] sm:text-5xl">
              {copy.agents.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5a4d]">
              {copy.agents.body}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {copy.agents.tools.map((tool) => (
              <article
                key={tool.title}
                className="rounded-lg border border-[#ccddcf] bg-[#fbf7ef] p-6"
              >
                <div className="grid h-10 w-10 place-items-center rounded-md bg-[#054048] text-sm font-black text-white">
                  {tool.title.slice(0, 2)}
                </div>
                <h3 className="mt-5 text-xl font-black text-[#0b2f35]">
                  {tool.title}
                </h3>
                <p className="mt-3 leading-7 text-[#625b4d]">{tool.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
              {copy.useCases.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b2f35] sm:text-5xl">
              {copy.useCases.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5a4d]">
              {copy.useCases.body}
            </p>
          </div>

          <div className="grid gap-4">
            {copy.useCases.cards.map((useCase) => (
              <article
                key={useCase.title}
                className="rounded-lg border border-[#ded4c0] bg-white/86 p-6 shadow-[0_20px_60px_-52px_rgba(5,64,72,0.5)]"
              >
                <h3 className="text-2xl font-black text-[#0b2f35]">
                  {useCase.title}
                </h3>
                <p className="mt-3 leading-7 text-[#625b4d]">{useCase.body}</p>
                <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.14em] text-[#0b8da0]">
                  {useCase.cta}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="onboarding"
        className="bg-[#f1f7f2] px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
              {copy.onboarding.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b2f35] sm:text-5xl">
              {copy.onboarding.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5a4d]">
              {copy.onboarding.body}
            </p>
            <p className="mt-6 rounded-md border border-[#cdddcf] bg-white px-4 py-3 text-sm font-bold leading-6 text-[#174249]">
              {copy.onboarding.note}
            </p>
            <div className="mt-6 rounded-lg border border-[#cdddcf] bg-[#fbf7ef] p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
                {copy.onboarding.labelsTitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {copy.onboarding.labels.map((label) => (
                  <span
                    key={label}
                    className="rounded-md border border-[#d7cab2] bg-white px-3 py-2 text-xs font-bold text-[#174249]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {copy.onboarding.steps.map((step) => (
              <article
                key={step.step}
                className="rounded-lg border border-[#cdddcf] bg-[#fbf7ef] p-5"
              >
                <div className="grid h-12 w-12 place-items-center rounded-md bg-[#054048] font-display text-base text-white">
                  {step.step}
                </div>
                <h3 className="mt-5 text-xl font-black text-[#0b2f35]">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-[#625b4d]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GatewayPortHandoffScreen locale={locale} />

      <section
        id="integrations"
        className="bg-[#063840] px-5 py-20 text-white sm:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#9deaf4]">
              {copy.integrations.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              {copy.integrations.title}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
              {copy.integrations.body}
            </p>
            <p className="mt-6 max-w-2xl text-sm font-semibold leading-6 text-white/58">
              {copy.integrations.note}
            </p>
          </div>
          <div className="rounded-lg border border-white/14 bg-white/8 p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#9deaf4]">
              {copy.integrations.preview}
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {integrationTools.map((tool) => (
                <code
                  key={tool}
                  className="rounded-md border border-white/10 bg-[#082c32] px-3 py-2 text-xs font-bold text-[#d7f9fc]"
                >
                  {tool}
                </code>
              ))}
            </div>
            <TrackedCtaLink
              href="#waitlist"
              position="integrations"
              destination="trial"
              className="mt-6 inline-flex rounded-md bg-[#d6b25c] px-5 py-3 text-sm font-extrabold text-[#152022] transition hover:bg-[#e4c878]"
            >
              {copy.integrations.cta}
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <section id="safety" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
              {copy.safety.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b2f35] sm:text-5xl">
              {copy.safety.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f5a4d]">
              {copy.safety.body}
            </p>
          </div>

          <div className="grid gap-3">
            {copy.safety.bullets.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-[#ded4c0] bg-white/86 p-4"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0b8da0]" />
                <span className="font-semibold leading-6 text-[#38433d]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_0.8fr] lg:items-start">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
              {copy.waitlist.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight text-[#0b2f35] sm:text-5xl">
              {copy.waitlist.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5f5a4d]">
              {copy.waitlist.body}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.waitlist.plans.map((plan) => (
                <article
                  key={plan.name}
                  className="rounded-lg border border-[#cdddcf] bg-white/82 p-5"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
                    {plan.name}
                  </p>
                  <p className="mt-3 font-display text-2xl text-[#0b2f35]">
                    {plan.price}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#625b4d]">
                    {plan.body}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-lg border border-[#cdddcf] bg-white/78 p-5">
                <h3 className="text-lg font-black text-[#0b2f35]">
                  {copy.waitlist.goodFitTitle}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#625b4d]">
                  {copy.waitlist.goodFit.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b8da0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-[#ded4c0] bg-white/78 p-5">
                <h3 className="text-lg font-black text-[#0b2f35]">
                  {copy.waitlist.notFitTitle}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#625b4d]">
                  {copy.waitlist.notFit.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6b25c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#ded4c0] bg-[#fbf7ef] p-6 shadow-[0_24px_80px_-58px_rgba(5,64,72,0.58)]">
            <GatewayPortWaitlistForm locale={copy.formLocale} />
          </div>
        </div>
      </section>

      <section className="bg-[#edf4ef] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#0b8da0]">
              {copy.faq.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#0b2f35] sm:text-5xl">
              {copy.faq.title}
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {copy.faq.items.map((item) => (
              <article
                key={item.question}
                className="rounded-lg border border-[#ccddcf] bg-[#fbf7ef] p-6"
              >
                <h3 className="text-xl font-black leading-snug text-[#0b2f35]">
                  {item.question}
                </h3>
                <p className="mt-3 leading-7 text-[#625b4d]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroConsole({
  copy,
}: {
  copy: (typeof gatewayPortCopy)["en"]["console"];
}) {
  return (
    <div className="sg-device-stage mx-auto" aria-label={copy.aria}>
      <div className="sg-laptop">
        <div className="sg-laptop-camera" />
        <div className="sg-screen">
          <div className="sg-window-bar">
            <span />
            <span />
            <span />
            <p>gatewayport.vcnamidia.com.br</p>
          </div>
          <div className="sg-whatsapp-app">
            <aside className="sg-wa-sidebar">
              <div className="sg-wa-user">
                <strong>GP</strong>
                <p>GatewayPort</p>
                <span>{copy.status}</span>
              </div>
              <div className="sg-wa-search">{copy.search}</div>
              {copy.threads.map(([title, status]) => (
                <div key={title} className="sg-wa-thread">
                  <span className="sg-wa-dot" />
                  <p>{title}</p>
                  <span>{status}</span>
                </div>
              ))}
            </aside>
            <section className="sg-wa-chat">
              <header>
                <div className="sg-wa-avatar">AI</div>
                <div>
                  <p>{copy.workspace}</p>
                  <span>{copy.connected}</span>
                </div>
              </header>
              <div className="sg-wa-bubbles">
                {copy.bubbles.map((bubble, index) => (
                  <div
                    key={bubble}
                    className={`sg-bubble ${
                      index === 1 ? "sg-bubble-out" : "sg-bubble-in"
                    }`}
                  >
                    {bubble}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className="sg-laptop-base" />
      </div>

      <div className="sg-chat-screen">
        <div className="sg-chat-header">
          <div className="sg-wa-avatar">GP</div>
          <div>
            <p>{copy.approvalQueue}</p>
            <span>{copy.humanGate}</span>
          </div>
        </div>
        <div className="sg-chat-date">{copy.action}</div>
        <div className="sg-chat-bubbles">
          <div className="sg-bubble sg-bubble-in">{copy.approveAsk}</div>
          <div className="sg-bubble sg-bubble-out">{copy.approveAnswer}</div>
        </div>
        <div className="sg-approval-preview">
          <p className="sg-approval-label">{copy.previewLabel}</p>
          <p className="sg-approval-text">{copy.previewText}</p>
          <div className="sg-approval-actions">
            {copy.actions.map((action) => (
              <span key={action}>{action}</span>
            ))}
          </div>
        </div>
        <div className="sg-chat-input">
          <span>{copy.audit}</span>
          <span aria-hidden="true">OK</span>
        </div>
      </div>
    </div>
  );
}
