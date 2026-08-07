import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./institutional.module.css";

export const metadata: Metadata = {
  title: "Tecnologia para o trabalho real",
  description:
    "A Soul Gênia cria produtos de inteligência artificial para organizar rotinas, conectar agentes e transformar conhecimento em execução.",
  robots: { index: false, follow: false },
};

const heroAlt =
  "Profissional coordenando mensagens, decisões e fluxos de trabalho com painéis digitais integrados";

const { props: heroDesktop } = getImageProps({
  src: "/images/heroes/v3/orquestra-desktop.webp",
  alt: heroAlt,
  width: 1342,
  height: 941,
  priority: true,
  sizes: "58vw",
});

const { props: heroMobile } = getImageProps({
  src: "/images/heroes/v3/orquestra-mobile.webp",
  alt: heroAlt,
  width: 940,
  height: 941,
  priority: true,
  sizes: "100vw",
});

export default function InstitutionalPreviewPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Soul Gênia — início">
          <Image className={styles.mark} src="/images/soul-genia-profile-mark.png" alt="" width={40} height={40} />
          <span>Soul Gênia</span>
        </Link>
        <nav className={styles.nav} aria-label="Navegação institucional">
          <a href="#produtos">Produtos</a>
          <a href="#empresa">A empresa</a>
        </nav>
        <a className={styles.navCta} href="#produtos">Conheça o portfólio <span>↘</span></a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroArt}>
          <picture>
            <source media="(min-width: 901px)" srcSet={heroDesktop.srcSet} sizes={heroDesktop.sizes} />
            <img {...heroMobile} fetchPriority="high" />
          </picture>
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}><span /> Tecnologia feita para pessoas</p>
          <h1>Inteligência artificial<br />que entra no <em>trabalho</em><br />de verdade.</h1>
          <div className={styles.heroBottom}>
            <p>Criamos produtos que tiram a inteligência artificial da promessa e colocam capacidade real na rotina de pessoas e empresas.</p>
            <a href="#produtos" aria-label="Ver produtos Soul Gênia">Explorar produtos <span>↓</span></a>
          </div>
        </div>
        <div className={styles.heroSignal} aria-hidden="true"><span>Gênia</span><span>GatewayPort</span><span>Mentora Beta</span></div>
      </section>

      <section className={styles.manifesto} id="empresa">
        <p className={styles.sectionLabel}>Nossa tese</p>
        <Reveal className={styles.manifestoInner}>
          <h2>Tecnologia só importa quando muda o que é possível fazer.</h2>
          <div className={styles.manifestoCopy}>
            <p>A Soul Gênia é uma empresa brasileira de tecnologia que cria produtos de inteligência artificial para o mundo real.</p>
            <p>Construímos ferramentas que organizam a complexidade, ampliam a capacidade humana e trabalham junto — com contexto, responsabilidade e propósito.</p>
          </div>
        </Reveal>
      </section>

      <section className={styles.productStories} id="produtos">
        <Reveal className={styles.storiesIntro}>
          <p className={styles.sectionLabel}>Nosso portfólio</p>
          <h2>Três produtos.<br />Três formas de ampliar o que uma pessoa consegue fazer.</h2>
        </Reveal>

        <Reveal className={styles.story}>
          <div className={styles.storyVisual}>
            <Image
              className={styles.auriaPortrait}
              src="/images/institutional/auria-portrait.webp"
              alt="Áurea, a identidade visual da Gênia Secretária"
              width={800}
              height={1000}
              sizes="(max-width: 760px) 90vw, 42vw"
            />
            <div className={`${styles.floatingNote} ${styles.noteMorning}`}><small>07:30</small><strong>Seu dia já está organizado.</strong><span>Agenda, prioridades e mensagens importantes.</span></div>
            <div className={`${styles.floatingNote} ${styles.noteApproval}`}><small>Com sua aprovação</small><strong>Mensagem pronta para enviar</strong><span>A decisão final continua sendo sua.</span></div>
          </div>
          <div className={styles.storyCopy}>
            <span className={styles.storyNumber}>01</span>
            <p className={styles.storyEyebrow}>Organização pessoal e profissional</p>
            <h3>Gênia Secretária</h3>
            <p>Uma secretária que entende conversas, agenda, lembretes e pendências nos canais onde a vida já acontece.</p>
            <div className={styles.storyTags}><span>WhatsApp</span><span>Briefing diário</span><span>Aprovação humana</span></div>
            <Link className={styles.storyCta} href="/v3/aprova">Conhecer a Gênia <span>↗</span></Link>
          </div>
        </Reveal>

        <Reveal className={`${styles.story} ${styles.gatewayStory}`}>
          <div className={styles.storyCopy}>
            <span className={styles.storyNumber}>02</span>
            <p className={styles.storyEyebrow}>Infraestrutura para agentes</p>
            <h3>GatewayPort</h3>
            <p>A conexão entre agentes de inteligência artificial e o WhatsApp, com memória permanente, mídia compreendida e envios sob controle.</p>
            <div className={styles.storyTags}><span>MCP + API</span><span>Memória</span><span>Approval-first</span></div>
            <a className={styles.storyCta} href="https://gp.soulgenia.com.br/">Explorar o GatewayPort <span>↗</span></a>
          </div>
          <div className={styles.gatewayVisual}>
            <div className={styles.browserChrome}><i /><i /><i /><span>gp.soulgenia.com.br</span></div>
            <Image
              src="/images/institutional/gatewayport-live.webp"
              alt="Página do GatewayPort mostrando a conexão de agentes de IA ao WhatsApp"
              width={1200}
              height={750}
              sizes="(max-width: 760px) 94vw, 58vw"
            />
            <div className={styles.gatewayPulse} aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal className={`${styles.story} ${styles.betaStory}`}>
          <div className={styles.betaVisual}>
            <div className={styles.betaDevice}>
              <div className={styles.betaAppBar}><span>Mentora Beta</span><small>presente</small></div>
              <Image
                src="/images/institutional/beta-portrait.webp"
                alt="Avatar da Mentora Beta"
                width={800}
                height={800}
                sizes="(max-width: 760px) 76vw, 32vw"
              />
              <div className={styles.betaPrompt}><span>Seu próximo passo</span><strong>Vamos transformar essa intenção em uma decisão clara.</strong></div>
            </div>
            <div className={styles.betaOrbit} aria-hidden="true"><span>Clareza</span><span>Direção</span><span>Ação</span></div>
          </div>
          <div className={styles.storyCopy}>
            <div className={styles.betaStatus}>Em desenvolvimento</div>
            <span className={styles.storyNumber}>03</span>
            <p className={styles.storyEyebrow}>Conhecimento que vira direção</p>
            <h3>Mentora Beta</h3>
            <p>Uma mentora inteligente construída a partir do método, da voz e do repertório da Beta para acompanhar decisões e próximos passos.</p>
            <div className={styles.storyTags}><span>Mentoria contínua</span><span>Contexto</span><span>Próximo passo</span></div>
          </div>
        </Reveal>
      </section>

      <section className={styles.principles}>
        <p className={styles.sectionLabel}>Como construímos</p>
        <Reveal className={styles.principlesLead}>
          <h2>Humana na experiência.<br />Rigorosa na execução.</h2>
          <p>Não fazemos tecnologia para impressionar. Fazemos para funcionar, merecer confiança e liberar o melhor trabalho das pessoas.</p>
        </Reveal>
        <div className={styles.principleGrid}>
          <Reveal delay={0}><article><span>01</span><h3>Útil por natureza</h3><p>Todo produto começa em um problema real, não em uma demonstração de tecnologia.</p></article></Reveal>
          <Reveal delay={90}><article><span>02</span><h3>Contexto importa</h3><p>Inteligência de verdade entende a situação antes de sugerir o próximo passo.</p></article></Reveal>
          <Reveal delay={180}><article><span>03</span><h3>Controle humano</h3><p>Automação deve ampliar autonomia e preservar decisões que pertencem às pessoas.</p></article></Reveal>
        </div>
      </section>

      <section className={styles.closing}>
        <Reveal>
          <p className={styles.sectionLabel}>Soul Gênia</p>
          <h2>O futuro do trabalho<br />não precisa parecer distante.</h2>
          <p>Ele pode começar com uma conversa, uma conexão e uma tarefa bem-feita.</p>
          <a href="mailto:soulgenia@gmail.com">Fale com a Soul Gênia <span>↗</span></a>
        </Reveal>
      </section>

      <footer className={styles.footer}>
        <div className={styles.brand}><Image className={styles.mark} src="/images/soul-genia-profile-mark.png" alt="" width={40} height={40} /><span>Soul Gênia</span></div>
        <p>Inteligência artificial para o trabalho real.</p>
        <nav aria-label="Links do rodapé"><a href="#produtos">Produtos</a><a href="#empresa">Empresa</a><Link href="/privacidade">Privacidade</Link></nav>
        <p>© {new Date().getFullYear()} Soul Gênia</p>
      </footer>
    </main>
  );
}
