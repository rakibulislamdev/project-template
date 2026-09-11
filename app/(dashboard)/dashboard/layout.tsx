import { DashboardLayoutClient } from "./_components/DashboardLayoutClient";
import type { Role } from "./_components/navigation";

// Mocking a server-side session fetch
// In a real application, replace this with your Auth library (NextAuth, Supabase, Clerk, etc.)
async function getUserSession() {
  return { role: "admin" as Role };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  const currentRole = session.role;

  return (
    <DashboardLayoutClient currentRole={currentRole}>
      {children}
    </DashboardLayoutClient>
  );
}
