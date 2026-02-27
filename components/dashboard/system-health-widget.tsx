import { Activity, Radio } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SystemHealthWidgetProps {
  activeAgentCount: number;
  connectedChannelCount: number;
  status: "operational" | "degraded" | "down";
  className?: string;
}

export function SystemHealthWidget({
  activeAgentCount,
  connectedChannelCount,
  status,
  className,
}: SystemHealthWidgetProps) {
  const statusConfig = {
    operational: {
      label: "Operational",
      className: "bg-secondary text-secondary-foreground",
    },
    degraded: {
      label: "Degraded",
      className: "bg-accent text-accent-foreground",
    },
    down: {
      label: "Down",
      className: "bg-destructive text-destructive-foreground",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card
      className={cn(
        "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
        className,
      )}
      role="region"
      aria-label="System Health Overview"
    >
      <CardHeader>
        <CardTitle className="text-xl">System Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Badge className={cn("text-lg px-6 py-2", currentStatus.className)}>
            {currentStatus.label}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg">
            <Activity
              className="h-8 w-8 mb-3 text-muted-foreground"
              aria-hidden="true"
            />
            <div
              className="text-3xl font-bold"
              data-testid="active-agent-count"
            >
              {activeAgentCount}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Active Agents
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg">
            <Radio
              className="h-8 w-8 mb-3 text-muted-foreground"
              aria-hidden="true"
            />
            <div
              className="text-3xl font-bold"
              data-testid="connected-channel-count"
            >
              {connectedChannelCount}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Connected Channels
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
