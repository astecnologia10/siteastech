import { Lightbulb, Zap, Target } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { NumberTicker } from "@/components/NumberTicker";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    icon: Lightbulb,
    title: "Inovação",
    text: "IA aplicada à criação de presença digital profissional.",
  },
  {
    icon: Zap,
    title: "Agilidade",
    text: "Processos otimizados para entregas em tempo recorde.",
  },
  {
    icon: Target,
    title: "Resultado",
    text: "Sites que convertem visitas em oportunidades reais.",
  },
];

const STATS = [
  {
    value: 7,
    prefix: "+",
    suffix: "",
    label: "dias úteis é o prazo médio para um site ficar pronto",
  },
  {
    value: 2,
    prefix: "",
    suffix: "",
    label: "sócios movidos por inovação e tecnologia",
  },
  {
    value: 100,
    prefix: "",
    suffix: "%",
    label: "digital, sem burocracia na contratação",
  },
];

export function About() {
  return (
    <section id="quem-somos" className="relative border-t border-line-soft py-28 sm:py-36">
      <div className="container-edge">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <Eyebrow>Quem somos</Eyebrow>
            <RevealText
              as="h2"
              lines={["Sobre a AS Tech"]}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
            />
            <FadeIn delay={0.15}>
              <p className="mt-7 max-w-lg text-balance leading-relaxed text-mist">
                Somos uma empresa de tecnologia especializada na criação de
                sites institucionais com Inteligência Artificial. Fundada por
                sócios apaixonados por inovação, nascemos para democratizar a
                presença digital — entregando soluções modernas, ágeis e
                acessíveis para quem deseja crescer no mundo digital sem
                burocracia.
              </p>
            </FadeIn>

            <div className="mt-12 space-y-3">
              {PILLARS.map((p, i) => (
                <FadeIn key={p.title} delay={0.2 + i * 0.08} y={16}>
                  <div className="flex items-start gap-4 rounded-2xl bg-surface p-5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-signal">
                      <p.icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-tight text-bone">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-mist">{p.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.15} y={24}>
            <div className="rounded-3xl border border-line bg-charcoal p-10">
              {STATS.map((s, i) => (
                <div key={s.label} className={cn("py-7", i !== 0 && "border-t border-line-soft")}>
                  <p className="font-display text-5xl font-extrabold tracking-tight text-bone">
                    <NumberTicker
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      delay={0.2 + i * 0.15}
                    />
                  </p>
                  <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-mist">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
