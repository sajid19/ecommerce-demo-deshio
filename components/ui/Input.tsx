import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, hint, className, id, ...props }, ref) => {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const descId = error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className="w-full">
      <label htmlFor={inputId} className="mb-1.5 block text-body-sm font-medium">{label}</label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={descId}
        className={cn(
          "h-11 w-full rounded-md border border-input bg-card px-4 text-body placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none disabled:bg-muted",
          error && "border-destructive",
          className,
        )}
        {...props}
      />
      {error ? <p id={descId} className="mt-1 text-caption text-destructive">{error}</p> : hint ? <p id={descId} className="mt-1 text-caption text-muted-foreground">{hint}</p> : null}
    </div>
  );
});
Input.displayName = "Input";
