import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const REVIEWS = [
  {
    quote:
      "A AS Tech entregou um site muito acima do que esperávamos. O processo foi transparente do início ao fim e o resultado elevou a forma como nossos clientes nos veem.",
    name: "Marina Ferreira",
    role: "Diretora, Studio Alma",
  },
  {
    quote:
      "Comunicação direta, prazos cumpridos e um site rápido, bonito e fácil de administrar. Exatamente o que uma empresa em crescimento precisa.",
    name: "Rafael Souza",
    role: "Fundador, Grão Café Especial",
  },
  {
    quote:
      "Sentimos que o projeto foi pensado para o nosso negócio, não um modelo genérico. O aumento em contatos pelo site foi imediato.",
    name: "Camila Duarte",
    role: "Sócia, Duarte Advocacia",
  },
  {
    quote:
      "Equipe atenta a cada detalhe. Da estrutura ao design, tudo foi construído com estratégia — não é só um site bonito, é uma ferramenta que funciona.",
    name: "Lucas Andrade",
    role: "CEO, Andrade Engenharia",
  },
];

const RATING_LABELS = ["", "Ruim", "Regular", "Bom", "Ótimo", "Excelente"];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ size = "size-4" }: { size?: string }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(size, "fill-signal text-signal")} strokeWidth={0} />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  active = true,
}: {
  review: (typeof REVIEWS)[number];
  active?: boolean;
}) {
  return (
    <figure
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-400",
        active ? "border-line bg-surface" : "border-line-soft bg-surface/40 opacity-50"
      )}
    >
      <Stars />
      <blockquote className="mt-5 flex-1 text-balance leading-relaxed text-bone-dim">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-signal"
          aria-hidden="true"
        >
          {initials(review.name)}
        </span>
        <div>
          <p className="font-display text-sm font-bold tracking-tight text-bone">
            {review.name}
          </p>
          <p className="text-xs text-mist-dim">{review.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const len = REVIEWS.length;

  const prev = () => setIndex((i) => (i - 1 + len) % len);
  const next = () => setIndex((i) => (i + 1) % len);

  const triplet = [REVIEWS[(index - 1 + len) % len], REVIEWS[index], REVIEWS[(index + 1) % len]];

  return (
    <>
      <div className="mt-16 hidden gap-6 sm:grid sm:grid-cols-3">
        {triplet.map((r, i) => (
          <ReviewCard key={r.name + i} review={r} active={i === 1} />
        ))}
      </div>

      <div className="mt-16 sm:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <ReviewCard review={REVIEWS[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          data-cursor-hover
          aria-label="Depoimento anterior"
          className="flex size-11 items-center justify-center rounded-full border border-line text-mist transition-all duration-300 hover:border-bone-dim hover:text-bone"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} />
        </button>
        <span className="text-[11px] tracking-[0.3em] text-mist-dim">
          {String(index + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={next}
          data-cursor-hover
          aria-label="Próximo depoimento"
          className="flex size-11 items-center justify-center rounded-full border border-line text-mist transition-all duration-300 hover:border-bone-dim hover:text-bone"
        >
          <ArrowRight className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </>
  );
}

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const shown = hover || rating;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating || !name.trim() || !message.trim()) return;
    const text = `${"⭐".repeat(rating)}\n\n*Avaliação de ${name.trim()}*\n\n"${message.trim()}"`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  }

  function reset() {
    setRating(0);
    setHover(0);
    setName("");
    setMessage("");
    setSubmitted(false);
  }

  return (
    <div className="relative mx-auto mt-6 max-w-xl rounded-3xl border border-line bg-surface p-8 sm:p-10">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-8 text-center"
          >
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-signal/40">
              <Check className="size-7 text-signal" strokeWidth={1.5} />
            </div>
            <p className="font-display text-xl font-bold tracking-tight text-bone">
              Obrigado pela avaliação!
            </p>
            <p className="mt-2 text-sm text-mist">Sua opinião é muito importante para nós.</p>
            <button
              type="button"
              onClick={reset}
              data-cursor-hover
              className="mt-8 rounded-full border border-signal/30 px-6 py-3 text-xs uppercase tracking-[0.3em] text-signal-bright transition-colors duration-300 hover:bg-signal/10"
            >
              Avaliar novamente
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-7"
          >
            <div>
              <label className="mb-4 block text-xs font-medium uppercase tracking-widest text-bone-dim">
                Classificação
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    data-cursor-hover
                    aria-label={`${n} estrelas`}
                    className="transition-transform duration-150 hover:scale-110"
                  >
                    <Star
                      className="size-7"
                      strokeWidth={1.5}
                      style={{ color: "var(--color-signal)" }}
                      fill={n <= shown ? "var(--color-signal)" : "none"}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm font-medium text-signal-bright">
                    {RATING_LABELS[rating]}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="review-name" className="mb-3 block text-xs font-medium uppercase tracking-widest text-bone-dim">
                Seu nome
              </label>
              <input
                id="review-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                required
                className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-bone placeholder-mist-dim outline-none transition-colors duration-300 focus:border-signal"
              />
            </div>

            <div>
              <label htmlFor="review-message" className="mb-3 block text-xs font-medium uppercase tracking-widest text-bone-dim">
                Sua avaliação
              </label>
              <textarea
                id="review-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Conte como foi sua experiência..."
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-bone placeholder-mist-dim outline-none transition-colors duration-300 focus:border-signal"
              />
            </div>

            <button
              type="submit"
              disabled={!rating || !name.trim() || !message.trim()}
              data-cursor-hover
              className="w-full rounded-full bg-bone py-4 text-sm font-medium uppercase tracking-widest text-ink transition-all duration-300 hover:bg-signal disabled:cursor-not-allowed disabled:opacity-40"
            >
              Enviar avaliação via WhatsApp
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Testimonials() {
  return (
    <>
      <section id="avaliacoes" className="relative border-t border-line-soft py-28 sm:py-36">
        <div className="container-edge">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Avaliações</Eyebrow>
            <RevealText
              as="h2"
              lines={["Quem trabalhou com a gente", "conta como foi."]}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
            />
            <FadeIn delay={0.15}>
              <p className="mx-auto mt-7 max-w-md text-balance leading-relaxed text-mist">
                Depoimentos de empresas que confiaram na AS Tech para construir
                sua presença digital.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <TestimonialsCarousel />
          </FadeIn>
        </div>
      </section>

      <section className="relative border-t border-line-soft py-28 sm:py-36">
        <div className="container-edge">
          <div className="mx-auto max-w-xl text-center">
            <Eyebrow className="justify-center">Sua opinião importa</Eyebrow>
            <RevealText
              as="h2"
              lines={["Deixe sua avaliação."]}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
            />
            <FadeIn delay={0.15}>
              <p className="mx-auto mt-7 max-w-md text-balance leading-relaxed text-mist">
                Conte como foi sua experiência com a AS Tech.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <ReviewForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
