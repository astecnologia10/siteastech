import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { useScrolled } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-navbar.svg";

const LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Diferenciais", href: "#por-que" },
  { label: "Parceiros", href: "#parceiros" },
  { label: "Planos", href: "#planos" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  // Trava o scroll da página enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-all duration-500",
          scrolled
            ? "bg-ink/70 opacity-100 backdrop-blur-xl border-b border-line-soft"
            : "opacity-0"
        )}
      />

      <div className="container-edge relative flex items-center justify-between">
        <a href="#inicio" className="block" aria-label="AS Tech" data-cursor-hover>
          <img src={logo} alt="AS Tech" className="h-8 w-auto sm:h-10" />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-bone-dim transition-colors duration-300 hover:text-bone"
              data-cursor-hover
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contato" variant="secondary" className="!py-2.5 !px-5 text-[13px]">
            Falar com a AS Tech
          </Button>
        </div>

        <button
          className="relative z-10 text-bone lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-100%)] overflow-y-auto overscroll-contain border-t border-line-soft bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-edge flex flex-col gap-1 py-6">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3, ease: "easeOut" }}
                  className="border-b border-line-soft py-4 text-base font-medium text-bone-dim active:text-bone"
                >
                  {link.label}
                </motion.a>
              ))}
              <Button href="#contato" variant="primary" className="mt-6 w-full">
                Falar com a AS Tech
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
