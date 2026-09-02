import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-mist",
        className
      )}
    >
      <span className="h-px w-6 bg-signal" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
