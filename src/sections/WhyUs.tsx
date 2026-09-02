import { Rocket, Fingerprint, DollarSign, Smartphone } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

const REASONS = [
  {
    icon: Rocket,
    title: "Velocidade",
    text: "Entrega em até 7 dias úteis — até 10x mais rápido que agências tradicionais.",
  },
  {
    icon: Fingerprint,
    title: "Personalização com IA",
    text: "Cada site é único. A IA adapta cores, estrutura e conteúdo ao perfil do seu negócio.",
  },
  {
    icon: DollarSign,
    title: "Custo-Benefício",
    text: "Qualidade premium a preços justos. Investimento inteligente com retorno real.",
  },
  {
    icon: Smartphone,
    title: "Responsivo & SEO",
    text: "Sites otimizados para Google e perfeitos em qualquer dispositivo — mobile first.",
  },
];

export function WhyUs() {
  return (
    <section id="por-que" className="relative border-t border-line-soft py-28 sm:py-36">
      <div className="container-edge">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Diferenciais</Eyebrow>
            <RevealText
              as="h2"
              lines={["Por que escolher", "a AS Tech?"]}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
            />
            <FadeIn delay={0.15}>
              <p className="mt-7 max-w-md text-balance leading-relaxed text-mist">
                Unimos velocidade, personalização com IA e custo-benefício
                para colocar sua empresa online rapidamente.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <FadeIn key={r.title} delay={i * 0.08} y={20}>
                <div className="border-l border-line pl-6">
                  <r.icon className="size-5 text-signal" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-bone">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{r.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.25}>
          <div className="mt-24 border-t border-line-soft pt-10 text-center">
            <p className="font-display text-xl font-extrabold tracking-[0.02em] text-bone sm:text-2xl">
              DESIGN <span className="text-signal">+</span> TECNOLOGIA{" "}
              <span className="text-signal">+</span> ESTRATÉGIA
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
