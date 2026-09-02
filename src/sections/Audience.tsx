import { Building2, TrendingUp, Stethoscope } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

const AUDIENCE = [
  {
    icon: Building2,
    title: "Pequenas, Médias e Grandes Empresas",
    text: "Negócios de todos os portes que precisam de uma presença digital profissional e sob medida.",
  },
  {
    icon: TrendingUp,
    title: "Empreendedores",
    text: "Quem está começando e precisa se posicionar no mercado com credibilidade e agilidade.",
  },
  {
    icon: Stethoscope,
    title: "Profissionais Liberais",
    text: "Médicos, advogados, consultores e outros profissionais que desejam atrair clientes online.",
  },
];

export function Audience() {
  return (
    <section id="publico-alvo" className="relative border-t border-line-soft py-28 sm:py-36">
      <div className="container-edge">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Público-alvo</Eyebrow>
          <RevealText
            as="h2"
            lines={["Feito para você."]}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
          />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.1} y={24}>
              <div className="flex h-full flex-col items-center rounded-3xl border border-line bg-surface p-8 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-signal/25 bg-signal/10">
                  <a.icon className="size-6 text-signal" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-bone">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{a.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
