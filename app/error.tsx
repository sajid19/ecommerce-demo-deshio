"use client";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="py-20 text-center">
      <h1 className="font-display text-h1 font-semibold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">Please try again.</p>
      <Button className="mt-6" onClick={reset}>Try again</Button>
    </Container>
  );
}
