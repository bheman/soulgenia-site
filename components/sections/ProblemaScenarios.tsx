import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const scenarios = [
  {
    number: "01",
    title: "O profissional que não consegue sair do modo “secretária”",
    body: "Você está em consulta com um paciente. Enquanto isso, chegaram 7 mensagens no WhatsApp — dois pedindo horário, um perguntando o preço, um confirmando (ou não), um reclamando que não recebeu o lembrete. Quando você sai, precisa decidir quem responde primeiro, checar a agenda, mandar as informações certas. São 40 minutos que não estavam no plano.",
  },
  {
    number: "02",
    title: "O paciente das 23h que some de manhã",
    body: "Luciana manda mensagem às 23h47 querendo agendar com urgência. Você vê na manhã seguinte, responde, mas ela já marcou com outro profissional. Não é culpa sua — você não trabalha de madrugada. Mas ela não esperou. Esse não é um caso raro.",
  },
  {
    number: "03",
    title: "O cancelamento de última hora que destruiu a tarde",
    body: "Você reservou a tarde inteira para três consultas. Dois cancelaram no dia, um não apareceu. Sem aviso, sem reagendamento automático, sem cobrança de no-show. Você perdeu a tarde e ainda ficou sem receber. Nas clínicas de psicologia, entre 25 e 35% dos horários são cancelados ou viram no-show — isso não é exagero, é o padrão do mercado.",
  },
];

export default function ProblemaScenarios() {
  return (
    <Section bg="zinc" id="problema">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
          Soa familiar?
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          O problema — 3 cenários reais
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {scenarios.map((s) => (
          <Card key={s.number} className="flex flex-col gap-4">
            <span
              className="text-4xl font-black text-zinc-100"
              aria-hidden="true"
            >
              {s.number}
            </span>
            <h3 className="text-lg font-semibold leading-snug text-zinc-900">
              {s.title}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-zinc-600">
              {s.body}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
