import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { contactWaLink, type ContactFields } from "@/lib/whatsapp";

const ASSUNTOS = [
  "Criar um site",
  "Solicitar orçamento",
  "Análise gratuita do meu negócio",
  "Automação / Inteligência Artificial",
  "Dúvida sobre os planos",
  "Outro assunto",
];

type Errors = Partial<Record<keyof ContactFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClasses =
  "w-full rounded-xl border border-line bg-ink/40 px-4 py-3 text-sm text-bone placeholder:text-mist-dim transition-colors duration-300 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/40";

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function update<K extends keyof ContactFields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!fields.nome.trim()) next.nome = "Informe o seu nome.";
    if (!fields.email.trim()) next.email = "Informe o seu e-mail.";
    else if (!EMAIL_RE.test(fields.email.trim())) next.email = "E-mail inválido.";
    if (!fields.assunto) next.assunto = "Selecione um assunto.";
    if (!fields.mensagem.trim()) next.mensagem = "Escreva a sua mensagem.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    window.open(contactWaLink(fields), "_blank", "noopener,noreferrer");
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-signal/30 bg-charcoal p-8 sm:p-10"
    >
      <div
        className="pointer-events-none absolute -right-14 -top-14 size-56 rounded-full bg-signal/20 blur-[70px]"
        aria-hidden="true"
      />

      <div className="relative space-y-5">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-bone">
            Envie a sua mensagem
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Preencha os campos abaixo. Ao enviar, abrimos o WhatsApp da AS Tech
            com a sua mensagem pronta.
          </p>
        </div>

        <Field label="Nome" htmlFor="nome" error={errors.nome}>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            value={fields.nome}
            onChange={(e) => update("nome", e.target.value)}
            className={cn(fieldClasses, errors.nome && "border-red-400/70")}
            placeholder="Como podemos te chamar?"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="E-mail" htmlFor="email" error={errors.email}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={(e) => update("email", e.target.value)}
              className={cn(fieldClasses, errors.email && "border-red-400/70")}
              placeholder="voce@email.com"
            />
          </Field>

          <Field label="Telefone / WhatsApp" htmlFor="telefone" optional>
            <input
              id="telefone"
              type="tel"
              autoComplete="tel"
              value={fields.telefone}
              onChange={(e) => update("telefone", e.target.value)}
              className={fieldClasses}
              placeholder="(00) 00000-0000"
            />
          </Field>
        </div>

        <Field label="Assunto" htmlFor="assunto" error={errors.assunto}>
          <div className="relative">
            <select
              id="assunto"
              value={fields.assunto}
              onChange={(e) => update("assunto", e.target.value)}
              className={cn(
                fieldClasses,
                "appearance-none pr-10",
                !fields.assunto && "text-mist-dim",
                errors.assunto && "border-red-400/70"
              )}
            >
              <option value="" disabled>
                Selecione o assunto
              </option>
              {ASSUNTOS.map((a) => (
                <option key={a} value={a} className="text-ink">
                  {a}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-mist"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        </Field>

        <Field label="Mensagem" htmlFor="mensagem" error={errors.mensagem}>
          <textarea
            id="mensagem"
            rows={4}
            value={fields.mensagem}
            onChange={(e) => update("mensagem", e.target.value)}
            className={cn(fieldClasses, "resize-none", errors.mensagem && "border-red-400/70")}
            placeholder="Conte um pouco sobre o que você precisa."
          />
        </Field>

        <Button type="submit" variant="primary" withArrow className="w-full">
          Enviar pelo WhatsApp
        </Button>
      </div>
    </motion.form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-mist"
      >
        {label}
        {optional && <span className="text-[10px] normal-case tracking-normal text-mist-dim">(opcional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
