import { redirect } from "next/navigation";

export default function CommandCentreLayout({ children }: { children: React.ReactNode }) {
  void children;
  redirect("https://command.directiveos.com.au");
}
