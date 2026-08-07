// O diagnóstico personalizado que a pessoa recebe por e-mail.
//
// É a PRIMEIRA coisa que ela recebe da Gênia. Antes disto, quem caía no ramo
// `nurture` lia na tela "vamos te mandar exemplos" e não recebia nada.
//
// ─────────────────────────────────────────────────────────────────────────────
// POR QUE DETERMINÍSTICO, E NÃO GERADO POR MODELO
//
// Um LLM escreveria um texto mais fluido e inventaria capacidade que a Gênia não
// tem — e este e-mail é o primeiro contato dela com um desconhecido. Cada bloco
// aqui descreve algo que o produto FAZ de verdade (ler Gmail e Agenda, resumir
// grupos, transcrever áudio, ler documento, preparar rascunho para aprovação).
// Nada aqui promete envio autônomo, porque a Gênia não envia sem aprovação.
//
// Composição > geração: o diagnóstico sai de dor × volume × perfil, e o texto
// livre da pessoa é CITADO, não parafraseado. Parafrasear com modelo é onde a
// invenção entra.
// ─────────────────────────────────────────────────────────────────────────────

const PERFIL = {
  clinic_owner: "clínica",
  service_provider: "prestação de serviço",
  retail_owner: "comércio",
  course_creator: "cursos e mentorias",
  real_estate: "imóveis e hospedagem",
  other: "sua operação"
};

/**
 * A leitura da dor. Cada bloco é o que a Gênia FAZ para aquele caso — e o
 * limite dela é dito junto, não escondido no rodapé.
 */
const DOR = {
  lead: {
    titulo: "Lead que chega e esfria",
    leitura:
      "Quem pergunta preço no WhatsApp decide rápido. O que perde a venda quase nunca é o preço — é o tempo entre a pergunta e a resposta.",
    oQueElaFaz:
      "A Gênia te avisa quando alguém novo escreve, já com o histórico da conversa resumido, e deixa uma resposta pronta para você aprovar."
  },
  follow_up: {
    titulo: "Follow-up que não acontece",
    leitura:
      "Follow-up não falha por falta de vontade — falha porque ninguém lembra de quem parou de responder três dias atrás.",
    oQueElaFaz:
      "Ela acompanha quem ficou sem resposta e te lembra, com o contexto do que já foi conversado. Você decide o que enviar; ela não manda nada sozinha."
  },
  scheduling: {
    titulo: "Agenda que vive no meio da conversa",
    leitura:
      "Marcar, remarcar e confirmar dentro do WhatsApp consome mais tempo que o atendimento em si — e é onde os furos aparecem.",
    oQueElaFaz:
      "Conectada ao seu Google Agenda, ela enxerga seus horários, prepara a confirmação e te lembra do que precisa ser remarcado."
  },
  payment: {
    titulo: "Pagamento que fica no ar",
    leitura:
      "Cobrança combinada no meio de uma conversa longa some. Quando alguém lembra, já passou o tempo de cobrar sem constrangimento.",
    oQueElaFaz:
      "Ela separa das conversas o que ficou combinado — valores, prazos e pendências — e te devolve isso organizado, no lugar de você reler tudo."
  },
  post_sale: {
    titulo: "Pós-venda que não sobrevive à correria",
    leitura:
      "O pós-venda é o que traz o cliente de volta, e é sempre a primeira coisa a cair quando o dia aperta.",
    oQueElaFaz:
      "Ela lembra de quem foi atendido e quando, e prepara o retorno para você aprovar — sem virar mensagem automática de robô."
  },
  reminders: {
    titulo: "Coisas demais na cabeça",
    leitura:
      "O custo não é o tempo que cada tarefa leva. É carregar todas elas na memória o dia inteiro.",
    oQueElaFaz:
      "Ela lê e-mail, agenda e as conversas, e te entrega de manhã o que importa: o que vence, quem espera resposta, o que ficou combinado."
  },
  curiosity: {
    titulo: "Entender antes de mexer",
    leitura:
      "Faz sentido. Ferramenta que entra na sua rotina sem você entender vira mais um lugar para olhar.",
    oQueElaFaz:
      "Ela vive no WhatsApp que você já usa. Não é um app novo para aprender — e nada sai sem você aprovar."
  },
  other: {
    titulo: "O que você descreveu",
    leitura:
      "Sua rotina não cabe nas caixinhas do questionário, e tudo bem — é justamente aí que vale conversar.",
    oQueElaFaz:
      "A Gênia lê e-mail, agenda e conversas de WhatsApp, organiza o que precisa de resposta e prepara rascunhos para você aprovar."
  }
};

const VOLUME = {
  "0-5": "Com o volume que você tem hoje, o problema raramente é quantidade — é o que escapa entre uma conversa e outra.",
  "6-15": "Nesse volume ainda dá para segurar tudo na cabeça. É exatamente por isso que o que escapa passa despercebido.",
  "16-40": "Nesse volume o dia já não fecha sem alguma coisa ficar para trás. O ponto deixa de ser esforço e vira método.",
  "40+": "Acima de 40 mensagens por dia, nenhuma organização pessoal segura — o que falta não é disciplina, é alguém."
};

/** Escapa para HTML. O texto livre vem do usuário e vai dentro do e-mail. */
export function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

function primeiroNome(raw) {
  const n = String(raw ?? "").trim().split(/\s+/)[0];
  return n ? n.charAt(0).toUpperCase() + n.slice(1) : "";
}

