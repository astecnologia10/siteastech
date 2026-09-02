import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Statement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const line1Opacity = useTransform(scrollYProgress, [0, 0.16, 0.34, 0.44], [0, 1, 1, 0]);
  const line1Y = useTransform(scrollYProgress, [0, 0.44], [24, -70]);
  const line1Scale = useTransform(scrollYProgress, [0.34, 0.44], [1, 0.88]);

  const line2Opacity = useTransform(scrollYProgress, [0.58, 0.82, 1], [0, 1, 1]);
  const line2Y = useTransform(scrollYProgress, [0.58, 0.98], [240, 200]);

  return (
    <section ref={sectionRef} className="relative h-[155vh] border-t border-line-soft">
      <div className="grain sticky top-0 flex h-dvh items-center justify-center overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--color-signal) 6%, transparent), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="container-edge relative text-center">
          <motion.p
            style={{ opacity: line1Opacity, y: line1Y, scale: line1Scale }}
            className="absolute inset-x-0 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-mist sm:text-6xl lg:text-7xl"
          >
            Seu site não precisa apenas existir.
          </motion.p>

          <motion.p
            style={{ opacity: line2Opacity, y: line2Y }}
            className="text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-bone sm:text-6xl lg:text-7xl"
          >
            Ele precisa representar{" "}
            <span className="text-signal">o tamanho do seu negócio.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
