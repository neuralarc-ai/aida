import { Sidebar } from "@/components/sidebar";
import { TopNavbar } from "@/components/top-navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopNavbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
