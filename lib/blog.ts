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
    title: "Como organizar o WhatsApp da empresa sem virar refém das mensagens",
    slug: "como-organizar-whatsapp-empresa",
    excerpt:
      "Um método simples para separar mensagens novas, pendências, retornos e conversas resolvidas sem transformar o WhatsApp em um segundo emprego.",
    date: "2026-06-19",
    readingMinutes: 8,
    cluster: "WhatsApp para negócios",
    funnel: "awareness",
    primaryKeyword: "organizar WhatsApp empresa",
    secondaryKeywords: [
      "WhatsApp para negócios",
      "organizar atendimento WhatsApp",
      "mensagens de clientes WhatsApp",
    ],
    metaTitle: "Como organizar o WhatsApp da empresa sem virar refém das mensagens",
    metaDescription:
      "Aprenda um método simples para organizar conversas, pendências e respostas no WhatsApp da empresa sem perder o controle do atendimento.",
    ctaType: "soft",
    heroLabel: "Rotina de atendimento",
    heroImage: "/images/blog/organizar-whatsapp-aurea-hero.png",
    heroAlt:
      "Áurea em estúdio futurista branco com painéis translúcidos de mensagens e agenda representando organização do atendimento",
    takeaways: [
      "O problema não é receber mensagens demais; é não ter critério para decidir o que vem primeiro.",
      "Um bom atendimento pelo WhatsApp precisa separar entrada, pendência, retorno e conversa resolvida.",
      "A organização manual funciona melhor quando existe uma revisão curta de manhã, meio do dia e fim do dia.",
    ],
    sections: [
      {
        heading: "O WhatsApp virou a mesa de trabalho inteira",
        paragraphs: [
          "Para muitos negócios pequenos, o WhatsApp deixou de ser apenas um canal de conversa. Ele virou recepção, agenda, pós-venda, suporte, comercial, cobrança e bloco de notas. O problema é que ele continua parecendo uma lista única de mensagens, misturando tudo no mesmo lugar.",
          "Quando isso acontece, a pessoa que atende fica sempre reagindo. Responde quem apareceu por último, esquece quem pediu orçamento ontem e perde tempo procurando combinados antigos. A sensação é de estar trabalhando o dia inteiro e, mesmo assim, terminar com pontas soltas.",
          "Organizar o WhatsApp da empresa não significa transformar sua rotina em um sistema complexo. Significa criar um jeito simples de enxergar o que chegou, o que precisa de ação e o que já foi resolvido.",
        ],
      },
      {
        heading: "Separe as conversas por estado, não por pressa",
        paragraphs: [
          "A primeira mudança é parar de olhar para o WhatsApp como uma fila de mensagens em ordem cronológica. Ordem de chegada nem sempre é ordem de importância. Um cliente antigo com uma pendência real pode ser mais importante do que uma mensagem nova sem urgência.",
          "Use quatro estados básicos para pensar nas conversas. Eles funcionam mesmo sem ferramenta nova, apenas com etiquetas, fixados, anotações ou uma planilha simples.",
        ],
        bullets: [
          "Novo contato: alguém chegou e ainda não recebeu uma primeira resposta adequada.",
          "Pendente com você: a conversa depende de uma resposta, proposta, confirmação ou decisão sua.",
          "Aguardando cliente: você já respondeu e agora precisa lembrar de acompanhar depois.",
          "Resolvido: nada precisa ser feito agora, mas o histórico deve ficar fácil de encontrar.",
        ],
        note:
          "Se você conseguir olhar para cada conversa e atribuir um desses quatro estados, metade da bagunça já diminui.",
      },
      {
        heading: "Crie uma rotina curta de revisão",
        paragraphs: [
          "O erro mais comum é tentar organizar o WhatsApp o tempo todo. Isso vira interrupção permanente. Uma rotina melhor é revisar em blocos curtos, com objetivos diferentes em cada momento do dia.",
          "Essa revisão não precisa ser perfeita. Quinze minutos bem feitos costumam valer mais do que ficar abrindo o aplicativo a cada notificação. A meta é terminar o dia sabendo quem está esperando você e qual é o próximo passo de cada conversa importante.",
        ],
        numbered: [
          "De manhã, veja novos contatos e pendências que ficaram abertas do dia anterior.",
          "No meio do dia, responda o que pode esfriar se esperar até o fim do expediente.",
          "No fim do dia, registre retornos, promessas feitas e conversas que precisam de follow-up.",
        ],
      },
      {
        heading: "Use etiquetas com nomes de ação",
        paragraphs: [
          "Etiquetas vagas ajudam pouco. Uma etiqueta chamada importante pode virar um depósito de tudo. Prefira nomes que indiquem a ação esperada.",
        ],
        bullets: [
          "Responder hoje",
          "Enviar orçamento",
          "Confirmar agenda",
          "Follow-up amanhã",
          "Aguardando pagamento",
          "Cliente ativo",
        ],
        afterParagraphs: [
          "O nome da etiqueta deve responder a pergunta: o que precisa acontecer agora? Isso reduz a chance de você abrir uma conversa, ler tudo de novo e ainda sair sem decidir nada.",
        ],
      },
      {
        heading: "Anote o próximo passo dentro da conversa",
        paragraphs: [
          "O atendimento se perde quando o contexto fica apenas na sua cabeça. Se o cliente pediu retorno na quinta, se ficou de mandar documento ou se você prometeu enviar uma proposta, isso precisa aparecer em algum lugar fácil de revisar.",
          "Uma anotação curta já resolve: retorno quinta, enviar proposta do plano básico, confirmar horário, perguntar se ainda faz sentido. O objetivo não é escrever um relatório; é impedir que você dependa da memória.",
        ],
      },
      {
        heading: "O limite do método manual",
        paragraphs: [
          "Tudo isso funciona bem até certo volume. Quando chegam muitas conversas por dia, a revisão manual começa a falhar. Você até sabe o que deveria fazer, mas não consegue manter a disciplina porque a rotina real atropela o método.",
          "Esse é o ponto em que uma secretária inteligente pode ajudar: não para tirar você do controle, mas para preparar a triagem, lembrar retornos e organizar rascunhos para sua aprovação. A parte mais valiosa não é responder mais rápido a qualquer custo. É reduzir o risco de uma conversa importante sumir no meio do ruído.",
        ],
      },
      {
        heading: "Checklist rápido para hoje",
        bullets: [
          "Escolha quatro estados para suas conversas: novo, pendente, aguardando cliente e resolvido.",
          "Revise o WhatsApp em três blocos: manhã, meio do dia e fim do dia.",
          "Troque etiquetas vagas por etiquetas de ação.",
          "Anote o próximo passo nas conversas importantes.",
          "Separe os contatos que precisam de follow-up antes de encerrar o dia.",
        ],
      },
    ],
    faqs: [
      {
        question: "Preciso de WhatsApp Business para organizar melhor?",
        answer:
          "Ele ajuda porque oferece etiquetas e recursos comerciais, mas o método principal é separar estados e próximas ações. Mesmo uma planilha simples pode funcionar no começo.",
      },
      {
        question: "Quantas etiquetas devo usar?",
        answer:
          "Comece com poucas. De cinco a oito etiquetas de ação costumam ser suficientes para pequenos negócios. Etiqueta demais vira outra bagunça.",
      },
      {
        question: "Áurea organiza tudo sozinha?",
        answer:
          "Áurea ajuda a organizar mensagens, pendências e rascunhos com aprovação humana. A proposta não é tirar você do controle, e diminuir o ruído operacional.",
      },
    ],
  },
  {
    id: "SG-BLOG-002",
    title: "Por que clientes somem quando você demora para responder no WhatsApp",
    slug: "clientes-somem-demora-responder-whatsapp",
    excerpt:
      "Entenda por que o atraso no WhatsApp muda a percepção do cliente e como responder com contexto sem viver preso ao celular.",
    date: "2026-06-23",
    readingMinutes: 7,
    cluster: "Atendimento ao cliente",
    funnel: "awareness",
    primaryKeyword: "cliente demora responder WhatsApp",
    secondaryKeywords: ["cliente sumiu WhatsApp", "responder cliente rápido", "lead sem resposta"],
    metaTitle: "Por que clientes somem quando você demora para responder no WhatsApp",
    metaDescription:
      "Entenda por que leads somem no WhatsApp, como o atraso afeta a conversa e o que fazer para responder melhor sem viver online.",
    ctaType: "soft",
    heroLabel: "Resposta e percepção",
    heroImage: "/images/blog/clientes-somem-demora-aurea-hero.png",
    heroAlt:
      "Áurea em ambiente escuro futurista com fluxos de luz e painéis de mensagens representando respostas no momento certo",
    takeaways: [
      "O cliente geralmente some quando perde contexto, confiança ou urgência.",
      "Responder rápido ajuda, mas responder com o próximo passo certo ajuda mais.",
      "Uma rotina de prioridade reduz atrasos sem exigir que você fique online o tempo todo.",
    ],
    sections: [
      {
        heading: "O cliente não some do nada",
        paragraphs: [
          "Quando um cliente chama no WhatsApp, ele está em movimento. Pode estar comparando opções, tentando resolver uma urgência ou apenas testando se alguém do outro lado está disponível. Se a resposta demora, a conversa perde energia.",
          "Isso não significa que todo atraso destrua uma venda. Significa que o atraso cria espaço para dúvida. O cliente pode pensar que você não viu, que não dá conta, que o atendimento será lento depois da compra ou que outra pessoa vai resolver mais fácil.",
          "Na prática, o sumiço do cliente raramente é um evento único. Ele é resultado de pequenas quebras de contexto: a primeira resposta atrasou, o orçamento veio seco, o follow-up não aconteceu e a conversa ficou sem próximo passo.",
        ],
      },
      {
        heading: "Tempo de resposta é sinal de cuidado",
        paragraphs: [
          "No WhatsApp, a pessoa não separa totalmente atendimento e percepção de qualidade. Se você demora muito para responder uma pergunta simples, ela pode imaginar que o resto do serviço também será desorganizado.",
          "O ponto não é prometer resposta imediata o dia inteiro. Isso seria irreal para quem também executa o trabalho. O ponto é ter um jeito de identificar mensagens que não podem ficar esquecidas e responder com clareza quando chegar a hora.",
        ],
      },
      {
        heading: "O concorrente está a uma conversa de distância",
        paragraphs: [
          "Muitos clientes não avisam que estão comparando. Eles perguntam preço, disponibilidade ou como funciona e, se a conversa não anda, chamam outro profissional. Não é sempre falta de interesse. Às vezes é apenas conveniência.",
          "Por isso, a primeira resposta precisa fazer duas coisas: reconhecer o pedido e abrir o próximo passo. Uma resposta como vou ver e te falo depois pode ser honesta, mas deixa a conversa suspensa. Melhor é indicar quando volta e o que você precisa para ajudar.",
        ],
        bullets: [
          "Recebi sua mensagem e vou te responder com calma até 15h.",
          "Para te passar o caminho certo, me diz rapidinho: é para hoje ou para esta semana?",
          "Consigo te orientar. Antes, preciso entender uma coisa: você já tem data definida?",
        ],
      },
      {
        heading: "Responder com contexto é melhor que responder correndo",
        paragraphs: [
          "Rapidez sem contexto também atrapalha. Se você responde qualquer coisa só para não deixar o cliente esperando, pode gerar retrabalho, confusão ou uma promessa que não deveria ter feito.",
          "Uma boa resposta pelo WhatsApp tem três partes: mostra que você entendeu, responde o que dá para responder agora e indica o próximo passo. Isso funciona tanto para lead novo quanto para cliente ativo.",
        ],
        numbered: [
          "Entendimento: 'Entendi, você quer saber disponibilidade para sexta.'",
          "Resposta: 'Tenho dois horarios possíveis no fim da tarde.'",
          "Próximo passo: 'Quer que eu te mande as opções e valores?'",
        ],
      },
      {
        heading: "Quais mensagens merecem prioridade",
        paragraphs: [
          "Nem toda mensagem atrasada tem o mesmo impacto. Para reduzir sumiços, priorize conversas que carregam oportunidade, risco ou compromisso.",
        ],
        bullets: [
          "Lead novo perguntando preço, agenda ou disponibilidade.",
          "Cliente que já recebeu proposta e ainda não respondeu.",
          "Pessoa que mandou documento, comprovante ou confirmação.",
          "Mensagem com reclamação, urgência ou expectativa quebrada.",
          "Follow-up que você prometeu fazer em data específica.",
        ],
      },
      {
        heading: "Como manter a conversa viva sem pressionar",
        paragraphs: [
          "Depois da primeira resposta, a conversa precisa de memória. Se você mandou proposta e o cliente não respondeu, não precisa cobrar de forma dura. Pode retomar com contexto e uma saída fácil.",
        ],
        bullets: [
          "Oi, passando para confirmar se você conseguiu ver as opções que te mandei.",
          "Se ainda fizer sentido, posso te ajudar a escolher o melhor caminho.",
          "Se preferir deixar para outro momento, sem problema. Só me avisa para eu me organizar por aqui.",
        ],
        note:
          "Follow-up bom não empurra. Ele reduz o esforço do cliente para retomar a decisão.",
      },
      {
        heading: "Quando a rotina manual não dá conta",
        paragraphs: [
          "Se você recebe muitas mensagens por dia, o problema deixa de ser vontade e passa a ser capacidade. Você sabe que deveria responder e acompanhar, mas não consegue lembrar de tudo enquanto trabalha.",
          "Nesse cenario, uma secretária inteligente pode ajudar a separar contatos, lembrar retornos e preparar rascunhos. A decisão continua sua, mas a chance de uma conversa importante desaparecer no meio da lista diminui.",
        ],
      },
    ],
    faqs: [
      {
        question: "Preciso responder todo cliente imediatamente?",
        answer:
          "Não. O mais importante é não deixar conversas importantes sem próximo passo. Uma resposta honesta com prazo claro já reduz ansiedade.",
      },
      {
        question: "Follow-up espanta cliente?",
        answer:
          "Follow-up sem contexto pode incomodar. Follow-up educado, com referência ao pedido original e saída fácil, costuma ser percebido como cuidado.",
      },
      {
        question: "Como a Áurea entra nessa rotina?",
        answer:
          "Áurea ajuda a organizar mensagens, identificar pendências e preparar rascunhos com aprovação humana, para que você não dependa apenas da memória.",
      },
    ],
  },
  {
    id: "SG-BLOG-005",
    title: "Como fazer follow-up no WhatsApp sem parecer insistente",
    slug: "como-fazer-follow-up-whatsapp-sem-parecer-insistente",
    excerpt:
      "Follow-up bom não é cobrar resposta. É lembrar o cliente do contexto certo, na hora certa, com um próximo passo simples.",
    date: "2026-06-24",
    readingMinutes: 7,
    cluster: "Atendimento ao cliente",
    funnel: "interest",
    primaryKeyword: "follow-up WhatsApp",
    secondaryKeywords: [
      "mensagem de follow-up para cliente",
      "cliente não responde WhatsApp",
      "recuperar lead WhatsApp",
    ],
    metaTitle: "Como fazer follow-up no WhatsApp sem parecer insistente",
    metaDescription:
      "Aprenda quando e como fazer follow-up no WhatsApp sem pressionar o cliente, mantendo contexto, cuidado e próximo passo claro.",
    ctaType: "checklist",
    heroLabel: "Follow-up com cuidado",
    heroImage: "/images/blog/follow-up-whatsapp-sem-insistir-aurea-hero.png",
    heroAlt:
      "Celular com lembrete de follow-up e botão de aprovação em uma mesa clara representando retornos cuidadosos pelo WhatsApp",
    takeaways: [
      "Follow-up fica ruim quando parece pressa sua, não ajuda para o cliente.",
      "O melhor retorno lembra o contexto, reduz atrito e oferece um próximo passo claro.",
      "Uma secretária inteligente ajuda ao lembrar quem precisa de retorno e preparar rascunhos para aprovação.",
    ],
    sections: [
      {
        heading: "O problema não é fazer follow-up. É fazer sem contexto.",
        paragraphs: [
          "Muita gente evita fazer follow-up no WhatsApp porque tem medo de parecer insistente. A pessoa pediu preço, fez uma pergunta, sumiu por dois dias e fica aquela dúvida: mando outra mensagem ou deixo quieto?",
          "O ponto é que follow-up ruim realmente incomoda. Ele aparece do nada, cobra uma resposta e coloca pressão no cliente. Mas follow-up bom faz o contrário: retoma o assunto com cuidado, lembra o motivo da conversa e facilita a próxima decisão.",
          "No WhatsApp, a conversa some rápido. O cliente abre outra notificação, entra numa reunião, resolve uma urgência, chama outro fornecedor ou simplesmente esquece onde parou. Se você não retorna, muitas oportunidades esfriam sem que ninguém tenha dito não.",
        ],
      },
      {
        heading: "Follow-up não é cobrança",
        paragraphs: [
          "Pense no follow-up como um serviço. você está ajudando a conversa a não se perder.",
          "Em vez de escrever alguma novidade, prefira voltar com uma informação útil ou uma pergunta simples. A mensagem precisa mostrar que você lembra do contexto e respeita o tempo da pessoa.",
        ],
        bullets: [
          "Oi, Ana. Passando para retomar o orçamento do plano básico que te enviei ontem. Faz sentido eu te explicar a opção mais simples primeiro?",
          "Oi, Carlos. Você tinha comentado que precisava resolver isso ainda esta semana. Quer que eu te mande o próximo passo?",
          "Oi, Marina. Separei as duas opções que combinam com o que você pediu. Posso te mandar a mais enxuta primeiro?",
        ],
        afterParagraphs: [
          "Repare que nenhuma dessas mensagens cobra. Elas ajudam a pessoa a voltar para a decisão.",
        ],
      },
      {
        heading: "O timing importa mais do que a pressa",
        paragraphs: [
          "Nem todo follow-up precisa acontecer no mesmo dia. O tempo certo depende do tipo de conversa.",
          "Se o cliente pediu uma informação objetiva e estava comparando opções, um retorno no mesmo dia pode ser importante. Se ele pediu para pensar, talvez o melhor seja voltar no dia seguinte com calma. Se era uma decisão maior, dois ou três dias podem fazer mais sentido.",
          "O erro é deixar o timing na memória. Quando isso acontece, você lembra tarde demais ou manda retorno para quem nem era prioridade.",
        ],
        numbered: [
          "No fim do dia, marque quem precisa de retorno.",
          "Anote o motivo do retorno em uma frase curta.",
          "Defina quando voltar.",
          "Prepare a mensagem com base no contexto, não em um template solto.",
        ],
      },
      {
        heading: "Use uma estrutura de três partes",
        paragraphs: [
          "Um follow-up claro pode seguir uma estrutura simples: contexto, ajuda e próximo passo. Essa combinação tira o peso da mensagem porque o cliente não sente que está sendo empurrado. Ele sente que você organizou o assunto.",
        ],
        bullets: [
          "Contexto: você tinha me perguntado sobre atendimento pelo WhatsApp para não perder leads.",
          "Ajuda: o caminho mais simples é começar por um fluxo, identificar mensagens novas e lembrar retornos.",
          "Próximo passo: quer que eu te mostre como ficaria no seu caso?",
        ],
      },
      {
        heading: "O que evitar",
        paragraphs: [
          "Evite mensagens que só servem para pressionar. Elas até funcionam em alguns casos, mas geralmente não ajudam o cliente a decidir porque colocam a responsabilidade inteira nele.",
        ],
        bullets: [
          "E aí?",
          "Conseguiu ver?",
          "Ainda tem interesse?",
          "Estou aguardando seu retorno.",
        ],
        afterParagraphs: [
          "Também evite mandar várias mensagens seguidas sem acrescentar nada. Se o cliente não respondeu, o próximo contato precisa ter uma razão melhor do que estou tentando de novo.",
        ],
      },
      {
        heading: "Onde a Áurea entra",
        paragraphs: [
          "O desafio do follow-up não é saber que ele importa. A maioria dos profissionais sabe. O problema é lembrar de cada retorno no meio da rotina real.",
          "Áurea ajuda como uma secretária inteligente para WhatsApp: ela organiza pendências, lembra quem precisa de retorno e prepara rascunhos para você aprovar. A ideia não é sair mandando mensagem sem critério. É diminuir a chance de um cliente quente desaparecer porque o retorno ficou perdido entre outras conversas.",
          "Você continua no controle. A Áurea ajuda a manter a fila clara.",
        ],
      },
      {
        heading: "Checklist rápido para hoje",
        bullets: [
          "Liste 5 conversas que ficaram sem próximo passo.",
          "Escreva em uma frase o contexto de cada uma.",
          "Defina se o retorno deve ser hoje, amanhã ou daqui alguns dias.",
          "Troque alguma novidade por uma pergunta que ajude o cliente a decidir.",
          "Marque quem precisa de novo follow-up se não responder.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quantos follow-ups devo fazer antes de parar?",
        answer:
          "Para a maioria dos casos, um ou dois retornos bem contextualizados são melhores do que várias mensagens genéricas. Se a pessoa não responde depois disso, registre o motivo e tire da fila quente.",
      },
      {
        question: "Follow-up no WhatsApp pode parecer invasivo?",
        answer:
          "Pode, se a mensagem for apenas cobrança. Fica mais natural quando você retoma o contexto, oferece ajuda e faz uma pergunta simples.",
      },
      {
        question: "A Áurea envia follow-up sozinha?",
        answer:
          "A proposta da Áurea é ajudar com organização, lembretes e rascunhos com aprovação humana. Mensagens sensíveis devem passar por revisão antes de sair.",
      },
    ],
  },
  {
    id: "SG-BLOG-003",
    title: "Como priorizar mensagens importantes no WhatsApp todos os dias",
    slug: "como-priorizar-mensagens-whatsapp",
    excerpt:
      "Um método de triagem diária para decidir o que responder primeiro, o que acompanhar depois e o que pode esperar.",
    date: "2026-06-26",
    readingMinutes: 8,
    cluster: "Produtividade",
    funnel: "awareness",
    primaryKeyword: "priorizar mensagens WhatsApp",
    secondaryKeywords: ["organizar mensagens WhatsApp", "produtividade WhatsApp", "gestão de mensagens"],
    metaTitle: "Como priorizar mensagens importantes no WhatsApp todos os dias",
    metaDescription:
      "Veja um método prático para separar mensagens urgentes, importantes e pendentes no WhatsApp sem se perder durante o dia.",
    ctaType: "checklist",
    heroLabel: "Triagem diária",
    heroImage: "/images/blog/priorizar-mensagens-aurea-hero.png",
    heroAlt:
      "Áurea em ambiente preto e dourado com geometria luminosa e painéis de prioridade representando triagem de mensagens",
    takeaways: [
      "Prioridade não é responder quem gritou mais alto; e proteger oportunidade, compromisso e risco.",
      "Classifique mensagens por tipo de ação: responder, decidir, acompanhar ou arquivar.",
      "Uma revisão de fim de dia evita que follow-ups e promessas desapareçam.",
    ],
    sections: [
      {
        heading: "Nem toda mensagem merece a mesma energia",
        paragraphs: [
          "O WhatsApp mistura tudo: lead novo, cliente antigo, grupo, fornecedor, áudio longo, pergunta simples e problema urgente. Se você trata todas as mensagens como iguais, acaba respondendo pela ordem da ansiedade, não pela ordem do impacto.",
          "Priorizar mensagens é decidir conscientemente onde sua atenção gera mais valor. Isso não significa ignorar pessoas. Significa ter critério para não deixar uma oportunidade importante perder espaço para uma conversa que poderia esperar.",
        ],
      },
      {
        heading: "Use quatro grupos de prioridade",
        paragraphs: [
          "Uma Triagem diária simples pode separar as mensagens em quatro grupos. O nome dos grupos importa menos que a disciplina de revisar com o mesmo critério todos os dias.",
        ],
        bullets: [
          "Agora: precisa de resposta ou decisão hoje para não travar venda, agenda ou cliente.",
          "Hoje: importante, mas pode entrar em um bloco de atendimento.",
          "Acompanhar: você já respondeu e precisa lembrar de voltar depois.",
          "Sem ação: conversa resolvida, informativa ou que não exige resposta.",
        ],
        note:
          "Se tudo parece 'agora', o critério está amplo demais. Prioridade serve para escolher.",
      },
      {
        heading: "Como identificar cliente quente",
        paragraphs: [
          "Cliente quente não é apenas quem manda muitas mensagens. É quem demonstra intenção, prazo ou próximo passo concreto.",
        ],
        bullets: [
          "Perguntou disponibilidade para uma data específica.",
          "Pediu preço depois de explicar o problema.",
          "Mandou documento, endereço, foto, comprovante ou detalhes para executar.",
          "Perguntou como contratar, reservar ou agendar.",
          "Respondeu um follow-up antigo com interesse renovado.",
        ],
      },
      {
        heading: "Como identificar pendência operacional",
        paragraphs: [
          "Nem toda prioridade é venda. Algumas mensagens importam porque travam a operação. Um cliente esperando confirmação, um horário sem resposta ou um combinado mal registrado pode virar problema depois.",
        ],
        bullets: [
          "Você prometeu enviar algo e ainda não enviou.",
          "A pessoa depende da sua confirmação para se organizar.",
          "Existe data, valor, endereço ou horário envolvido.",
          "A conversa tem reclamação, dúvida sensível ou expectativa quebrada.",
        ],
      },
      {
        heading: "Crie uma frase de próximo passo",
        paragraphs: [
          "Depois de classificar a mensagem, escreva mentalmente ou em anotação curta qual é o próximo passo. Se você não consegue nomear a ação, provavelmente ainda não entendeu a prioridade.",
        ],
        bullets: [
          "Enviar proposta até 16h.",
          "Confirmar horário de quinta.",
          "Perguntar se ainda tem interesse.",
          "Aguardar cliente mandar documento.",
          "Retomar em dois dias se não responder.",
        ],
      },
      {
        heading: "Ritual de 15 minutos no fim do dia",
        paragraphs: [
          "O fim do dia é o melhor momento para impedir que o dia seguinte comece bagunçado. Abra as conversas importantes e procure promessas feitas, propostas enviadas e pessoas que ficaram sem retorno.",
        ],
        numbered: [
          "Veja conversas etiquetadas como responder hoje.",
          "Mova o que foi resolvido para sem ação.",
          "Crie lembretes para follow-ups.",
          "Escreva rascunhos simples para as respostas que ficaram pendentes.",
          "Escolha as três primeiras conversas do dia seguinte.",
        ],
      },
      {
        heading: "Onde uma secretária inteligente ajuda",
        paragraphs: [
          "A triagem manual exige atenção constante. Uma secretária inteligente como a Áurea pode ajudar a preparar um resumo, destacar pendências e sugerir rascunhos para aprovação. O valor está em você abrir o WhatsApp com mais clareza, não com mais uma lista confusa.",
        ],
      },
    ],
    faqs: [
      {
        question: "Como saber se uma mensagem é urgente ou apenas barulhenta?",
        answer:
          "Procure prazo, compromisso, dinheiro, cliente ativo ou risco de fricção. Se não existe nenhum desses elementos, talvez ela possa esperar um bloco de resposta.",
      },
      {
        question: "Devo responder grupos antes de clientes?",
        answer:
          "Em geral, clientes e pendências comerciais entram antes. Grupos costumam ser revisados em blocos, salvo quando carregam uma demanda direta importante.",
      },
      {
        question: "Áurea decide a prioridade por mim?",
        answer:
          "Áurea pode ajudar a organizar e sugerir prioridades, mas o uso recomendado mantém você no controle das decisões e aprovações.",
      },
    ],
  },
  {
    id: "SG-BLOG-004",
    title: "O que responder quando o cliente pede preço e some",
    slug: "cliente-pede-preco-e-some",
    excerpt:
      "Scripts e um fluxo simples para retomar conversas de orçamento sem parecer insistente nem transformar follow-up em cobrança.",
    date: "2026-06-30",
    readingMinutes: 9,
    cluster: "Vendas pelo WhatsApp",
    funnel: "interest",
    primaryKeyword: "cliente pede preço e some",
    secondaryKeywords: ["follow-up cliente sumiu", "responder pedido de preço", "orçamento pelo WhatsApp"],
    metaTitle: "O que responder quando o cliente pede preço e some",
    metaDescription:
      "Veja respostas práticas para retomar conversas quando o cliente pede preço, desaparece e você não quer parecer insistente.",
    ctaType: "checklist",
    heroLabel: "Follow-up com contexto",
    heroImage: "/images/blog/follow-up-preco-aurea-hero.png",
    heroAlt:
      "Áurea em estúdio branco futurista com telefone e painéis flutuantes representando follow-up de propostas",
    takeaways: [
      "Quando o cliente pede preço e some, o problema pode ser falta de contexto, comparação ou medo de decidir.",
      "A melhor retomada relembra o pedido, facilita a resposta e oferece uma saída simples.",
      "Follow-up precisa de rotina. Se depender da memória, a conversa esfria.",
    ],
    sections: [
      {
        heading: "Pedir preço não significa estar pronto para comprar",
        paragraphs: [
          "Muita gente pede preço cedo demais. Às vezes o cliente ainda está entendendo o problema, comparando alternativas ou tentando descobrir se aquilo cabe no bolso. Se você responde apenas com um valor, a conversa pode morrer porque faltou contexto para a pessoa decidir.",
          "Isso não quer dizer que você deva esconder preço. Quer dizer que o preço precisa vir acompanhado de orientação, próximo passo e abertura para dúvida. O objetivo é transformar uma pergunta fria em uma conversa útil.",
        ],
      },
      {
        heading: "Por que o cliente some depois do preço",
        paragraphs: [
          "Existem alguns motivos comuns. Entender o motivo provável ajuda a escolher a mensagem certa para retomar sem pressionar.",
        ],
        bullets: [
          "Ele estava apenas pesquisando e ainda não tinha urgência.",
          "O valor chegou sem explicação suficiente.",
          "Ele comparou com outra opção mais barata.",
          "Ele gostou, mas deixou para decidir depois.",
          "Ele ficou com uma dúvida e não quis perguntar.",
          "Ele simplesmente esqueceu no meio da rotina.",
        ],
      },
      {
        heading: "O erro de mandar só 'alguma novidade?'",
        paragraphs: [
          "A mensagem 'alguma novidade?' é fácil, mas coloca todo o esforço no cliente. Ele precisa lembrar quem você é, qual era o assunto e o que responder. Quanto mais trabalho mental, menor a chance de retorno.",
          "Um follow-up melhor recupera contexto e oferece uma resposta fácil. Em vez de cobrar uma decisão, ajude a pessoa a retomar o fio.",
        ],
      },
      {
        heading: "Modelo 1: retomada leve",
        paragraphs: [
          "Use quando a pessoa pediu preço, recebeu informação e não respondeu. O tom é simples e sem pressão.",
        ],
        bullets: [
          "Oi, passando para confirmar se você conseguiu ver as opções que te mandei.",
          "Se ainda fizer sentido, posso te ajudar a escolher o melhor caminho.",
          "Se preferir deixar para outro momento, sem problema. Só me avisa para eu me organizar por aqui.",
        ],
      },
      {
        heading: "Modelo 2: retomada com contexto",
        paragraphs: [
          "Use quando você sabe qual era a necessidade do cliente. Essa versão mostra cuidado e evita parecer mensagem copiada.",
        ],
        bullets: [
          "Oi, lembrei do que você comentou sobre precisar resolver isso ainda este mês.",
          "Pelo que você me contou, eu seguiria pelo pacote/horário/opção que te mandei primeiro.",
          "Quer que eu te explique rapidamente a diferença entre as opções?",
        ],
      },
      {
        heading: "Modelo 3: retomada para quem achou caro",
        paragraphs: [
          "Quando o silêncio parece vir de preço, não tente convencer no grito. Reabra a conversa pelo ajuste de escopo.",
        ],
        bullets: [
          "Oi, fiquei pensando aqui: se o valor ficou acima do que você queria investir agora, posso te mostrar uma opção mais simples.",
          "Talvez não seja o pacote completo, mas já resolve a parte principal.",
          "Quer que eu adapte a proposta para um primeiro passo menor?",
        ],
      },
      {
        heading: "Modelo 4: encerramento elegante",
        paragraphs: [
          "Nem toda conversa deve ficar aberta para sempre. Um encerramento educado ajuda você a organizar a rotina e ainda deixa a porta aberta.",
        ],
        bullets: [
          "Oi, vou encerrar essa pendência por aqui para não ficar te incomodando.",
          "Se voltar a fazer sentido, pode me chamar que eu retomo do ponto em que paramos.",
          "Obrigado por ter considerado.",
        ],
      },
      {
        heading: "Quando fazer follow-up",
        paragraphs: [
          "Não existe um intervalo único para todos os negócios, mas existe uma regra prática: quanto mais concreta era a intenção, mais rápido deve ser o retorno. Um cliente que pediu agenda para esta semana não deve esperar quatro dias. Uma pesquisa sem prazo pode receber follow-up mais leve depois.",
        ],
        numbered: [
          "Primeiro retorno: 24 a 48 horas depois da proposta, se havia interesse real.",
          "Segundo retorno: alguns dias depois, com contexto ou ajuste de opção.",
          "Encerramento: quando já houve tentativa suficiente e nenhuma resposta.",
        ],
      },
      {
        heading: "Registre o status da conversa",
        paragraphs: [
          "O maior inimigo do follow-up é a memória. Se você não registra que mandou preço, quando mandou e qual era o próximo passo, a conversa desaparece. Use etiqueta, anotação ou uma rotina diária.",
          "Áurea pode ajudar nesse ponto preparando lembretes e rascunhos para aprovação. Assim, a conversa não depende apenas de você lembrar no meio de um dia cheio.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quantas vezes posso fazer follow-up?",
        answer:
          "Depende do contexto, mas duas retomadas e um encerramento educado costumam ser suficientes para muitos negócios de serviço. O importante é não insistir sem agregar contexto.",
      },
      {
        question: "Devo dar desconto quando o cliente some?",
        answer:
          "Não como reflexo automático. Primeiro tente entender se faltou clareza, urgência ou encaixe. Desconto sem diagnóstico treina a conversa para preço.",
      },
      {
        question: "Áurea manda follow-up automaticamente?",
        answer:
          "Áurea ajuda a lembrar e preparar rascunhos de follow-up com aprovação humana, especialmente no teste atual.",
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
      text: "Teste a Soul Genia em uma rotina real do seu WhatsApp. Comece pequeno, com aprovação humana, e veja se ela ajuda a diminuir o ruído do dia.",
    };
  }

  if (type === "checklist") {
    return {
      label: "Organizar meu WhatsApp",
      text: "Quer testar isso em uma rotina real do seu WhatsApp? A Soul Genia pode ajudar você a começar por um fluxo simples, com teste assistido e aprovação humana.",
    };
  }

  return {
    label: "Conhecer a Soul Genia",
    text: "Se você quer organizar melhor o WhatsApp sem perder o controle das respostas, conheça a Soul Genia, uma secretária pessoal que ajuda a cuidar das mensagens com aprovação humana.",
  };
}
