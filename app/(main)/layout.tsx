"use client";

import { Sidebar } from "@/components/sidebar";
import { TopNavbar } from "@/components/top-navbar";
import { useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col">
        <TopNavbar onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
