import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MessageSquare, Cpu, Eye, CheckCircle2 } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

const STEPS = [
  { n: "01", icon: MessageSquare, title: "Briefing", text: "Cliente compartilha objetivos." },
  { n: "02", icon: Cpu, title: "IA em Ação", text: "Gera design, estrutura e conteúdo." },
  { n: "03", icon: Eye, title: "Revisão", text: "Cliente avalia e solicita ajustes." },
  { n: "04", icon: CheckCircle2, title: "Entrega", text: "Site publicado e pronto." },
];

function ProcessVisualRow({
  step,
  index,
  total,
  scrollYProgress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 0.75 / total;
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const borderColor = useTransform(progress, [0, 1], ["#173642", "#00e5ff"]);
  const background = useTransform(progress, [0, 1], ["rgba(20,58,72,0)", "rgba(0,229,255,0.1)"]);
  const iconColor = useTransform(progress, [0, 1], ["#5c6d74", "#00e5ff"]);
  const textColor = useTransform(progress, [0, 1], ["#5c6d74", "#f5f6f8"]);

  return (
    <motion.div
      style={{ borderColor, backgroundColor: background }}
      className="flex items-center gap-4 rounded-2xl border p-4"
    >
      <motion.span style={{ color: iconColor }} className="flex size-9 shrink-0 items-center justify-center">
        <step.icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
      </motion.span>
      <motion.span style={{ color: textColor }} className="text-sm font-medium tracking-tight">
        {step.title}
      </motion.span>
    </motion.div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="processo"
      ref={sectionRef}
      className="relative border-t border-line-soft bg-charcoal py-28 sm:py-36"
    >
      <div className="container-edge">
        <Eyebrow>Processo</Eyebrow>
        <RevealText
          as="h2"
          lines={["Como", "Funciona"]}
          className="mt-6 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
        />
        <FadeIn delay={0.15}>
          <p className="mt-7 max-w-md text-balance leading-relaxed text-mist">
            Do briefing à entrega, nosso processo é simples, transparente e
            orientado ao resultado. Em poucos dias, o seu negócio já está
            online com uma presença digital profissional.
          </p>
        </FadeIn>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="relative">
            <div className="absolute left-7 top-2 bottom-2 w-px bg-line-soft" />
            <motion.div
              style={{ scaleY }}
              className="absolute left-7 top-2 bottom-2 w-px origin-top bg-signal"
            />

            <div className="space-y-6">
              {STEPS.map((step, i) => (
                <FadeIn key={step.n} delay={i * 0.05} y={20}>
                  <div className="relative flex items-start gap-6">
                    <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-signal/25 bg-charcoal">
                      <step.icon className="size-6 text-signal" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div className="flex-1 rounded-2xl border border-line-soft bg-surface p-6">
                      <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-mist-dim">
                        {step.n}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-bone sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-mist">{step.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-32 rounded-3xl border border-line bg-surface p-6">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-mist-dim/60" aria-hidden="true" />
                <span className="size-2 rounded-full bg-mist-dim/60" aria-hidden="true" />
                <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
                <span className="ml-3 flex-1 truncate rounded-full bg-surface-2 px-3 py-1.5 text-[11px] text-mist-dim">
                  seunegocio.com.br
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {STEPS.map((step, i) => (
                  <ProcessVisualRow
                    key={step.n}
                    step={step}
                    index={i}
                    total={STEPS.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.14em] text-mist-dim">
                Progresso do projeto
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  style={{ scaleX: scrollYProgress }}
                  className="h-full w-full origin-left rounded-full bg-signal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
