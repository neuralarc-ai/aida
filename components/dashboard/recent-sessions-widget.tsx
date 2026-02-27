import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

interface Session {
  id: string;
  title: string;
  channel: string;
  startedAt: string;
  messages: Message[];
}

interface RecentSessionsWidgetProps {
  sessions: Session[];
  maxDisplay?: number;
  className?: string;
}

export function RecentSessionsWidget({
  sessions,
  maxDisplay = 3,
  className,
}: RecentSessionsWidgetProps) {
  const displayedSessions = sessions.slice(0, maxDisplay);

  return (
    <Card
      className={cn("", className)}
      role="region"
      aria-label="Recent Sessions"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
          Recent Sessions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayedSessions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent sessions</p>
        ) : (
          <div className="space-y-3">
            {displayedSessions.map((session) => (
              <HoverCard key={session.id}>
                <HoverCardTrigger asChild>
                  <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">
                        {session.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {session.startedAt}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {session.channel}
                    </Badge>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{session.title}</h4>
                    <div className="space-y-2">
                      {session.messages.slice(0, 2).map((message, idx) => (
                        <div
                          key={idx}
                          className="text-xs p-2 rounded bg-muted/50"
                        >
                          <span className="font-medium capitalize">
                            {message.role}:
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {message.content}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
