import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Check, ChevronDown, Loader2, Send } from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import {
  BRIEFING_STEPS,
  buildBriefingWaLink,
  submitBriefing,
  type BriefingField,
  type BriefingValues,
} from "@/lib/briefing";

type Status = "idle" | "sending" | "success" | "error";

const inputBase =
  "w-full rounded-xl border border-line bg-ink/40 px-4 py-3 text-sm text-bone placeholder:text-mist-dim transition-colors duration-300 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/40";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOTAL = BRIEFING_STEPS.length;

function isFilled(value: string | string[] | undefined) {
  return Array.isArray(value) ? value.length > 0 : Boolean(value?.trim());
}

export function BriefingForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<BriefingValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const isReview = step === TOTAL;
  const current = BRIEFING_STEPS[step];
  const progress = Math.round((step / TOTAL) * 100);

  function setValue(id: string, value: string | string[]) {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  }

  function toggleMulti(id: string, option: string) {
    const arr = Array.isArray(values[id]) ? (values[id] as string[]) : [];
    setValue(id, arr.includes(option) ? arr.filter((o) => o !== option) : [...arr, option]);
  }

  function validateStep(): boolean {
    if (isReview) return true;
    const next: Record<string, string> = {};
    for (const field of current.fields) {
      if (!field.required) continue;
      if (!isFilled(values[field.id])) {
        next[field.id] = "Campo obrigatório.";
      } else if (field.type === "email" && !EMAIL_RE.test(String(values[field.id]).trim())) {
        next[field.id] = "E-mail inválido.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, TOTAL));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitBriefing(values, honeypot);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro desconhecido.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-signal/30 bg-charcoal p-10 text-center"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-signal/15 text-signal">
          <Check className="size-7" strokeWidth={2} />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-bone">
          Briefing recebido!
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-mist">
          Suas respostas já chegaram para a equipe da AS Tech. Vamos analisar tudo
          e entrar em contato em breve com os próximos passos.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.14em] text-mist-dim">
          <span>
            {isReview ? "Revisão" : `Etapa ${step + 1} de ${TOTAL}`}
          </span>
          <span>{isReview ? "100" : progress}%</span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-signal"
            animate={{ width: `${isReview ? 100 : progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {isReview ? (
            <Review values={values} onEdit={setStep} />
          ) : (
            <div className="rounded-3xl border border-line bg-charcoal p-7 sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-signal-bright">
                {current.emoji} {current.title}
              </p>
              {current.subtitle && (
                <p className="mt-1.5 text-sm text-mist">{current.subtitle}</p>
              )}

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                {current.fields.map((field) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    value={values[field.id]}
                    error={errors[field.id]}
                    onText={(v) => setValue(field.id, v)}
                    onToggle={(opt) => toggleMulti(field.id, opt)}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Honeypot anti-spam (invisível para humanos) */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === "error" && (
        <div className="mt-6 rounded-2xl border border-red-400/40 bg-red-400/10 p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-red-300">
            <AlertCircle className="size-4" aria-hidden="true" />
            Não conseguimos enviar o briefing.
          </p>
          <p className="mt-1.5 text-xs text-red-300/80">{errorMsg}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={submit}
              className="rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-signal"
            >
              Tentar novamente
            </button>
            <a
              href={buildBriefingWaLink(values)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
            >
              Enviar pelo WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Navegação */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-bone-dim transition-colors hover:border-bone-dim hover:text-bone disabled:opacity-40"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar
          </button>
        ) : (
          <span />
        )}

        {isReview ? (
          <Button type="button" onClick={submit} variant="primary" disabled={status === "sending"}>
            <span className="inline-flex items-center gap-2">
              {status === "sending" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="size-4" aria-hidden="true" />
              )}
              {status === "sending" ? "Enviando…" : "Enviar briefing"}
            </span>
          </Button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-signal"
          >
            {step === TOTAL - 1 ? "Revisar" : "Avançar"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  error,
  onText,
  onToggle,
}: {
  field: BriefingField;
  value: string | string[] | undefined;
  error?: string;
  onText: (value: string) => void;
  onToggle: (option: string) => void;
}) {
  const wide = field.type === "textarea" || field.type === "radio" || field.type === "checkbox" || !field.half;
  const strValue = typeof value === "string" ? value : "";
  const arrValue = Array.isArray(value) ? value : [];

  return (
    <div className={cn(wide && "sm:col-span-2")}>
      <label
        htmlFor={field.id}
        className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium text-bone-dim"
      >
        {field.label}
        {field.required && <span className="text-signal">*</span>}
      </label>
      {field.help && <p className="mb-2 -mt-1 text-xs text-mist-dim">{field.help}</p>}

      {field.type === "textarea" && (
        <textarea
          id={field.id}
          rows={3}
          value={strValue}
          onChange={(e) => onText(e.target.value)}
          placeholder={field.placeholder}
          className={cn(inputBase, "resize-none", error && "border-red-400/70")}
        />
      )}

      {(field.type === "text" ||
        field.type === "email" ||
        field.type === "tel" ||
        field.type === "url") && (
        <input
          id={field.id}
          type={field.type === "url" ? "text" : field.type}
          value={strValue}
          onChange={(e) => onText(e.target.value)}
          placeholder={field.placeholder}
          className={cn(inputBase, error && "border-red-400/70")}
        />
      )}

      {field.type === "select" && (
        <div className="relative">
          <select
            id={field.id}
            value={strValue}
            onChange={(e) => onText(e.target.value)}
            className={cn(inputBase, "appearance-none pr-10", !strValue && "text-mist-dim", error && "border-red-400/70")}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {field.options?.map((o) => (
              <option key={o} value={o} className="text-ink">
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-mist"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      )}

      {(field.type === "radio" || field.type === "checkbox") && (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {field.options?.map((option) => {
            const selected =
              field.type === "radio" ? strValue === option : arrValue.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  field.type === "radio" ? onText(option) : onToggle(option)
                }
                className={cn(
                  "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200",
                  selected
                    ? "border-signal/60 bg-signal/10 text-bone"
                    : "border-line bg-ink/40 text-bone-dim hover:border-bone-dim"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center border",
                    field.type === "radio" ? "rounded-full" : "rounded",
                    selected ? "border-signal bg-signal text-ink" : "border-line"
                  )}
                >
                  {selected && <Check className="size-3" strokeWidth={3} />}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function Review({
  values,
  onEdit,
}: {
  values: BriefingValues;
  onEdit: (step: number) => void;
}) {
  return (
    <div className="rounded-3xl border border-line bg-charcoal p-7 sm:p-9">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-signal-bright">
        Confira suas respostas
      </p>
      <p className="mt-1.5 text-sm text-mist">
        Revise antes de enviar. Toque em “editar” para ajustar qualquer etapa.
      </p>

      <div className="mt-7 space-y-7">
        {BRIEFING_STEPS.map((s, i) => {
          const answered = s.fields.filter((f) => isFilled(values[f.id]));
          return (
            <div key={s.title}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-bone">
                  {s.emoji} {s.title}
                </p>
                <button
                  type="button"
                  onClick={() => onEdit(i)}
                  className="text-xs font-medium text-signal hover:text-signal-bright"
                >
                  editar
                </button>
              </div>
              {answered.length === 0 ? (
                <p className="mt-2 text-sm text-mist-dim">Nenhuma resposta.</p>
              ) : (
                <dl className="mt-3 space-y-2.5 border-l border-line-soft pl-4">
                  {answered.map((f) => (
                    <div key={f.id}>
                      <dt className="text-xs text-mist-dim">{f.label}</dt>
                      <dd className="text-sm text-bone-dim">
                        {Array.isArray(values[f.id])
                          ? (values[f.id] as string[]).join(", ")
                          : (values[f.id] as string)}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
