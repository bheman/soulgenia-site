import Section from "@/components/ui/Section";

const steps = [
  {
    number: 1,
    title: "Conecta seu WhatsApp Business (QR code)",
    body: "Você abre a {PRODUTO} no navegador, escaneia o QR code com o celular — exatamente como faz com o WhatsApp Web. Não precisa instalar nada, não precisa trocar de número. Seu WhatsApp Business continua sendo seu, a {PRODUTO} opera dentro dele.",
  },
  {
    number: 2,
    title: "Conecta sua agenda Google",
    body: "Um clique no botão \"Conectar Google Calendar\", autoriza e pronto. A {PRODUTO} passa a ver seus horários disponíveis em tempo real. Ela nunca vai agendar em cima de um compromisso existente, e respeita os blocos que você marca como indisponíveis.",
  },
  {
    number: 3,
    title: "Pronto. {PRODUTO} começa a atender em 5 minutos.",
    body: "Sem configurar prompt. Sem escrever script de atendimento. Sem treinar IA. A {PRODUTO} já sabe como um consultório funciona — ela só precisa aprender o seu horário e os seus serviços, que você preenche num formulário de 10 minutos. Depois disso, ela atende, agenda e avisa você só quando precisa de decisão humana.",
  },
];

export default function ComoFunciona3Passos() {
  return (
    <Section bg="white" id="como-funciona">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
          Simples por design
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Como funciona — 3 passos
        </h2>
      </div>

      <div className="relative">
        {/* Vertical connector line (desktop only) */}
        <div
          className="absolute left-8 top-8 hidden h-[calc(100%-4rem)] w-px bg-zinc-200 md:block"
          aria-hidden="true"
        />

        <ol className="space-y-10">
          {steps.map((step) => (
            <li key={step.number} className="relative flex gap-6 md:gap-10">
              {/* Step number bubble */}
              <div
                className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-slate-700 bg-white text-xl font-black text-slate-700"
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="flex-1 pt-3">
                <h3 className="mb-2 text-xl font-semibold text-zinc-900">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-zinc-600">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
