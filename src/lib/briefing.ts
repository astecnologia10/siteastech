import { waLink } from "@/lib/whatsapp";

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "tel"
  | "url"
  | "select"
  | "radio"
  | "checkbox";

export interface BriefingField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
  /** Ocupa metade da largura em telas médias/grandes. */
  half?: boolean;
}

export interface BriefingStep {
  title: string;
  subtitle?: string;
  emoji: string;
  fields: BriefingField[];
}

export const BRIEFING_STEPS: BriefingStep[] = [
  {
    title: "Contato",
    subtitle: "Vamos começar pelo básico.",
    emoji: "👤",
    fields: [
      { id: "nome", label: "Seu nome", type: "text", required: true, half: true, placeholder: "Nome completo" },
      { id: "empresa", label: "Empresa / negócio", type: "text", half: true, placeholder: "Nome da empresa" },
      { id: "email", label: "E-mail", type: "email", required: true, half: true, placeholder: "voce@email.com" },
      { id: "telefone", label: "Telefone / WhatsApp", type: "tel", required: true, half: true, placeholder: "(00) 00000-0000" },
      { id: "segmento", label: "Segmento / ramo de atividade", type: "text", required: true, placeholder: "Ex.: clínica odontológica, escritório de advocacia, loja de roupas" },
      { id: "presenca_atual", label: "Já tem site ou redes sociais?", type: "textarea", placeholder: "Cole aqui os links do site atual, Instagram, etc.", help: "Se ainda não tem nada, é só deixar em branco." },
    ],
  },
  {
    title: "O projeto",
    subtitle: "O que você precisa que a gente construa.",
    emoji: "🎯",
    fields: [
      {
        id: "tipo",
        label: "Que tipo de projeto é?",
        type: "radio",
        required: true,
        options: [
          "Landing page (1 página)",
          "Site institucional (várias páginas)",
          "Sistema / plataforma web",
          "Automação / Inteligência Artificial",
          "Ainda não sei",
        ],
      },
      {
        id: "objetivos",
        label: "Qual o objetivo principal? (pode marcar mais de um)",
        type: "checkbox",
        required: true,
        options: [
          "Gerar contatos / leads",
          "Vender online",
          "Apresentar a empresa / portfólio",
          "Agendar consultas ou serviços",
          "Automatizar o atendimento",
          "Ganhar autoridade e aparecer no Google",
          "Outro",
        ],
      },
      { id: "publico", label: "Quem é o público-alvo?", type: "textarea", required: true, placeholder: "Descreva o cliente ideal: idade, região, o que procura, como decide a compra." },
      { id: "paginas", label: "Quais páginas ou seções o site deve ter?", type: "textarea", placeholder: "Ex.: Home, Sobre, Serviços, Planos, Contato" },
      {
        id: "funcionalidades",
        label: "Precisa de alguma funcionalidade específica?",
        type: "checkbox",
        options: [
          "Formulário de contato",
          "Integração com WhatsApp",
          "Área do cliente / login",
          "Agendamento online",
          "Chat / chatbot",
          "Site em mais de um idioma",
          "Não sei ainda",
        ],
      },
      { id: "concorrentes", label: "Cite 2 ou 3 concorrentes ou referências do seu mercado", type: "textarea", placeholder: "Nomes ou links. O que eles fazem bem? O que falta neles?" },
      { id: "referencias", label: "Sites que você acha bonitos ou funcionais", type: "textarea", placeholder: "Cole links de sites que você gosta e diga o que te agrada neles (visual, textos, organização...)." },
    ],
  },
  {
    title: "Marca & conteúdo",
    subtitle: "O que você já tem em mãos.",
    emoji: "🎨",
    fields: [
      {
        id: "identidade",
        label: "Você já tem identidade visual?",
        type: "radio",
        required: true,
        options: [
          "Tenho logo + identidade completa (cores e fontes definidas)",
          "Tenho só a logo",
          "Não tenho nada — preciso de ajuda com isso",
        ],
      },
      {
        id: "materiais",
        label: "Quais materiais você já tem prontos?",
        type: "checkbox",
        options: [
          "Logo em alta qualidade",
          "Textos / descrições",
          "Fotos próprias",
          "Vídeos",
          "Catálogo ou lista de produtos",
          "Depoimentos de clientes",
          "Nada ainda",
        ],
      },
      { id: "tom", label: "Que sensação o site deve passar?", type: "text", placeholder: "Ex.: moderno, confiável, sofisticado, acolhedor, tecnológico" },
      {
        id: "dominio",
        label: "Sobre o domínio (o endereço www)",
        type: "radio",
        options: [
          "Já tenho um domínio registrado",
          "Preciso registrar um domínio",
          "Não sei o que é isso",
        ],
      },
    ],
  },
  {
    title: "Prazo & investimento",
    subtitle: "Para alinharmos expectativas.",
    emoji: "📅",
    fields: [
      {
        id: "prazo",
        label: "Qual o prazo ideal para o site estar no ar?",
        type: "radio",
        required: true,
        options: ["O quanto antes", "Em até 1 mês", "De 1 a 3 meses", "Sem data definida"],
      },
      { id: "data_limite", label: "Existe alguma data limite?", type: "text", placeholder: "Ex.: lançamento, evento, campanha, feira do dia XX/XX" },
      {
        id: "orcamento",
        label: "Qual faixa de investimento você tem em mente?",
        type: "radio",
        required: true,
        options: [
          "Até R$ 1.000",
          "R$ 1.000 a R$ 3.000",
          "R$ 3.000 a R$ 6.000",
          "R$ 6.000 a R$ 12.000",
          "Acima de R$ 12.000",
          "Preciso de orientação sobre isso",
        ],
      },
      {
        id: "manutencao",
        label: "Depois de pronto, como pretende cuidar do site?",
        type: "radio",
        options: [
          "Quero um plano de manutenção mensal com a AS Tech",
          "Prefiro cuidar por conta própria",
          "Ainda não sei",
        ],
      },
      { id: "observacoes", label: "Mais alguma coisa que devemos saber?", type: "textarea", placeholder: "Fique à vontade para contar qualquer detalhe importante sobre o projeto." },
      {
        id: "como_conheceu",
        label: "Como você conheceu a AS Tech?",
        type: "select",
        options: ["Indicação", "Instagram", "Google", "LinkedIn", "Já sou cliente", "Outro"],
      },
    ],
  },
];