/**
 * O próximo passo muda por rota — e o `nurture` NÃO recebe convite para
 * conversar, de propósito: ele foi classificado como "ainda não é hora de
 * setup", e puxar para uma venda aqui contradiz o que a tela disse a ele.
 */
function proximoPasso(route, waUrl) {
  if (route === "qualified_trial") {
    return waUrl
      ? {
          texto: "Pelo seu diagnóstico, faz sentido conversar sobre um teste guiado.",
          botao: { url: waUrl, label: "Falar sobre meu teste" }
        }
      : {
          texto:
            "Pelo seu diagnóstico, faz sentido conversar sobre um teste guiado. Respondendo este e-mail a gente marca.",
          botao: null
        };
  }
  if (route === "hard_disqualified") {
    return {
      texto:
        "Pelo que você descreveu, a Gênia não é o caminho: ela trabalha com aprovação humana e não apoia disparos frios.",
      botao: null
    };
  }
  // nurture e waitlist_poor_fit
  return {
    texto:
      "Não vou te empurrar um setup agora — pelo seu diagnóstico ainda não é a hora. Se quiser conversar mesmo assim, é só responder este e-mail.",
    botao: null
  };
}

/**
 * Monta o diagnóstico. PURO — sem rede, sem banco. Testável.
 * Devolve { assunto, html, texto } ou null quando não há como personalizar.
 */
export function buildDiagnosticEmail({ contact, answers, route, waUrl = null }) {
  const dorKey = answers?.main_pain;
  const dor = DOR[dorKey] || DOR.other;
  const volume = VOLUME[answers?.message_volume] || "";
  const perfil = PERFIL[answers?.profession] || PERFIL.other;
  const nome = primeiroNome(contact?.name);
  const fluxo = String(answers?.workflow_this_week ?? "").trim();
  const passo = proximoPasso(route, waUrl);

  const ola = nome ? `${nome}, ` : "";

  // O texto livre é CITADO, não parafraseado. Devolver a pessoa as palavras
  // dela é o que prova que alguém leu — e parafrasear é onde a invenção entra.
  const blocoFluxo = fluxo
    ? `<p style="margin:0 0 6px;font-size:14px;color:#607174">Você escreveu que queria resolver isto esta semana:</p>
       <blockquote style="margin:0 0 22px;padding:12px 16px;border-left:3px solid #0daabf;background:#f4fbfc;font-size:16px;color:#11181c">
         ${escapeHtml(fluxo)}
       </blockquote>`
    : "";

  const botao = passo.botao
    ? `<p style="margin:26px 0 0">
         <a href="${escapeHtml(passo.botao.url)}" style="display:inline-block;background:#0daabf;color:#04202a;text-decoration:none;padding:14px 24px;border-radius:10px;font-weight:700">
           ${escapeHtml(passo.botao.label)}
         </a>
       </p>`
    : "";

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:32px 16px;background:#f6f7f8;font:16px/1.65 -apple-system,'Segoe UI',Roboto,sans-serif;color:#11181c">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;padding:32px">
    <p style="margin:0 0 10px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#0daabf">Seu diagnóstico</p>
    <h1 style="font-size:25px;line-height:1.25;margin:0 0 20px">${ola}o que está te custando mais tempo é ${escapeHtml(dor.titulo.toLowerCase())}.</h1>

    ${blocoFluxo}

    <p style="margin:0 0 16px">${dor.leitura}</p>
    ${volume ? `<p style="margin:0 0 16px">${volume}</p>` : ""}

    <h2 style="font-size:17px;margin:26px 0 10px">O que a Gênia faria no seu caso</h2>
    <p style="margin:0 0 16px">${dor.oQueElaFaz}</p>
    <p style="margin:0 0 16px;font-size:15px;color:#405052">
      No contexto de ${escapeHtml(perfil)}, ela vive no WhatsApp que você já usa —
      não é mais um app para abrir.
    </p>

    <div style="margin:24px 0;padding:14px 16px;background:#f4fbfc;border-radius:8px;font-size:14px;color:#405052">
      <strong>O limite, dito na frente:</strong> a Gênia não envia mensagem para
      ninguém sem você aprovar. Ela prepara, lembra e organiza — quem decide é você.
    </div>

    <p style="margin:0">${passo.texto}</p>
    ${botao}

    <hr style="border:0;border-top:1px solid #e6e8ea;margin:30px 0 18px">
    <p style="margin:0;font-size:13px;color:#6b7280">
      Você recebeu isto porque fez o diagnóstico em soulgenia.com.br.<br>
      Gênia — sua secretária de IA, no WhatsApp de sempre. Uma empresa Soul Genia.
    </p>
  </div>
</body></html>`;

  const texto = [
    `${ola}o que está te custando mais tempo é ${dor.titulo.toLowerCase()}.`,
    "",
    fluxo ? `Você escreveu: "${fluxo}"` : "",
    "",
    dor.leitura,
    volume,
    "",
    "O QUE A GÊNIA FARIA NO SEU CASO",
    dor.oQueElaFaz,
    "",
    "O limite, dito na frente: ela não envia mensagem para ninguém sem você aprovar.",
    "",
    passo.texto,
    passo.botao ? passo.botao.url : ""
  ]
    .filter((l) => l !== "")
    .join("\n");

  return {
    assunto: nome ? `${nome}, seu diagnóstico da Gênia` : "Seu diagnóstico da Gênia",
    html,
    texto
  };
}
