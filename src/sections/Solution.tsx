import { Zap, Brain, Wallet, Cpu } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

const PILLARS = [
  {
    icon: Zap,
    title: "Criação Rápida",
    text: "Seu site pronto em dias, não semanas. IA acelera cada etapa do processo.",
  },
  {
    icon: Brain,
    title: "Design Inteligente",
    text: "A IA aprende sobre o seu negócio e cria layouts personalizados e estratégicos.",
  },
  {
    icon: Wallet,
    title: "Custo Acessível",
    text: "Planos que cabem no bolso de PMEs, empreendedores e profissionais liberais.",
  },
];

export function Solution() {
  return (
    <section id="solucoes" className="relative border-t border-line-soft bg-charcoal py-28 sm:py-36">
      <div className="container-edge">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <Eyebrow>Nossa solução</Eyebrow>
            <RevealText
              as="h2"
              lines={["Sites institucionais com", "Inteligência Artificial."]}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
            />
            <FadeIn delay={0.15}>
              <p className="mt-7 max-w-lg text-balance leading-relaxed text-mist">
                A AS Tech utiliza IA de ponta para criar sites institucionais
                profissionais de forma rápida, personalizada e acessível.
                Nossa tecnologia analisa o seu negócio e gera uma presença
                digital única — sem burocracia, sem espera e sem custo
                excessivo.
              </p>
            </FadeIn>

            <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-3">
              {PILLARS.map((p, i) => (
                <FadeIn key={p.title} delay={0.2 + i * 0.08} y={20}>
                  <p.icon className="size-6 text-signal" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-bone">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{p.text}</p>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.25} y={24}>
            <div className="rounded-3xl border border-line bg-surface p-8 sm:p-10">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-signal/25 bg-signal/10">
                <Cpu className="size-6 text-signal" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mt-7 font-display text-xl font-bold tracking-tight text-bone">
                Analisando seu negócio
              </h3>
              <p className="mt-4 leading-relaxed text-mist">
                Nossa IA identifica setor, tom de voz e objetivos para gerar
                uma estrutura sob medida — sem partir de um template
                genérico.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