export type BriefingValues = Record<string, string | string[]>;

function formatValue(value: string | string[]): string {
  if (Array.isArray(value)) return value.join(", ");
  return value;
}

/** Monta a mensagem do briefing completo para envio via WhatsApp. */
export function buildBriefingWaLink(values: BriefingValues) {
  const lines: string[] = ["📋 *BRIEFING DE PROJETO — AS Tech*", ""];

  for (const step of BRIEFING_STEPS) {
    const answered = step.fields.filter((f) => {
      const v = values[f.id];
      return Array.isArray(v) ? v.length > 0 : Boolean(v?.trim());
    });
    if (answered.length === 0) continue;

    lines.push(`${step.emoji} *${step.title.toUpperCase()}*`);
    for (const f of answered) {
      lines.push(`• ${f.label}: ${formatValue(values[f.id])}`);
    }
    lines.push("");
  }

  return waLink(lines.join("\n").trim());
}

/** URL do Web App do Google Apps Script (definida em .env como VITE_BRIEFING_ENDPOINT). */
export const BRIEFING_ENDPOINT: string = import.meta.env.VITE_BRIEFING_ENDPOINT ?? "";

export interface BriefingPayloadField {
  id: string;
  label: string;
  value: string;
}

/** Serializa todas as respostas (respondidas ou não) na ordem do formulário. */
export function buildBriefingPayload(values: BriefingValues, honeypot = "") {
  const fields: BriefingPayloadField[] = [];
  for (const step of BRIEFING_STEPS) {
    for (const f of step.fields) {
      fields.push({ id: f.id, label: f.label, value: formatValue(values[f.id] ?? "") });
    }
  }
  return { submittedAt: new Date().toISOString(), honeypot, fields };
}

/**
 * Envia o briefing para o Google Apps Script, que grava a linha na planilha
 * e dispara o e-mail para a AS Tech. Lança erro se o envio falhar.
 */
export async function submitBriefing(values: BriefingValues, honeypot = ""): Promise<void> {
  if (!BRIEFING_ENDPOINT) {
    throw new Error("Endpoint do briefing não configurado (VITE_BRIEFING_ENDPOINT).");
  }

  const res = await fetch(BRIEFING_ENDPOINT, {
    method: "POST",
    // text/plain evita o preflight de CORS do navegador com o Apps Script.
    body: JSON.stringify(buildBriefingPayload(values, honeypot)),
  });

  if (!res.ok) throw new Error(`Falha no envio (HTTP ${res.status}).`);

  const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (data && data.ok === false) {
    throw new Error(data.error || "O servidor recusou o envio.");
  }
}
