import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickAction {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface QuickActionsWidgetProps {
  actions: QuickAction[];
  className?: string;
}

export function QuickActionsWidget({
  actions,
  className,
}: QuickActionsWidgetProps) {
  return (
    <Card
      className={cn("col-span-1", className)}
      role="region"
      aria-label="Quick Actions"
    >
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.href}
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link href={action.href}>
                <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
                {action.label}
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
