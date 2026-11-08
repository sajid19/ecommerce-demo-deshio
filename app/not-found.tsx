import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <p lang="bn" className="font-bangla text-primary">পাওয়া যায়নি</p>
      <h1 className="font-display text-h1 font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you are looking for has moved or does not exist.</p>
      <Button asChild className="mt-6"><Link href="/shop">Continue shopping</Link></Button>
    </Container>
  );
}
