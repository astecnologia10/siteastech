import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { LightTrail } from "@/components/LightTrail";
import { RevealText } from "@/components/RevealText";
import { waLink, WA_MESSAGES } from "@/lib/whatsapp";

export function FinalCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="contato"
      className="relative overflow-hidden border-t border-line-soft py-32 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/[0.12] blur-[110px]"
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <LightTrail flip className="inset-x-0 top-0 h-[70%] w-full opacity-60" />
      </div>

      <div className="container-edge relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        <div>
          <RevealText
            as="h2"
            lines={["Pronto para conectar", "seu negócio ao mundo?"]}
            className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-bone sm:text-7xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="mt-9 max-w-xl text-balance text-lg leading-relaxed text-mist"
          >
            Fale com a AS Tech hoje e descubra como a Inteligência Artificial
            pode transformar a sua presença digital em poucos dias.
            Tecnologia que conecta pessoas, negócios e oportunidades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-10 space-y-5"
          >
            <a
              href="mailto:astecnologia.10@gmail.com"
              className="group flex items-center gap-4"
              data-cursor-hover
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-mist transition-colors duration-300 group-hover:border-signal group-hover:text-signal">
                <Mail className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.14em] text-mist-dim">
                  E-mail
                </span>
                <span className="text-sm text-bone-dim transition-colors duration-300 group-hover:text-bone">
                  astecnologia.10@gmail.com
                </span>
              </span>
            </a>

            <a
              href={waLink(WA_MESSAGES.falarComEquipe)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4"
              data-cursor-hover
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-mist transition-colors duration-300 group-hover:border-signal group-hover:text-signal">
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.14em] text-mist-dim">
                  WhatsApp
                </span>
                <span className="text-sm text-bone-dim transition-colors duration-300 group-hover:text-bone">
                  Atendimento rápido e personalizado
                </span>
              </span>
            </a>
          </motion.div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
