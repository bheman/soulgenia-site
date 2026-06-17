import Section from "@/components/ui/Section";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  detail: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Eu tinha vergonha de admitir quanto tempo eu perdia respondendo WhatsApp. Eram facilmente duas horas por dia. Nos primeiros 30 dias com a {PRODUTO}, meu no-show caiu de mais de 30% para menos de 5%.",
    name: "Marcela R.",
    role: "Psicóloga",
    location: "Florianópolis",
    detail: "8 anos de consultório",
  },
  {
    quote:
      "Sou advogado solo. Não tenho secretária, não queria ter. Mas estava perdendo clientes por demora no retorno. A {PRODUTO} resolve sem eu precisar de mais ninguém na estrutura.",
    name: "Rodrigo M.",
    role: "Advogado tributarista",
    location: "Curitiba",
    detail: "",
  },
  {
    quote:
      "Minha agenda foi de 60 para 90% de ocupação em seis semanas. Não contratei ninguém, não mudei meu preço, não fiz campanha. Só parei de perder horário por falta de follow-up.",
    name: "Juliana F.",
    role: "Nutricionista e coach",
    location: "São Paulo",
    detail: "",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProvaSocial() {
  return (
    <Section bg="zinc" id="depoimentos">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
          Resultados reais
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Quem já usa a {"{PRODUTO}"}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-zinc-500">
          * Depoimentos placeholder — serão substituídos pelos primeiros clientes reais.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <StarRating />
            <blockquote className="flex-1 text-sm leading-relaxed text-zinc-700">
              <p>"{t.quote}"</p>
            </blockquote>
            <figcaption className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700"
                aria-hidden="true"
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                <p className="text-xs text-zinc-500">
                  {t.role}, {t.location}
                  {t.detail ? ` — ${t.detail}` : ""}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
