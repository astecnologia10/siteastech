import { MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import { waLink, WA_MESSAGES } from "@/lib/whatsapp";
import logo from "@/assets/logo.svg";

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

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/astech.lab/", icon: InstagramIcon },
  { label: "WhatsApp", href: waLink(WA_MESSAGES.geral), icon: MessageCircle },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line-soft bg-charcoal">
      <div className="container-edge grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div className="inline-flex flex-col items-center sm:-translate-x-10">
          <div className="relative flex items-center justify-center">
            <img src={logo} alt="AS Tech" className="relative h-14 w-auto -translate-x-3 sm:h-20" />
          </div>
          <a
            href="mailto:astecnologia.10@gmail.com"
            className="mt-5 text-sm text-mist transition-colors hover:text-bone"
          >
            astecnologia.10@gmail.com
          </a>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-mist-dim">
            Navegação
          </p>
          <ul className="mt-5 space-y-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-mist-dim">
            Conecte-se
          </p>
          <ul className="mt-5 space-y-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  <s.icon className="size-4" aria-hidden="true" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-edge flex flex-col gap-3 border-t border-line-soft py-6 text-xs text-mist-dim sm:flex-row sm:items-center sm:justify-between">
        <p>AS Tech © 2026. Todos os direitos reservados.</p>
        <p>Design + Tecnologia + Estratégia</p>
      </div>
    </footer>
  );
}
