"use client";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  side?: "left" | "right" | "bottom";
  children: React.ReactNode;
  className?: string;
}

const sideClass = {
  left: "inset-y-0 left-0 w-[85%] max-w-sm rounded-r-xl data-[state=open]:translate-x-0 -translate-x-full",
  right: "inset-y-0 right-0 w-[92%] max-w-md rounded-l-xl data-[state=open]:translate-x-0 translate-x-full",
  bottom: "inset-x-0 bottom-0 max-h-[90dvh] rounded-t-xl data-[state=open]:translate-y-0 translate-y-full",
};

export function Sheet({ open, onOpenChange, title, side = "left", children, className }: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn("fixed z-50 flex flex-col bg-background shadow-lg transition-transform duration-250 ease-out", sideClass[side], className)}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
            <Dialog.Title className="font-display text-h4 font-semibold">{title}</Dialog.Title>
            <Dialog.Close className="grid size-11 place-items-center rounded-full hover:bg-muted" aria-label="Close">
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
