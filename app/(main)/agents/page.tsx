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
import {
  Bot,
  Plus,
  Play,
  Pause,
  Settings,
  Trash2,
  Clock,
  Zap,
} from "lucide-react";

export default function AgentsPage() {
  const activeCount = staticAgents.filter((a) => a.status === "active").length;
  const idleCount = staticAgents.filter((a) => a.status === "idle").length;
  const errorCount = staticAgents.filter((a) => a.status === "error").length;

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-muted-foreground mt-1">
            Manage your autonomous AI agents and their capabilities
          </p>
        </div>
        <Button className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Agents</CardDescription>
            <CardTitle className="text-3xl">{staticAgents.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-3xl text-green-600 dark:text-green-400">
              {activeCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Idle</CardDescription>
            <CardTitle className="text-3xl text-yellow-600 dark:text-yellow-400">
              {idleCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Errors</CardDescription>
            <CardTitle className="text-3xl text-red-600 dark:text-red-400">
              {errorCount}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staticAgents.map((agent) => {
          const isActive = agent.status === "active";
          const isError = agent.status === "error";
          const isIdle = agent.status === "idle";

          return (
            <Card key={agent.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-lg ${
                        isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : isError
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      <Bot className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{agent.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={isActive ? "default" : "secondary"}
                          className={
                            isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : isError
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }
                        >
                          {isActive && <Zap className="mr-1 h-3 w-3" />}
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {agent.description}
                </p>

                {/* Skills */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Last Active */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                  <Clock className="h-3 w-3" />
                  <span>Last active: {agent.lastActive}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {isActive ? (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Pause className="mr-2 h-3 w-3" />
                      Pause
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="mr-2 h-3 w-3" />
                      Start
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="mr-2 h-3 w-3" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
