import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LightTrailProps {
  className?: string;
  flip?: boolean;
}

/**
 * Decorative wavy light-trail — echoes the electric-blue arcs used
 * throughout the AS Tech pitch deck as an ambient background motif.
 */
export function LightTrail({ className, flip = false }: LightTrailProps) {
  const uid = useId();
  const reducedMotion = useReducedMotion();
  const gradId = `lt-grad-${uid}`;
  const blurId = `lt-blur-${uid}`;
  const pathA = "M-80,420 C220,390 300,190 620,160 C880,140 980,40 1280,-40";
  const pathB = "M-80,480 C260,460 360,310 660,280 C910,255 1010,150 1290,60";

  return (
    <div
      className={cn("pointer-events-none absolute", className)}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        className={cn("h-full w-full", flip && "-scale-x-100")}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0" />
            <stop offset="55%" stopColor="var(--color-signal)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--color-signal-bright)" stopOpacity="1" />
          </linearGradient>
          <filter id={blurId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <g filter={`url(#${blurId})`} opacity="0.6">
          <path d={pathA} stroke={`url(#${gradId})`} strokeWidth="10" fill="none" strokeLinecap="round" />
        </g>
        <path d={pathA} stroke={`url(#${gradId})`} strokeWidth="2" fill="none" strokeLinecap="round" />

        <g filter={`url(#${blurId})`} opacity="0.35">
          <path d={pathB} stroke={`url(#${gradId})`} strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
        <path d={pathB} stroke={`url(#${gradId})`} strokeWidth="1.25" fill="none" strokeLinecap="round" opacity="0.75" />

        {!reducedMotion && (
          <path
            d={pathA}
            stroke="var(--color-signal-bright)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="40 900"
            opacity="0.9"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-940"
              dur="9s"
              repeatCount="indefinite"
            />
          </path>
        )}
      </motion.svg>
    </div>
  );
}
