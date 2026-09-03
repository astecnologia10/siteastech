import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import logoMobility from "@/assets/partner-mobility.png";
import logoVirtuagil from "@/assets/partner-virtuagil.png";

// Para adicionar a logo de um parceiro:
// 1. coloque o arquivo em src/assets/ (ex.: parceiro-x.png)
// 2. importe no topo: import parceiroX from "@/assets/parceiro-x.png";
// 3. adicione `logo: parceiroX` no objeto do parceiro abaixo
type Partner = {
  name: string;
  category: string;
  text: string;
  href?: string;
  logo?: string;
};

const PARTNERS: Partner[] = [
  {
    name: "Grupo Mobility",
    category: "Gestão & Assessoria Empresarial",
    text: "Soluções completas para locadoras de veículos: contabilidade especializada, consultoria tributária, assessoria jurídica, BPO financeiro e RH.",
    href: "https://www.grupomobility.com.br/",
    logo: logoMobility,
  },
  {
    name: "Virtuágil",
    category: "IoT & Automação Comercial",
    text: "Monitoramento inteligente de equipamentos: temperatura, energia, gases e acionamentos remotos, para reduzir custos e dar controle às operações.",
    href: "https://virtuagil.com.br/",
    logo: logoVirtuagil,
  },
];

function monogram(name: string) {
  const words = name.split(" ").filter((w) => w.length > 2);
  const letters =
    words.length > 1
      ? words.map((w) => w[0]).slice(0, 2).join("")
      : name.replace(/[^a-zA-ZÀ-ÿ]/g, "").slice(0, 2);
  return letters.toUpperCase();
}

export function Partners() {
  return (
    <section id="parceiros" className="relative border-t border-line-soft py-28 sm:py-36">
      <div className="container-edge">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Parceiros</Eyebrow>
          <RevealText
            as="h2"
            lines={["Não trabalhamos", "sozinhos."]}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl"
          />
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-7 max-w-md text-balance leading-relaxed text-mist">
              A AS Tech se conecta a empresas parceiras de tecnologia, gestão e
              automação para entregar aos clientes uma solução que vai além do
              site.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {PARTNERS.map((p, i) => {
            const linkProps = p.href
              ? { href: p.href, target: "_blank" as const, rel: "noreferrer", "data-cursor-hover": true }
              : {};
            const CardTag = p.href ? "a" : "div";
            return (
              <FadeIn key={p.name + i} delay={i * 0.08} y={24}>
                <CardTag
                  {...linkProps}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-signal/40 hover:bg-surface-2"
                >
                  <div className="flex items-center gap-4">
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt={p.name}
                        className="h-11 w-11 shrink-0 rounded-2xl object-contain"
                      />
                    ) : (
                      <span
                        className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-signal/25 bg-signal/10 font-display text-sm font-bold text-signal"
                        aria-hidden="true"
                      >
                        {monogram(p.name)}
                      </span>
                    )}
                    <div>
                      <p className="font-display text-base font-bold tracking-tight text-bone">
                        {p.name}
                      </p>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-signal-bright">
                        {p.category}
                      </p>
                    </div>
                    {p.href && (
                      <ArrowUpRight className="ml-auto size-4 shrink-0 text-mist-dim transition-colors duration-300 group-hover:text-signal" />
                    )}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-mist">{p.text}</p>
                </CardTag>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-14 flex flex-col items-center gap-4 border-t border-line-soft pt-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="max-w-md text-sm leading-relaxed text-mist-dim">
              Sua empresa quer ser parceira da AS Tech? Vamos conversar sobre
              como crescer junto.
            </p>
            <a
              href="#contato"
              data-cursor-hover
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-signal/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-signal-bright transition-colors duration-300 hover:bg-signal/10"
            >
              Seja parceiro
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
