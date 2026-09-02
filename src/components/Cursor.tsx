import { useEffect, useRef, useState } from "react";

/**
 * Extremely discreet custom cursor for desktop/fine-pointer devices only.
 * A small dot with a soft trailing ring; grows subtly over interactive elements.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(fine.matches && !reduced.matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("custom-cursor");

    const ring = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      ring.x = e.clientX;
      ring.y = e.clientY;
    };

    const loop = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/30 transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          opacity: hovering ? 0.9 : 0.4,
          willChange: "transform",
        }}
      />
    </div>
  );
}
