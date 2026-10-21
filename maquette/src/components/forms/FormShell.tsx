"use client";

import { createContext, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { validate, type FieldErrors, type FormKind } from "@/lib/forms";
import { isDemo } from "@/lib/env";

type State = "idle" | "submitting" | "success" | "error";

const ErrorsContext = createContext<FieldErrors>({});
export const useFieldError = (name: string) => useContext(ErrorsContext)[name]?.[0];

type Props = {
  kind: FormKind;
  title: string;
  submitLabel: string;
  successTitle: string;
  successText: string;
  children: ReactNode;
};

/** Converts FormData to a plain object; checkboxes become booleans. */
function toObject(form: HTMLFormElement) {
  const data: Record<string, unknown> = {};
  new FormData(form).forEach((value, key) => {
    data[key] = value;
  });
  form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((box) => {
    data[box.name] = box.checked;
  });
  return data;
}

export function FormShell({ kind, title, submitLabel, successTitle, successText, children }: Props) {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [reference, setReference] = useState("");
  // The server states whether the request was only acknowledged ("demo"): the wording follows it, never the other way round.
  const [demoReply, setDemoReply] = useState(true);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const errorEntries = Object.entries(errors).filter(([, v]) => v?.length);

  function showErrors(next: FieldErrors) {
    setErrors(next);
    setState("idle");
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = { ...toObject(form), kind };
    const local = validate(kind, payload);
    if (!local.ok) return showErrors(local.errors);

    setErrors({});
    setState("submitting");
    try {
      const res = await fetch("/api/demandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 422 && body.errors) return showErrors(body.errors);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setReference(body.reference ?? "");
      setDemoReply(body.mode !== "live");
      setState("success");
      form.reset();
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div ref={successRef} tabIndex={-1} data-state="success" role="status" className="card p-6 md:p-8">
        <p className="eyebrow">{demoReply ? "Démonstration" : "Demande envoyée"}</p>
        <h3 className="mt-2 text-3xl">{demoReply ? "Parcours terminé : rien n’a été envoyé." : successTitle}</h3>
        {demoReply ? (
          <p className="mt-3 text-muted">
            Aucune donnée n&apos;a été transmise au restaurant ni enregistrée, et aucune réservation n&apos;existe. Voici ce qui se
            passera dans la version finale : {successText}
          </p>
        ) : (
          <p className="mt-3 text-muted">{successText}</p>
        )}
        {reference ? (
          <p className="mt-4 text-sm">
            {demoReply ? "Référence de démonstration" : "Référence"} : <strong className="font-mono">{reference}</strong>
          </p>
        ) : null}
        <button type="button" className="btn btn-ghost mt-6" onClick={() => setState("idle")}>
          Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <ErrorsContext.Provider value={errors}>
      <form noValidate id={`form-${kind}`} onSubmit={onSubmit} data-form={kind} data-state={state} aria-labelledby={`${kind}-title`} className="card relative p-5 sm:p-8">
        <h3 id={`${kind}-title`} className="text-2xl sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted">Les champs marqués d&apos;un * sont obligatoires.</p>

        {errorEntries.length > 0 ? (
          <div ref={summaryRef} tabIndex={-1} role="alert" data-testid="error-summary" className="mt-5 rounded-xl border border-danger/60 p-4">
            <p className="font-semibold text-danger">
              {errorEntries.length === 1 ? "1 champ à corriger" : `${errorEntries.length} champs à corriger`}
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {errorEntries.map(([name, messages]) => (
                <li key={name}>
                  <a href={`#${kind}-${name}`} className="underline underline-offset-2">
                    {messages?.[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {state === "error" ? (
          <div role="alert" data-testid="network-error" className="mt-5 rounded-xl border border-danger/60 p-4 text-sm">
            <p className="font-semibold text-danger">La demande n&apos;a pas pu être envoyée.</p>
            <p className="mt-1 text-muted">Vérifiez votre connexion puis réessayez. Vos informations sont conservées dans le formulaire.</p>
          </div>
        ) : null}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>

        {/* Honeypot: hidden from people and assistive technologies. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Ne pas remplir
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        {isDemo ? (
          <p data-testid="demo-form-note" className="mt-8 rounded-xl border border-line bg-surface-2/60 p-3 text-sm text-muted">
            <strong className="text-ink">Démonstration :</strong> en envoyant ce formulaire, vous testez le parcours. Rien n&apos;est transmis au
            restaurant et rien n&apos;est enregistré.
          </p>
        ) : null}

        <button type="submit" className={`btn btn-primary w-full sm:w-auto ${isDemo ? "mt-4" : "mt-8"}`} disabled={state === "submitting"} aria-busy={state === "submitting"}>
          {state === "submitting" ? (
            <>
              <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Envoi en cours…
            </>
          ) : (
            submitLabel
          )}
        </button>
      </form>
    </ErrorsContext.Provider>
  );
}
