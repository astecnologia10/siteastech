import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    tag: "Landing Page",
    desc: "Uma única página construída com um objetivo claro: converter visitantes em clientes. Ideal para lançamentos, campanhas de anúncios (Google/Meta Ads) e profissionais autônomos.",
    features: [
      "1 página (Landing Page)",
      "Estrutura focada em conversão",
      "Formulário de contacto",
      "SEO básico",
      "Publicação do site",
    ],
    highlight: false,
  },
  {
    name: "Business",
    tag: "Site institucional · 5 páginas",
    desc: "A presença digital completa da empresa. Ideal para empresas, clínicas, escritórios, agências e negócios que precisam de uma vitrine profissional.",
    features: [
      "5 páginas institucionais",
      "Integração com WhatsApp",
      "Integração com Google Maps",
      "Design personalizado",
      "SEO otimizado",
    ],
    highlight: true,
    badge: "Mais solicitado",
  },
  {
    name: "Premium",
    tag: "Site institucional · 10 páginas",
    desc: "Versão mais completa e estruturada, com mais seções, conteúdo e integrações avançadas. Ideal para empresas que precisam de uma presença digital mais robusta.",
    features: [
      "10 páginas institucionais",
      "Mais seções e conteúdo",
      "Integrações avançadas",
      "SEO avançado",
      "Acompanhamento pós-lançamento",
    ],
    highlight: false,
  },
];

export function Pricing() {
  const [selected, setSelected] = useState(PLANS.findIndex((p) => p.highlight));

  return (
    <section id="planos" className="relative border-t border-line-soft bg-charcoal py-28 sm:py-36">
      <div className="container-edge">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Planos</Eyebrow>
          <RevealText
            as="h2"
            lines={["Escolha a solução ideal", "para sua empresa."]}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
          />
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-7 max-w-md text-balance leading-relaxed text-mist">
              Entenda cada solução e descubra qual tipo de site é ideal para
              o momento do seu negócio.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const isSelected = selected === i;
            return (
            <FadeIn key={plan.name} delay={i * 0.1} y={24}>
              <div
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                data-cursor-hover
                onClick={() => setSelected(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(i);
                  }
                }}
                className={cn(
                  "relative flex h-full cursor-pointer flex-col rounded-3xl border p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-signal/50 hover:shadow-[0_25px_70px_-20px_rgba(0,229,255,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
                  isSelected
                    ? "border-signal/40 bg-surface-2 shadow-[0_0_60px_-15px_rgba(0,229,255,0.25)] hover:-translate-y-1 lg:-translate-y-4 lg:hover:-translate-y-5"
                    : "border-line bg-surface hover:-translate-y-2 hover:bg-surface-2"
                )}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-8 rounded-full bg-signal px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
                    {plan.badge}
                  </span>
                )}

                <h3 className="font-display text-xl font-bold tracking-tight text-bone">
                  {plan.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-signal-bright">
                  {plan.tag}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-mist">{plan.desc}</p>

                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-bone-dim">
                      <Check className="mt-0.5 size-4 shrink-0 text-signal" strokeWidth={2} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="#contato"
                  variant={isSelected ? "primary" : "secondary"}
                  withArrow
                  className="mt-10 w-full"
                >
                  Solicitar proposta
                </Button>
              </div>
            </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
