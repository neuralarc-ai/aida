import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChannelSummaryWidgetProps {
  connectedCount: number;
  totalUnread: number;
  className?: string;
}

export function ChannelSummaryWidget({
  connectedCount,
  totalUnread,
  className,
}: ChannelSummaryWidgetProps) {
  return (
    <Card
      className={cn("col-span-1", className)}
      role="region"
      aria-label="Channel Summary"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
          Channels
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold" data-testid="connected-count">
            {connectedCount}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Connected</div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold" data-testid="total-unread">
            {totalUnread}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Unread Messages
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
