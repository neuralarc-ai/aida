import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
};

function CustomIcon({ icon: Icon, className, iconClassName }: Props) {
  return (
    <div
      className={cn("bg-secondary text-background p-3 rounded-full", className)}
    >
      <Icon className={cn("w-6 h-6", className)} />
    </div>
  );
}

export default CustomIcon;
