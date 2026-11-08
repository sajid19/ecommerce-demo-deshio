"use client";
import * as React from "react";

interface Shell {
  drawerOpen: boolean;
  setDrawerOpen: (o: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (o: boolean) => void;
}
const Ctx = React.createContext<Shell | null>(null);

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const value = React.useMemo(() => ({ drawerOpen, setDrawerOpen, searchOpen, setSearchOpen }), [drawerOpen, searchOpen]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShell() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useShell must be used inside <ShellProvider>");
  return ctx;
}
