import Link from "next/link";
import { MessageSquare, Bot, Activity, CheckSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import CustomIcon from "../custom-icon";

interface QuickActionsWidgetProps {
  className?: string;
}

const quickActions = [
  { label: "Go to Channels", href: "/channels", icon: MessageSquare },
  { label: "Go to Agents", href: "/agents", icon: Bot },
  { label: "Go to Sessions", href: "/sessions", icon: Activity },
  { label: "Go to Tasks", href: "/tasks", icon: CheckSquare },
];

export function QuickActionsWidget({ className }: QuickActionsWidgetProps) {
  return (
    <Card
      className={cn("col-span-1", className)}
      role="region"
      aria-label="Quick Actions"
    >
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex aspect-square flex-col text-center items-center justify-center gap-2 rounded-lg border bg-card hover:bg-muted transition-colors p-4"
              >
                <CustomIcon icon={Icon}/>
                <span className="text-md font-medium">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
