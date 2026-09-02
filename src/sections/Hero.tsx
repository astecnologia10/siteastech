import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { LightTrail } from "@/components/LightTrail";
import { HeroVisual } from "@/sections/HeroVisual";

export function Hero() {
  return (
    <section
      id="inicio"
      className="grain relative flex min-h-dvh items-center overflow-hidden pt-32 pb-20 sm:pt-40"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in oklab, var(--color-signal) 8%, transparent), transparent)",
        }}
        aria-hidden="true"
      />
      <LightTrail className="inset-x-0 bottom-0 h-[55%] w-full opacity-70 sm:h-[65%]" />

      <div className="container-edge relative grid w-full items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <Eyebrow>Criação de sites institucionais com Inteligência Artificial</Eyebrow>

          <h1 className="mt-7 font-display text-[13vw] font-extrabold leading-[1.2] tracking-tight text-bone sm:text-6xl lg:text-6xl xl:text-[4.5rem]">
            <span className="block overflow-hidden pb-[0.18em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                Uma presença digital
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.18em]">
              <motion.span
                className="block text-mist"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              >
                à altura do seu negócio.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="mt-8 max-w-md text-balance text-lg leading-relaxed text-bone-dim"
          >
            Rápido, inteligente e acessível — a presença digital que o seu
            negócio precisa, pronta em dias.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <Button href="#contato" variant="primary" withArrow>
              Vamos construir?
            </Button>
            <Button href="#solucoes" variant="ghost">
              Conheça nossas soluções
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-2 text-mist-dim">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-mist-dim to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
