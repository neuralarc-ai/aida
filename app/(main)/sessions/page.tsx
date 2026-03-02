import { staticSessions } from "@/data/static-sessions";
import { staticAgents } from "@/data/static-agents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Plus,
  Clock,
  User,
  Bot,
  Trash2,
  ExternalLink,
} from "lucide-react";

export default function SessionsPage() {
  const totalMessages = staticSessions.reduce(
    (sum, s) => sum + s.messages.length,
    0,
  );
  const avgMessagesPerSession = Math.round(
    totalMessages / staticSessions.length,
  );

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Conversation Sessions
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage your agent conversation history
          </p>
        </div>
        <Button className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Sessions</CardDescription>
            <CardTitle className="text-3xl">{staticSessions.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Messages</CardDescription>
            <CardTitle className="text-3xl">{totalMessages}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg Messages</CardDescription>
            <CardTitle className="text-3xl">{avgMessagesPerSession}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Channels</CardDescription>
            <CardTitle className="text-3xl">
              {new Set(staticSessions.map((s) => s.channel)).size}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {staticSessions.map((session) => {
          const agent = staticAgents.find((a) => a.id === session.agentId);

          return (
            <Card
              key={session.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {session.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {session.channel}
                          </Badge>
                          {agent && (
                            <Badge variant="secondary" className="text-xs">
                              {agent.name}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{session.startedAt}</span>
                      <span className="mx-1">•</span>
                      <span>{session.messages.length} messages</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Open
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    {session.messages.map((message, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${message.role === "user" ? "flex-row" : "flex-row"}`}
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.role === "user"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">
                              {message.role === "user"
                                ? "You"
                                : agent?.name || "Agent"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {message.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
