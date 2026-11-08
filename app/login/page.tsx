import { AuthForm } from "@/components/account/AuthForm";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Login", description: "Login to your Deshio account.", path: "/login", noindex: true });

export default function Page() {
  return (
    <Container className="max-w-md py-10">
      <p lang="bn" className="font-bangla text-primary">লগইন</p>
      <h1 className="mb-4 font-display text-h2 font-semibold">Login</h1>
      <AuthForm mode="login" />
    </Container>
  );
}
