export type BlogCtaType = "soft" | "checklist" | "direct";

export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  afterParagraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  note?: string;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  updated?: string;
  readingMinutes: number;
  cluster: string;
  funnel: "awareness" | "interest" | "conversion";
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  ctaType: BlogCtaType;
  heroLabel: string;
  heroImage: string;
  heroAlt: string;
  takeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "SG-BLOG-001",
    title: "Como organizar o WhatsApp da empresa sem virar refem das mensagens",
    slug: "como-organizar-whatsapp-empresa",
    excerpt:
      "Um metodo simples para separar mensagens novas, pendencias, retornos e conversas resolvidas sem transformar o WhatsApp em um segundo emprego.",
    date: "2026-06-19",
    readingMinutes: 8,
    cluster: "WhatsApp para negocios",
    funnel: "awareness",
    primaryKeyword: "organizar WhatsApp empresa",
    secondaryKeywords: [
      "WhatsApp para negocios",
      "organizar atendimento WhatsApp",
      "mensagens de clientes WhatsApp",
    ],
    metaTitle: "Como organizar o WhatsApp da empresa sem virar refem das mensagens",
    metaDescription:
      "Aprenda um metodo simples para organizar conversas, pendencias e respostas no WhatsApp da empresa sem perder o controle do atendimento.",
    ctaType: "soft",
    heroLabel: "Rotina de atendimento",
    heroImage: "/images/blog/organizar-whatsapp-aurea-hero.png",
    heroAlt:
      "Auria em estudio futurista branco com paineis translucidos de mensagens e agenda representando organizacao do atendimento",
    takeaways: [
      "O problema nao e receber mensagens demais; e nao ter criterio para decidir o que vem primeiro.",
      "Um bom atendimento pelo WhatsApp precisa separar entrada, pendencia, retorno e conversa resolvida.",
      "A organizacao manual funciona melhor quando existe uma revisao curta de manha, meio do dia e fim do dia.",
    ],
    sections: [
      {
        heading: "O WhatsApp virou a mesa de trabalho inteira",
        paragraphs: [
          "Para muitos negocios pequenos, o WhatsApp deixou de ser apenas um canal de conversa. Ele virou recepcao, agenda, pos-venda, suporte, comercial, cobranca e bloco de notas. O problema e que ele continua parecendo uma lista unica de mensagens, misturando tudo no mesmo lugar.",
          "Quando isso acontece, a pessoa que atende fica sempre reagindo. Responde quem apareceu por ultimo, esquece quem pediu orcamento ontem e perde tempo procurando combinados antigos. A sensacao e de estar trabalhando o dia inteiro e, mesmo assim, terminar com pontas soltas.",
          "Organizar o WhatsApp da empresa nao significa transformar sua rotina em um sistema complexo. Significa criar um jeito simples de enxergar o que chegou, o que precisa de acao e o que ja foi resolvido.",
        ],
      },
      {
        heading: "Separe as conversas por estado, nao por pressa",
        paragraphs: [
          "A primeira mudanca e parar de olhar para o WhatsApp como uma fila de mensagens em ordem cronologica. Ordem de chegada nem sempre e ordem de importancia. Um cliente antigo com uma pendencia real pode ser mais importante do que uma mensagem nova sem urgencia.",
          "Use quatro estados basicos para pensar nas conversas. Eles funcionam mesmo sem ferramenta nova, apenas com etiquetas, fixados, anotacoes ou uma planilha simples.",
        ],
        bullets: [
          "Novo contato: alguem chegou e ainda nao recebeu uma primeira resposta adequada.",
          "Pendente com voce: a conversa depende de uma resposta, proposta, confirmacao ou decisao sua.",
          "Aguardando cliente: voce ja respondeu e agora precisa lembrar de acompanhar depois.",
          "Resolvido: nada precisa ser feito agora, mas o historico deve ficar facil de encontrar.",
        ],
        note:
          "Se voce conseguir olhar para cada conversa e atribuir um desses quatro estados, metade da bagunca ja diminui.",
      },
      {
        heading: "Crie uma rotina curta de revisao",
        paragraphs: [
          "O erro mais comum e tentar organizar o WhatsApp o tempo todo. Isso vira interrupcao permanente. Uma rotina melhor e revisar em blocos curtos, com objetivos diferentes em cada momento do dia.",
          "Essa revisao nao precisa ser perfeita. Quinze minutos bem feitos costumam valer mais do que ficar abrindo o aplicativo a cada notificacao. A meta e terminar o dia sabendo quem esta esperando voce e qual e o proximo passo de cada conversa importante.",
        ],
        numbered: [
          "De manha, veja novos contatos e pendencias que ficaram abertas do dia anterior.",
          "No meio do dia, responda o que pode esfriar se esperar ate o fim do expediente.",
          "No fim do dia, registre retornos, promessas feitas e conversas que precisam de follow-up.",
        ],
      },
      {
        heading: "Use etiquetas com nomes de acao",
        paragraphs: [
          "Etiquetas vagas ajudam pouco. Uma etiqueta chamada importante pode virar um deposito de tudo. Prefira nomes que indiquem a acao esperada.",
        ],
        bullets: [
          "Responder hoje",
          "Enviar orcamento",
          "Confirmar agenda",
          "Follow-up amanha",
          "Aguardando pagamento",
          "Cliente ativo",
        ],
        afterParagraphs: [
          "O nome da etiqueta deve responder a pergunta: o que precisa acontecer agora? Isso reduz a chance de voce abrir uma conversa, ler tudo de novo e ainda sair sem decidir nada.",
        ],
      },
      {
        heading: "Anote o proximo passo dentro da conversa",
        paragraphs: [
          "O atendimento se perde quando o contexto fica apenas na sua cabeca. Se o cliente pediu retorno na quinta, se ficou de mandar documento ou se voce prometeu enviar uma proposta, isso precisa aparecer em algum lugar facil de revisar.",
          "Uma anotacao curta ja resolve: retorno quinta, enviar proposta do plano basico, confirmar horario, perguntar se ainda faz sentido. O objetivo nao e escrever um relatorio; e impedir que voce dependa da memoria.",
        ],
      },
      {
        heading: "O limite do metodo manual",
        paragraphs: [
          "Tudo isso funciona bem ate certo volume. Quando chegam muitas conversas por dia, a revisao manual comeca a falhar. Voce ate sabe o que deveria fazer, mas nao consegue manter a disciplina porque a rotina real atropela o metodo.",
          "Esse e o ponto em que uma secretaria inteligente pode ajudar: nao para tirar voce do controle, mas para preparar a triagem, lembrar retornos e organizar rascunhos para sua aprovacao. A parte mais valiosa nao e responder mais rapido a qualquer custo. E reduzir o risco de uma conversa importante sumir no meio do ruido.",
        ],
      },
      {
        heading: "Checklist rapido para hoje",
        bullets: [
          "Escolha quatro estados para suas conversas: novo, pendente, aguardando cliente e resolvido.",
          "Revise o WhatsApp em tres blocos: manha, meio do dia e fim do dia.",
          "Troque etiquetas vagas por etiquetas de acao.",
          "Anote o proximo passo nas conversas importantes.",
          "Separe os contatos que precisam de follow-up antes de encerrar o dia.",
        ],
      },
    ],
    faqs: [
      {
        question: "Preciso de WhatsApp Business para organizar melhor?",
        answer:
          "Ele ajuda porque oferece etiquetas e recursos comerciais, mas o metodo principal e separar estados e proximas acoes. Mesmo uma planilha simples pode funcionar no comeco.",
      },
      {
        question: "Quantas etiquetas devo usar?",
        answer:
          "Comece com poucas. De cinco a oito etiquetas de acao costumam ser suficientes para pequenos negocios. Etiqueta demais vira outra bagunca.",
      },
      {
        question: "Auria organiza tudo sozinha?",
        answer:
          "Auria ajuda a organizar mensagens, pendencias e rascunhos com aprovacao humana. A proposta nao e tirar voce do controle, e diminuir o ruido operacional.",
      },
    ],
  },
  {
    id: "SG-BLOG-002",
    title: "Por que clientes somem quando voce demora para responder no WhatsApp",
    slug: "clientes-somem-demora-responder-whatsapp",
    excerpt:
      "Entenda por que o atraso no WhatsApp muda a percepcao do cliente e como responder com contexto sem viver preso ao celular.",
    date: "2026-06-23",
    readingMinutes: 7,
    cluster: "Atendimento ao cliente",
    funnel: "awareness",
    primaryKeyword: "cliente demora responder WhatsApp",
    secondaryKeywords: ["cliente sumiu WhatsApp", "responder cliente rapido", "lead sem resposta"],
    metaTitle: "Por que clientes somem quando voce demora para responder no WhatsApp",
    metaDescription:
      "Entenda por que leads somem no WhatsApp, como o atraso afeta a conversa e o que fazer para responder melhor sem viver online.",
    ctaType: "soft",
    heroLabel: "Resposta e percepcao",
    heroImage: "/images/blog/clientes-somem-demora-aurea-hero.png",
    heroAlt:
      "Auria em ambiente escuro futurista com fluxos de luz e paineis de mensagens representando respostas no momento certo",
    takeaways: [
      "O cliente geralmente some quando perde contexto, confianca ou urgencia.",
      "Responder rapido ajuda, mas responder com o proximo passo certo ajuda mais.",
      "Uma rotina de prioridade reduz atrasos sem exigir que voce fique online o tempo todo.",
    ],
    sections: [
      {
        heading: "O cliente nao some do nada",
        paragraphs: [
          "Quando um cliente chama no WhatsApp, ele esta em movimento. Pode estar comparando opcoes, tentando resolver uma urgencia ou apenas testando se alguem do outro lado esta disponivel. Se a resposta demora, a conversa perde energia.",
          "Isso nao significa que todo atraso destrua uma venda. Significa que o atraso cria espaco para duvida. O cliente pode pensar que voce nao viu, que nao da conta, que o atendimento sera lento depois da compra ou que outra pessoa vai resolver mais facil.",
          "Na pratica, o sumico do cliente raramente e um evento unico. Ele e resultado de pequenas quebras de contexto: a primeira resposta atrasou, o orcamento veio seco, o follow-up nao aconteceu e a conversa ficou sem proximo passo.",
        ],
      },
      {
        heading: "Tempo de resposta e sinal de cuidado",
        paragraphs: [
          "No WhatsApp, a pessoa nao separa totalmente atendimento e percepcao de qualidade. Se voce demora muito para responder uma pergunta simples, ela pode imaginar que o resto do servico tambem sera desorganizado.",
          "O ponto nao e prometer resposta imediata o dia inteiro. Isso seria irreal para quem tambem executa o trabalho. O ponto e ter um jeito de identificar mensagens que nao podem ficar esquecidas e responder com clareza quando chegar a hora.",
        ],
      },
      {
        heading: "O concorrente esta a uma conversa de distancia",
        paragraphs: [
          "Muitos clientes nao avisam que estao comparando. Eles perguntam preco, disponibilidade ou como funciona e, se a conversa nao anda, chamam outro profissional. Nao e sempre falta de interesse. As vezes e apenas conveniencia.",
          "Por isso, a primeira resposta precisa fazer duas coisas: reconhecer o pedido e abrir o proximo passo. Uma resposta como vou ver e te falo depois pode ser honesta, mas deixa a conversa suspensa. Melhor e indicar quando volta e o que voce precisa para ajudar.",
        ],
        bullets: [
          "Recebi sua mensagem e vou te responder com calma ate 15h.",
          "Para te passar o caminho certo, me diz rapidinho: e para hoje ou para esta semana?",
          "Consigo te orientar. Antes, preciso entender uma coisa: voce ja tem data definida?",
        ],
      },
      {
        heading: "Responder com contexto e melhor que responder correndo",
        paragraphs: [
          "Rapidez sem contexto tambem atrapalha. Se voce responde qualquer coisa so para nao deixar o cliente esperando, pode gerar retrabalho, confusao ou uma promessa que nao deveria ter feito.",
          "Uma boa resposta pelo WhatsApp tem tres partes: mostra que voce entendeu, responde o que da para responder agora e indica o proximo passo. Isso funciona tanto para lead novo quanto para cliente ativo.",
        ],
        numbered: [
          "Entendimento: 'Entendi, voce quer saber disponibilidade para sexta.'",
          "Resposta: 'Tenho dois horarios possiveis no fim da tarde.'",
          "Proximo passo: 'Quer que eu te mande as opcoes e valores?'",
        ],
      },
      {
        heading: "Quais mensagens merecem prioridade",
        paragraphs: [
          "Nem toda mensagem atrasada tem o mesmo impacto. Para reduzir sumicos, priorize conversas que carregam oportunidade, risco ou compromisso.",
        ],
        bullets: [
          "Lead novo perguntando preco, agenda ou disponibilidade.",
          "Cliente que ja recebeu proposta e ainda nao respondeu.",
          "Pessoa que mandou documento, comprovante ou confirmacao.",
          "Mensagem com reclamacao, urgencia ou expectativa quebrada.",
          "Follow-up que voce prometeu fazer em data especifica.",
        ],
      },
      {
        heading: "Como manter a conversa viva sem pressionar",
        paragraphs: [
          "Depois da primeira resposta, a conversa precisa de memoria. Se voce mandou proposta e o cliente nao respondeu, nao precisa cobrar de forma dura. Pode retomar com contexto e uma saida facil.",
        ],
        bullets: [
          "Oi, passando para confirmar se voce conseguiu ver as opcoes que te mandei.",
          "Se ainda fizer sentido, posso te ajudar a escolher o melhor caminho.",
          "Se preferir deixar para outro momento, sem problema. So me avisa para eu me organizar por aqui.",
        ],
        note:
          "Follow-up bom nao empurra. Ele reduz o esforco do cliente para retomar a decisao.",
      },
      {
        heading: "Quando a rotina manual nao da conta",
        paragraphs: [
          "Se voce recebe muitas mensagens por dia, o problema deixa de ser vontade e passa a ser capacidade. Voce sabe que deveria responder e acompanhar, mas nao consegue lembrar de tudo enquanto trabalha.",
          "Nesse cenario, uma secretaria inteligente pode ajudar a separar contatos, lembrar retornos e preparar rascunhos. A decisao continua sua, mas a chance de uma conversa importante desaparecer no meio da lista diminui.",
        ],
      },
    ],
    faqs: [
      {
        question: "Preciso responder todo cliente imediatamente?",
        answer:
          "Nao. O mais importante e nao deixar conversas importantes sem proximo passo. Uma resposta honesta com prazo claro ja reduz ansiedade.",
      },
      {
        question: "Follow-up espanta cliente?",
        answer:
          "Follow-up sem contexto pode incomodar. Follow-up educado, com referencia ao pedido original e saida facil, costuma ser percebido como cuidado.",
      },
      {
        question: "Como a Auria entra nessa rotina?",
        answer:
          "Auria ajuda a organizar mensagens, identificar pendencias e preparar rascunhos com aprovacao humana, para que voce nao dependa apenas da memoria.",
      },
    ],
  },
  {
    id: "SG-BLOG-003",
    title: "Como priorizar mensagens importantes no WhatsApp todos os dias",
    slug: "como-priorizar-mensagens-whatsapp",
    excerpt:
      "Um metodo de triagem diaria para decidir o que responder primeiro, o que acompanhar depois e o que pode esperar.",
    date: "2026-06-26",
    readingMinutes: 8,
    cluster: "Produtividade",
    funnel: "awareness",
    primaryKeyword: "priorizar mensagens WhatsApp",
    secondaryKeywords: ["organizar mensagens WhatsApp", "produtividade WhatsApp", "gestao de mensagens"],
    metaTitle: "Como priorizar mensagens importantes no WhatsApp todos os dias",
    metaDescription:
      "Veja um metodo pratico para separar mensagens urgentes, importantes e pendentes no WhatsApp sem se perder durante o dia.",
    ctaType: "checklist",
    heroLabel: "Triagem diaria",
    heroImage: "/images/blog/priorizar-mensagens-aurea-hero.png",
    heroAlt:
      "Auria em ambiente preto e dourado com geometria luminosa e paineis de prioridade representando triagem de mensagens",
    takeaways: [
      "Prioridade nao e responder quem gritou mais alto; e proteger oportunidade, compromisso e risco.",
      "Classifique mensagens por tipo de acao: responder, decidir, acompanhar ou arquivar.",
      "Uma revisao de fim de dia evita que follow-ups e promessas desaparecam.",
    ],
    sections: [
      {
        heading: "Nem toda mensagem merece a mesma energia",
        paragraphs: [
          "O WhatsApp mistura tudo: lead novo, cliente antigo, grupo, fornecedor, audio longo, pergunta simples e problema urgente. Se voce trata todas as mensagens como iguais, acaba respondendo pela ordem da ansiedade, nao pela ordem do impacto.",
          "Priorizar mensagens e decidir conscientemente onde sua atencao gera mais valor. Isso nao significa ignorar pessoas. Significa ter criterio para nao deixar uma oportunidade importante perder espaco para uma conversa que poderia esperar.",
        ],
      },
      {
        heading: "Use quatro grupos de prioridade",
        paragraphs: [
          "Uma triagem diaria simples pode separar as mensagens em quatro grupos. O nome dos grupos importa menos que a disciplina de revisar com o mesmo criterio todos os dias.",
        ],
        bullets: [
          "Agora: precisa de resposta ou decisao hoje para nao travar venda, agenda ou cliente.",
          "Hoje: importante, mas pode entrar em um bloco de atendimento.",
          "Acompanhar: voce ja respondeu e precisa lembrar de voltar depois.",
          "Sem acao: conversa resolvida, informativa ou que nao exige resposta.",
        ],
        note:
          "Se tudo parece 'agora', o criterio esta amplo demais. Prioridade serve para escolher.",
      },
      {
        heading: "Como identificar cliente quente",
        paragraphs: [
          "Cliente quente nao e apenas quem manda muitas mensagens. E quem demonstra intencao, prazo ou proximo passo concreto.",
        ],
        bullets: [
          "Perguntou disponibilidade para uma data especifica.",
          "Pediu preco depois de explicar o problema.",
          "Mandou documento, endereco, foto, comprovante ou detalhes para executar.",
          "Perguntou como contratar, reservar ou agendar.",
          "Respondeu um follow-up antigo com interesse renovado.",
        ],
      },
      {
        heading: "Como identificar pendencia operacional",
        paragraphs: [
          "Nem toda prioridade e venda. Algumas mensagens importam porque travam a operacao. Um cliente esperando confirmacao, um horario sem resposta ou um combinado mal registrado pode virar problema depois.",
        ],
        bullets: [
          "Voce prometeu enviar algo e ainda nao enviou.",
          "A pessoa depende da sua confirmacao para se organizar.",
          "Existe data, valor, endereco ou horario envolvido.",
          "A conversa tem reclamacao, duvida sensivel ou expectativa quebrada.",
        ],
      },
      {
        heading: "Crie uma frase de proximo passo",
        paragraphs: [
          "Depois de classificar a mensagem, escreva mentalmente ou em anotacao curta qual e o proximo passo. Se voce nao consegue nomear a acao, provavelmente ainda nao entendeu a prioridade.",
        ],
        bullets: [
          "Enviar proposta ate 16h.",
          "Confirmar horario de quinta.",
          "Perguntar se ainda tem interesse.",
          "Aguardar cliente mandar documento.",
          "Retomar em dois dias se nao responder.",
        ],
      },
      {
        heading: "Ritual de 15 minutos no fim do dia",
        paragraphs: [
          "O fim do dia e o melhor momento para impedir que o dia seguinte comece baguncado. Abra as conversas importantes e procure promessas feitas, propostas enviadas e pessoas que ficaram sem retorno.",
        ],
        numbered: [
          "Veja conversas etiquetadas como responder hoje.",
          "Mova o que foi resolvido para sem acao.",
          "Crie lembretes para follow-ups.",
          "Escreva rascunhos simples para as respostas que ficaram pendentes.",
          "Escolha as tres primeiras conversas do dia seguinte.",
        ],
      },
      {
        heading: "Onde uma secretaria inteligente ajuda",
        paragraphs: [
          "A triagem manual exige atencao constante. Uma secretaria inteligente como a Auria pode ajudar a preparar um resumo, destacar pendencias e sugerir rascunhos para aprovacao. O valor esta em voce abrir o WhatsApp com mais clareza, nao com mais uma lista confusa.",
        ],
      },
    ],
    faqs: [
      {
        question: "Como saber se uma mensagem e urgente ou apenas barulhenta?",
        answer:
          "Procure prazo, compromisso, dinheiro, cliente ativo ou risco de friccao. Se nao existe nenhum desses elementos, talvez ela possa esperar um bloco de resposta.",
      },
      {
        question: "Devo responder grupos antes de clientes?",
        answer:
          "Em geral, clientes e pendencias comerciais entram antes. Grupos costumam ser revisados em blocos, salvo quando carregam uma demanda direta importante.",
      },
      {
        question: "Auria decide a prioridade por mim?",
        answer:
          "Auria pode ajudar a organizar e sugerir prioridades, mas o uso recomendado mantem voce no controle das decisoes e aprovacoes.",
      },
    ],
  },
  {
    id: "SG-BLOG-004",
    title: "O que responder quando o cliente pede preco e some",
    slug: "cliente-pede-preco-e-some",
    excerpt:
      "Scripts e um fluxo simples para retomar conversas de orcamento sem parecer insistente nem transformar follow-up em cobranca.",
    date: "2026-06-30",
    readingMinutes: 9,
    cluster: "Vendas pelo WhatsApp",
    funnel: "interest",
    primaryKeyword: "cliente pede preco e some",
    secondaryKeywords: ["follow-up cliente sumiu", "responder pedido de preco", "orcamento pelo WhatsApp"],
    metaTitle: "O que responder quando o cliente pede preco e some",
    metaDescription:
      "Veja respostas praticas para retomar conversas quando o cliente pede preco, desaparece e voce nao quer parecer insistente.",
    ctaType: "checklist",
    heroLabel: "Follow-up com contexto",
    heroImage: "/images/blog/follow-up-preco-aurea-hero.png",
    heroAlt:
      "Auria em estudio branco futurista com telefone e paineis flutuantes representando follow-up de propostas",
    takeaways: [
      "Quando o cliente pede preco e some, o problema pode ser falta de contexto, comparacao ou medo de decidir.",
      "A melhor retomada relembra o pedido, facilita a resposta e oferece uma saida simples.",
      "Follow-up precisa de rotina. Se depender da memoria, a conversa esfria.",
    ],
    sections: [
      {
        heading: "Pedir preco nao significa estar pronto para comprar",
        paragraphs: [
          "Muita gente pede preco cedo demais. As vezes o cliente ainda esta entendendo o problema, comparando alternativas ou tentando descobrir se aquilo cabe no bolso. Se voce responde apenas com um valor, a conversa pode morrer porque faltou contexto para a pessoa decidir.",
          "Isso nao quer dizer que voce deva esconder preco. Quer dizer que o preco precisa vir acompanhado de orientacao, proximo passo e abertura para duvida. O objetivo e transformar uma pergunta fria em uma conversa util.",
        ],
      },
      {
        heading: "Por que o cliente some depois do preco",
        paragraphs: [
          "Existem alguns motivos comuns. Entender o motivo provavel ajuda a escolher a mensagem certa para retomar sem pressionar.",
        ],
        bullets: [
          "Ele estava apenas pesquisando e ainda nao tinha urgencia.",
          "O valor chegou sem explicacao suficiente.",
          "Ele comparou com outra opcao mais barata.",
          "Ele gostou, mas deixou para decidir depois.",
          "Ele ficou com uma duvida e nao quis perguntar.",
          "Ele simplesmente esqueceu no meio da rotina.",
        ],
      },
      {
        heading: "O erro de mandar so 'alguma novidade?'",
        paragraphs: [
          "A mensagem 'alguma novidade?' e facil, mas coloca todo o esforco no cliente. Ele precisa lembrar quem voce e, qual era o assunto e o que responder. Quanto mais trabalho mental, menor a chance de retorno.",
          "Um follow-up melhor recupera contexto e oferece uma resposta facil. Em vez de cobrar uma decisao, ajude a pessoa a retomar o fio.",
        ],
      },
      {
        heading: "Modelo 1: retomada leve",
        paragraphs: [
          "Use quando a pessoa pediu preco, recebeu informacao e nao respondeu. O tom e simples e sem pressao.",
        ],
        bullets: [
          "Oi, passando para confirmar se voce conseguiu ver as opcoes que te mandei.",
          "Se ainda fizer sentido, posso te ajudar a escolher o melhor caminho.",
          "Se preferir deixar para outro momento, sem problema. So me avisa para eu me organizar por aqui.",
        ],
      },
      {
        heading: "Modelo 2: retomada com contexto",
        paragraphs: [
          "Use quando voce sabe qual era a necessidade do cliente. Essa versao mostra cuidado e evita parecer mensagem copiada.",
        ],
        bullets: [
          "Oi, lembrei do que voce comentou sobre precisar resolver isso ainda este mes.",
          "Pelo que voce me contou, eu seguiria pelo pacote/horario/opcao que te mandei primeiro.",
          "Quer que eu te explique rapidamente a diferenca entre as opcoes?",
        ],
      },
      {
        heading: "Modelo 3: retomada para quem achou caro",
        paragraphs: [
          "Quando o silencio parece vir de preco, nao tente convencer no grito. Reabra a conversa pelo ajuste de escopo.",
        ],
        bullets: [
          "Oi, fiquei pensando aqui: se o valor ficou acima do que voce queria investir agora, posso te mostrar uma opcao mais simples.",
          "Talvez nao seja o pacote completo, mas ja resolve a parte principal.",
          "Quer que eu adapte a proposta para um primeiro passo menor?",
        ],
      },
      {
        heading: "Modelo 4: encerramento elegante",
        paragraphs: [
          "Nem toda conversa deve ficar aberta para sempre. Um encerramento educado ajuda voce a organizar a rotina e ainda deixa a porta aberta.",
        ],
        bullets: [
          "Oi, vou encerrar essa pendencia por aqui para nao ficar te incomodando.",
          "Se voltar a fazer sentido, pode me chamar que eu retomo do ponto em que paramos.",
          "Obrigado por ter considerado.",
        ],
      },
      {
        heading: "Quando fazer follow-up",
        paragraphs: [
          "Nao existe um intervalo unico para todos os negocios, mas existe uma regra pratica: quanto mais concreta era a intencao, mais rapido deve ser o retorno. Um cliente que pediu agenda para esta semana nao deve esperar quatro dias. Uma pesquisa sem prazo pode receber follow-up mais leve depois.",
        ],
        numbered: [
          "Primeiro retorno: 24 a 48 horas depois da proposta, se havia interesse real.",
          "Segundo retorno: alguns dias depois, com contexto ou ajuste de opcao.",
          "Encerramento: quando ja houve tentativa suficiente e nenhuma resposta.",
        ],
      },
      {
        heading: "Registre o status da conversa",
        paragraphs: [
          "O maior inimigo do follow-up e a memoria. Se voce nao registra que mandou preco, quando mandou e qual era o proximo passo, a conversa desaparece. Use etiqueta, anotacao ou uma rotina diaria.",
          "Auria pode ajudar nesse ponto preparando lembretes e rascunhos para aprovacao. Assim, a conversa nao depende apenas de voce lembrar no meio de um dia cheio.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quantas vezes posso fazer follow-up?",
        answer:
          "Depende do contexto, mas duas retomadas e um encerramento educado costumam ser suficientes para muitos negocios de servico. O importante e nao insistir sem agregar contexto.",
      },
      {
        question: "Devo dar desconto quando o cliente some?",
        answer:
          "Nao como reflexo automatico. Primeiro tente entender se faltou clareza, urgencia ou encaixe. Desconto sem diagnostico treina a conversa para preco.",
      },
      {
        question: "Auria manda follow-up automaticamente?",
        answer:
          "Auria ajuda a lembrar e preparar rascunhos de follow-up com aprovacao humana, especialmente no teste atual.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost) {
  return blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => {
      const clusterScore =
        Number(b.cluster === post.cluster) - Number(a.cluster === post.cluster);
      if (clusterScore !== 0) return clusterScore;
      return a.date.localeCompare(b.date);
    })
    .slice(0, 3);
}

export function getCtaCopy(type: BlogCtaType) {
  if (type === "direct") {
    return {
      label: "Testar a Soul Genia",
      text: "Teste a Soul Genia em uma rotina real do seu WhatsApp. Comece pequeno, com aprovacao humana, e veja se ela ajuda a diminuir o ruido do dia.",
    };
  }

  if (type === "checklist") {
    return {
      label: "Organizar meu WhatsApp",
      text: "Quer testar isso em uma rotina real do seu WhatsApp? A Soul Genia pode ajudar voce a comecar por um fluxo simples, com teste assistido e aprovacao humana.",
    };
  }

  return {
    label: "Conhecer a Soul Genia",
    text: "Se voce quer organizar melhor o WhatsApp sem perder o controle das respostas, conheca a Soul Genia, uma secretaria pessoal que ajuda a cuidar das mensagens com aprovacao humana.",
  };
}
