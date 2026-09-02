import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  as?: "h1" | "h2" | "h3" | "p";
  lines: string[];
  className?: string;
  delay?: number;
  once?: boolean;
}

/** Reveals text line-by-line with a mask + upward slide as it enters the viewport. */
export function RevealText({
  as: Tag = "h2",
  lines,
  className,
  delay = 0,
  once = true,
}: RevealTextProps) {
  return (
    <Tag className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.09,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
