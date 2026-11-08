import { AuthForm } from "@/components/account/AuthForm";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Register", description: "Register to your Deshio account.", path: "/register", noindex: true });

export default function Page() {
  return (
    <Container className="max-w-md py-10">
      <p lang="bn" className="font-bangla text-primary">নিবন্ধন</p>
      <h1 className="mb-4 font-display text-h2 font-semibold">Register</h1>
      <AuthForm mode="register" />
    </Container>
  );
}
