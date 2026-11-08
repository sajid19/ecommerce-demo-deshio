"use client";
import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface Field { name: string; label: string; type?: string; required?: boolean; textarea?: boolean; hint?: string; options?: string[] }

/** Client-side-validated form that never posts anywhere (demo). TODO(api): wire `onValid` to the endpoint. */
export function MockForm({ fields, submitLabel, successTitle, successBody }: { fields: Field[]; submitLabel: string; successTitle: string; successBody: string }) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [done, setDone] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    for (const field of fields) {
      const v = String(f.get(field.name) ?? "").trim();
      if (field.required && !v) errs[field.name] = `${field.label} is required`;
      else if (v && field.type === "email" && !/^\S+@\S+\.\S+$/.test(v)) errs[field.name] = "Enter a valid email address";
      else if (v && field.type === "tel" && !/^01[3-9]\d{8}$/.test(v)) errs[field.name] = "Enter a valid 11-digit mobile number";
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      (e.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus();
      return;
    }
    setBusy(true);
    setTimeout(() => { setBusy(false); setDone(true); }, 600);
  };

  if (done)
    return (
      <div role="status" className="rounded-lg border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden />
        <p className="mt-2 font-display text-h3 font-semibold">{successTitle}</p>
        <p className="mt-1 text-muted-foreground">{successBody}</p>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-lg border bg-card p-5 md:p-6">
      {fields.map((f) =>
        f.textarea ? (
          <div key={f.name}>
            <label htmlFor={f.name} className="mb-1.5 block text-body-sm font-medium">{f.label}{f.required && " *"}</label>
            <textarea id={f.name} name={f.name} rows={4} aria-invalid={errors[f.name] ? true : undefined} className="w-full rounded-md border border-input bg-card px-4 py-3 text-body focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none" />
            {errors[f.name] && <p className="mt-1 text-caption text-destructive">{errors[f.name]}</p>}
          </div>
        ) : f.options ? (
          <div key={f.name}>
            <label htmlFor={f.name} className="mb-1.5 block text-body-sm font-medium">{f.label}{f.required && " *"}</label>
            <select id={f.name} name={f.name} className="h-11 w-full rounded-md border border-input bg-card px-3 text-body">{f.options.map((o) => <option key={o}>{o}</option>)}</select>
          </div>
        ) : (
          <Input key={f.name} name={f.name} label={`${f.label}${f.required ? " *" : ""}`} type={f.type ?? "text"} hint={f.hint} error={errors[f.name]} />
        ),
      )}
      <Button type="submit" loading={busy} className="w-full sm:w-auto">{submitLabel}</Button>
    </form>
  );
}
