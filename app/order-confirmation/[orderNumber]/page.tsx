import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Order confirmed", description: "Your Deshio order has been placed.", path: "/order-confirmation", noindex: true });

export default async function OrderConfirmationPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  return (
    <Container className="py-16 text-center">
      <CheckCircle2 className="mx-auto size-14 text-success" aria-hidden />
      <p lang="bn" className="mt-3 font-bangla text-primary">ধন্যবাদ!</p>
      <h1 className="font-display text-h1 font-semibold">Order placed</h1>
      <p className="mt-2 text-muted-foreground">Your order number is <strong className="text-foreground">{orderNumber}</strong>. We will call to confirm shortly.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild><Link href="/track-order">Track order</Link></Button>
        <Button asChild variant="outline"><Link href="/shop">Continue shopping</Link></Button>
      </div>
    </Container>
  );
}
