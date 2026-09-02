export const WHATSAPP_NUMBER = "5531995266449";

/** Monta um link do WhatsApp com mensagem pronta (pré-preenchida). */
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensagens padrão por ponto de contato do site. */
export const WA_MESSAGES = {
  geral: "Olá! Vim pelo site da AS Tech e gostaria de conversar sobre um projeto.",
  falarComEquipe: "Olá! Vim pelo site da AS Tech e gostaria de falar com a equipe.",
  analiseGratuita:
    "Olá! Vim pelo site da AS Tech e quero solicitar a análise gratuita do meu negócio.",
} as const;

export interface ContactFields {
  nome: string;
  email: string;
  telefone?: string;
  assunto: string;
  mensagem: string;
}

/** Monta a mensagem do formulário de contato para envio via WhatsApp. */
export function contactWaLink(fields: ContactFields) {
  const linhas = [
    "Olá! Vim pelo site da AS Tech.",
    "",
    `*Nome:* ${fields.nome}`,
    `*E-mail:* ${fields.email}`,
  ];

  if (fields.telefone?.trim()) {
    linhas.push(`*Telefone:* ${fields.telefone}`);
  }

  linhas.push(`*Assunto:* ${fields.assunto}`, "", fields.mensagem);

  return waLink(linhas.join("\n"));
}
