import { useEffect } from "react";
import { motion } from "framer-motion";
import { BriefingForm } from "@/components/BriefingForm";
import { RevealText } from "@/components/RevealText";
import logo from "@/assets/logo.svg";

export function BriefingPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Briefing de Projeto | AS Tech";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="min-h-dvh bg-ink">
      <header className="container-edge flex items-center justify-between py-6">
        <a href="/" aria-label="AS Tech">
          <img src={logo} alt="AS Tech" className="h-9 w-auto sm:h-10" />
        </a>
        <a
          href="https://wa.me/5531995266449"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-bone-dim transition-colors hover:text-bone"
        >
          Falar no WhatsApp
        </a>
      </header>

      <main className="container-edge mx-auto max-w-3xl pb-24 pt-8 sm:pt-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-signal-bright">
          Briefing do projeto
        </span>

        <RevealText
          as="h1"
          lines={["Conte para a AS Tech", "sobre o seu projeto."]}
          className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-6 max-w-xl text-balance leading-relaxed text-mist"
        >
          Leva cerca de 5 minutos. Quanto mais detalhes você trouxer, mais precisa
          e rápida será a nossa proposta. Ao final, o briefing é enviado direto
          para a nossa equipe.
        </motion.p>

        <div className="mt-12">
          <BriefingForm />
        </div>
      </main>

      <footer className="container-edge border-t border-line-soft py-8 text-xs text-mist-dim">
        AS Tech © 2026. Tecnologia que conecta.
      </footer>
    </div>
  );
}
