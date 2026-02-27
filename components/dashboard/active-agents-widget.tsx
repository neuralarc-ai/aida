import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  status: "active" | "idle" | "error" | "disconnected";
  lastActive: string;
}

interface ActiveAgentsWidgetProps {
  agents: Agent[];
  maxDisplay?: number;
  className?: string;
}

export function ActiveAgentsWidget({
  agents,
  maxDisplay = 5,
  className,
}: ActiveAgentsWidgetProps) {
  const displayedAgents = agents.slice(0, maxDisplay);
  const hasMore = agents.length > maxDisplay;

  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-secondary text-secondary-foreground",
    },
    idle: {
      label: "Idle",
      className: "bg-muted text-muted-foreground",
    },
    error: {
      label: "Error",
      className: "bg-destructive text-destructive-foreground",
    },
    disconnected: {
      label: "Disconnected",
      className: "bg-muted-foreground text-background",
    },
  };

  return (
    <Card
      className={cn("col-span-1 md:col-span-2 lg:col-span-2", className)}
      role="region"
      aria-label="Active Agents"
    >
      <CardHeader>
        <CardTitle>Active Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-3">
            {displayedAgents.map((agent) => {
              const status = statusConfig[agent.status];
              return (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{agent.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {agent.lastActive}
                    </div>
                  </div>
                  <Badge className={cn("ml-3 shrink-0", status.className)}>
                    {status.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        {hasMore && (
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href="/agents"
              className="text-sm text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              View all agents ({agents.length})
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
