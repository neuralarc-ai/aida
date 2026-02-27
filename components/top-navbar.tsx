"use client";

import { Search, Moon, Settings, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function TopNavbar() {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Left side - empty for spacing */}
      <div className="w-48" />

      {/* Center - Search bar */}
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks, activity, jobs..."
          className="w-full pl-10"
        />
      </div>

      {/* Right side - Theme toggle and Profile */}
      <div className="flex w-48 items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Moon className="h-4 w-4 text-muted-foreground" />
          <Switch />
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
              <span className="text-sm font-medium">B</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5 text-sm font-medium">Brian</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/settings"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
