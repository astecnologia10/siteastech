import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { LightTrail } from "@/components/LightTrail";

const NAV_LINKS = ["Soluções", "Sobre", "Cases", "Contato"];

const TAGS = [
  { label: "+ Estratégia", text: "Planejamento focado em resultados" },
  { label: "+ Performance", text: "Sites rápidos e seguros" },
  { label: "+ Conversão", text: "Experiências que geram oportunidades" },
];

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  const laptopX = useTransform(mx, (v) => v * 0.5);
  const laptopY = useTransform(my, (v) => v * 0.5);
  const phoneX = useTransform(mx, (v) => v * 1.15);
  const phoneY = useTransform(my, (v) => v * 1.15);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px * 20);
    rawY.set(py * 20);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[560px] pb-10 pr-6 sm:pb-14 sm:pr-10"
    >
      <LightTrail className="-inset-x-16 -top-24 h-[160%] w-[150%]" />

      <div
        className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/[0.14] blur-[100px]"
        aria-hidden="true"
      />

      {/* Laptop */}
      <motion.div
        style={{ x: laptopX, y: laptopY }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative"
      >
        <div className="relative overflow-hidden rounded-2xl border border-line bg-charcoal shadow-2xl shadow-black/60">
          <div className="flex items-center gap-4 border-b border-line-soft px-5 py-3.5">
            <span className="font-display text-[13px] font-bold tracking-tight text-bone">
              AS TECH
            </span>
            <nav className="ml-auto hidden items-center gap-4 text-[10px] font-medium uppercase tracking-[0.12em] text-mist sm:flex">
              {NAV_LINKS.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </nav>
          </div>

          <div className="relative aspect-[16/11] overflow-hidden p-5 sm:p-7">
            <svg
              viewBox="0 0 400 220"
              className="pointer-events-none absolute -right-6 bottom-0 h-[80%] w-[65%] opacity-70"
              aria-hidden="true"
            >
              <path
                d="M20,220 C120,205 160,90 400,20"
                stroke="var(--color-signal)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>

            <p className="max-w-[13rem] text-balance font-display text-lg font-bold leading-snug tracking-tight text-bone sm:max-w-[14rem] sm:text-xl">
              Soluções digitais inteligentes para{" "}
              <span className="text-signal">impulsionar</span> seu negócio.
            </p>
            <p className="mt-3 max-w-[11rem] text-[11px] leading-relaxed text-mist sm:max-w-[12rem]">
              Sites profissionais, rápidos e otimizados para gerar resultados
              reais.
            </p>

            <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-x-5 gap-y-2 sm:inset-x-7 sm:bottom-7">
              {TAGS.map((t) => (
                <p
                  key={t.label}
                  className="text-[9px] font-bold uppercase tracking-[0.08em] text-signal-bright sm:text-[10px]"
                >
                  {t.label}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* base */}
        <div
          className="mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-xl bg-gradient-to-b from-surface-2 to-charcoal"
          aria-hidden="true"
        />
        <div className="mx-auto h-1 w-[68%] rounded-b-full bg-line" aria-hidden="true" />
      </motion.div>

      {/* Phone */}
      <motion.div
        style={{ x: phoneX, y: phoneY }}
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="absolute -bottom-2 right-0 w-[36%] min-w-[112px] overflow-hidden rounded-[1.4rem] border border-line bg-charcoal shadow-2xl shadow-black/60"
      >
        <div className="flex items-center justify-between px-3 pt-3">
          <span className="font-display text-[9px] font-bold tracking-tight text-bone">
            AS TECH
          </span>
          <span className="flex h-3 w-4 flex-col justify-between">
            <span className="h-px w-full bg-mist-dim" />
            <span className="h-px w-full bg-mist-dim" />
          </span>
        </div>
        <div className="px-3 pb-4 pt-3">
          <p className="text-[9px] font-bold leading-snug text-bone">
            Soluções digitais para{" "}
            <span className="text-signal">impulsionar</span> seu negócio.
          </p>
          <p className="mt-3 text-[7px] font-bold uppercase tracking-[0.08em] text-signal-bright">
            + Estratégia
          </p>
          <p className="mt-1.5 text-[7px] font-bold uppercase tracking-[0.08em] text-signal-bright">
            + Performance
          </p>
        </div>
      </motion.div>
    </div>
  );
}
