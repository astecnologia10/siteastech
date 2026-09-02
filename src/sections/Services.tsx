import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Globe,
  Rocket,
  RefreshCw,
  LayoutGrid,
  Plug,
  LifeBuoy,
  Plus,
} from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    n: "01",
    icon: Globe,
    title: "Sites institucionais",
    text: "O site completo da sua empresa: páginas de apresentação, serviços, equipa, diferenciais e contacto. A vitrine profissional que passa credibilidade para quem pesquisa o seu negócio.",
  },
  {
    n: "02",
    icon: Rocket,
    title: "Landing Pages",
    text: "Uma única página construída com um objetivo: converter. Ideal para campanhas de anúncios, lançamentos e ofertas específicas, com estrutura pensada para transformar visitas em contactos.",
  },
  {
    n: "03",
    icon: RefreshCw,
    title: "Redesign",
    text: "Modernização de um site que já existe. Mantemos o que funciona, corrigimos o que trava resultados e atualizamos design, velocidade e estrutura para os padrões atuais.",
  },
  {
    n: "04",
    icon: LayoutGrid,
    title: "Estrutura e conteúdo",
    text: "Definição de quais páginas o site precisa, o que entra em cada uma, a ordem das seções e onde ficam as chamadas para ação. É o esqueleto e o texto que guiam o visitante até o contacto.",
  },
  {
    n: "05",
    icon: Plug,
    title: "Formulários e integrações",
    text: "Formulário de contacto e orçamento ligado às ferramentas que você já usa: WhatsApp, e-mail, Google Maps, planilhas e CRM. Cada contacto do site chega direto onde a sua equipa trabalha.",
  },
  {
    n: "06",
    icon: LifeBuoy,
    title: "Acompanhamento",
    text: "Suporte depois da publicação: pequenos ajustes, troca de conteúdo e melhorias ao longo do tempo, conforme o negócio evolui — sem precisar refazer o site do zero.",
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  return (
    <section id="servicos" className="relative border-t border-line-soft py-28 sm:py-36">
      <div className="container-edge">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Serviços</Eyebrow>
            <RevealText
              as="h2"
              lines={["Uma solução digital", "completa."]}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
            />
          </div>
          <FadeIn delay={0.2}>
            <p className="max-w-xs text-balance leading-relaxed text-mist">
              Escolha o ponto de partida. Nós tratamos da estrutura para
              transformar a ideia em um site profissional.
            </p>
          </FadeIn>
        </div>

        {/* Desktop: interactive split list */}
        <div className="mt-20 hidden gap-16 lg:grid lg:grid-cols-[1.1fr_1fr]">
          <ul className="border-t border-line-soft">
            {SERVICES.map((s, i) => (
              <li key={s.n} className="border-b border-line-soft">
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex w-full items-center gap-6 py-6 text-left"
                  data-cursor-hover
                >
                  <span
                    className={cn(
                      "font-display text-2xl font-bold tracking-tight transition-colors duration-300",
                      active === i ? "text-signal" : "text-mist-dim/50"
                    )}
                  >
                    {s.n}
                  </span>
                  <span
                    className={cn(
                      "font-display text-2xl font-bold tracking-tight transition-all duration-300",
                      active === i
                        ? "translate-x-2 text-bone"
                        : "text-mist-dim"
                    )}
                  >
                    {s.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-10">
            <AnimatePresence mode="wait">
              {SERVICES.map(
                (s, i) =>
                  active === i && (
                    <motion.div
                      key={s.n}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex size-14 items-center justify-center rounded-2xl border border-signal/25 bg-signal/10">
                        <s.icon className="size-6 text-signal" strokeWidth={1.5} />
                      </div>
                      <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-bone">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-sm leading-relaxed text-mist">{s.text}</p>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet: accordion */}
        <div className="mt-14 divide-y divide-line-soft border-t border-line-soft lg:hidden">
          {SERVICES.map((s, i) => {
            const open = openMobile === i;
            return (
              <div key={s.n}>
                <button
                  onClick={() => setOpenMobile(open ? null : i)}
                  className="flex w-full items-center gap-4 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="font-display text-lg font-bold text-mist-dim/60">
                    {s.n}
                  </span>
                  <span className="flex-1 font-display text-lg font-bold tracking-tight text-bone">
                    {s.title}
                  </span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-mist transition-transform duration-300",
                      open && "rotate-45 text-signal"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-11 pr-4 leading-relaxed text-mist">{s.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
