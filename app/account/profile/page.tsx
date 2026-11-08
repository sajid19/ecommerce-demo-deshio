import { AccountShell } from "@/components/account/AccountShell";
import { MockForm } from "@/components/forms/MockForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "My Profile", description: "Update your Deshio profile.", path: "/account/profile", noindex: true });

export default function ProfilePage() {
  return (
    <AccountShell title="My Profile" current="/account/profile">
      <MockForm submitLabel="Save changes" successTitle="Profile saved" successBody="Your details have been updated."
        fields={[{ name: "name", label: "Full name", required: true }, { name: "phone", label: "Mobile number", type: "tel", required: true }, { name: "email", label: "Email", type: "email" }]} />
    </AccountShell>
  );
}
