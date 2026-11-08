"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/** Phone-first auth UI. No real auth: TODO(api) customer-guard login + OTP verify. */
export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [step, setStep] = React.useState<"phone" | "otp">("phone");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (step === "phone") {
      const errs: Record<string, string> = {};
      if (!/^01[3-9]\d{8}$/.test(String(f.get("phone") ?? "").trim())) errs.phone = "Enter a valid 11-digit mobile number";
      if (mode === "register" && !String(f.get("name") ?? "").trim()) errs.name = "Enter your name";
      setErrors(errs);
      if (!Object.keys(errs).length) setStep("otp");
      return;
    }
    if (!/^\d{4,6}$/.test(String(f.get("otp") ?? "").trim())) { setErrors({ otp: "Enter the 4–6 digit code" }); return; }
    router.push("/account");
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-lg border bg-card p-5 md:p-6">
      {step === "phone" ? (
        <>
          {mode === "register" && <Input name="name" label="Full name" autoComplete="name" error={errors.name} />}
          <Input name="phone" label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" error={errors.phone} />
          <Button type="submit" className="w-full">Send code</Button>
        </>
      ) : (
        <>
          <Input name="otp" label="Verification code" inputMode="numeric" autoComplete="one-time-code" error={errors.otp} hint="Demo: enter any 4–6 digits" />
          <Button type="submit" className="w-full">{mode === "login" ? "Login" : "Create account"}</Button>
          <button type="button" className="min-h-11 w-full text-body-sm text-primary" onClick={() => setStep("phone")}>Change number</button>
        </>
      )}
      <p className="text-center text-body-sm text-muted-foreground">
        {mode === "login" ? <>New to Deshio? <Link href="/register" className="font-medium text-primary">Register</Link></> : <>Already have an account? <Link href="/login" className="font-medium text-primary">Login</Link></>}
      </p>
    </form>
  );
}
