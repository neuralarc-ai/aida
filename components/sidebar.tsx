"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Activity,
  CheckSquare,
  Zap,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { RiRobot2Line } from "@remixicon/react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agents", href: "/agents", icon: Users },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Skills", href: "/skills", icon: Zap },
  { name: "Usage", href: "/usage", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6 justify-between">
        <div className="flex items-center gap-2">
          <RiRobot2Line className="h-6 w-6 shrink-0" />
          {!isCollapsed && <h1 className="text-2xl font-bold">AIDA</h1>}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-5 -right-4 p-1 bg-background border hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-zinc-800"
                  : "text-foreground hover:bg-muted",
                isCollapsed && "justify-center"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
