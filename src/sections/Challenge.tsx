import { motion } from "framer-motion";
import { Clock, DollarSign, AlertTriangle } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { NumberTicker } from "@/components/NumberTicker";
import { RevealText } from "@/components/RevealText";

const PROBLEMS = [
  {
    icon: Clock,
    title: "Demorado",
    text: "Agências tradicionais levam semanas — às vezes meses — para entregar um site simples.",
  },
  {
    icon: DollarSign,
    title: "Caro",
    text: "Projetos custam entre R$ 3.000 e R$ 15.000, fora do alcance de pequenos negócios.",
  },
  {
    icon: AlertTriangle,
    title: "Desatualizado",
    text: "Sites lentos e sem otimização prejudicam a imagem e afastam clientes potenciais.",
  },
];

const COST_BARS = [
  {
    label: "Agências tradicionais",
    width: 70,
    parts: [
      { prefix: "R$ ", value: 3, suffix: "K" },
      { prefix: " – ", value: 15, suffix: "K" },
    ],
  },
  {
    label: "Prazo médio de entrega",
    width: 55,
    parts: [
      { value: 4 },
      { prefix: " a ", value: 12, suffix: " semanas" },
    ],
  },
];

function CostBar({ label, width, parts, delay }: (typeof COST_BARS)[number] & { delay: number }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.14em] text-mist-dim">{label}</p>
      <div className="mt-3 h-9 w-full overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="flex h-full items-center justify-end rounded-full bg-signal px-4"
          initial={{ width: "0%" }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
        >
          <span className="whitespace-nowrap text-xs font-semibold text-ink">
            {parts.map((p, i) => (
              <NumberTicker
                key={i}
                value={p.value}
                prefix={p.prefix}
                suffix={p.suffix}
                delay={delay + 0.2 + i * 0.1}
              />
            ))}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export function Challenge() {
  return (
    <section className="relative border-t border-line-soft py-28 sm:py-36">
      <div className="container-edge">
        <Eyebrow>O problema</Eyebrow>
        <RevealText
          as="h2"
          lines={["O mercado atual", "está falhando."]}
          className="mt-6 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-6xl"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="divide-y divide-line-soft border-t border-line-soft">
            {PROBLEMS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <div className="group flex items-start gap-6 py-8">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-signal transition-colors duration-500 group-hover:bg-signal/10">
                    <p.icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-bone sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-md leading-relaxed text-mist">{p.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} y={24}>
            <div className="rounded-3xl border border-line bg-charcoal p-8 sm:p-10">
              <p className="font-display text-lg font-bold tracking-tight text-bone">
                O custo de ficar parado
              </p>

              <div className="mt-8 space-y-7">
                {COST_BARS.map((bar, i) => (
                  <CostBar key={bar.label} {...bar} delay={0.2 + i * 0.15} />
                ))}
              </div>

              <p className="mt-8 border-t border-line-soft pt-6 text-sm italic leading-relaxed text-mist">
                Enquanto isso, clientes em potencial pesquisam — e não te
                encontram.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
