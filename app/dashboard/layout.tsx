import { requireUser } from "@/lib/auth";
import { DashboardChrome } from "./dashboard-chrome";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser();

  return (
    <DashboardChrome
      user={{
        email: user.email,
        name: user.full_name,
        company: user.company,
        role: user.role,
      }}
    >
      {children}
    </DashboardChrome>
  );
}
