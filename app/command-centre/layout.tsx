import AdminShell from "@/app/admin/AdminShell";

export default function CommandCentreLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
