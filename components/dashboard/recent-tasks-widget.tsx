import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Task {
  id: string;
  title: string;
  status: "completed" | "running" | "pending" | "failed";
  agent: string;
  createdAt: string;
  progress?: number;
  error?: string;
}

interface RecentTasksWidgetProps {
  tasks: Task[];
  maxDisplay?: number;
  className?: string;
}

export function RecentTasksWidget({
  tasks,
  maxDisplay = 4,
  className,
}: RecentTasksWidgetProps) {
  const displayedTasks = tasks.slice(0, maxDisplay);

  const statusConfig = {
    completed: {
      label: "Completed",
      className: "bg-secondary text-secondary-foreground",
    },
    running: {
      label: "Running",
      className: "bg-accent text-accent-foreground",
    },
    pending: {
      label: "Pending",
      className: "bg-muted text-muted-foreground",
    },
    failed: {
      label: "Failed",
      className: "bg-destructive text-destructive-foreground",
    },
  };

  return (
    <Card
      className={cn("col-span-1 md:col-span-2 lg:col-span-2", className)}
      role="region"
      aria-label="Recent Tasks"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Recent Tasks</CardTitle>
        <Button asChild>
          <Link
            href="/tasks"
          >
            View all tasks
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {displayedTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent tasks</p>
        ) : (
          <ScrollArea className="h-[280px] pr-4">
            <div className="space-y-3">
              {displayedTasks.map((task) => {
                const status = statusConfig[task.status];
                return (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{task.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {task.agent} • {task.createdAt}
                        </div>
                      </div>
                      <Badge className={cn("shrink-0", status.className)}>
                        {status.label}
                      </Badge>
                    </div>
                    {task.status === "running" &&
                      task.progress !== undefined && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress
                            value={task.progress}
                            className="h-1.5"
                            aria-label={`Task progress: ${task.progress}%`}
                          />
                        </div>
                      )}
                    {task.status === "failed" && task.error && (
                      <div className="mt-2 text-xs text-destructive">
                        {task.error}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
        {/* <div className="mt-4 pt-4 border-t border-border">
          <Link
            href="/tasks"
            className="text-sm text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
          >
            View all tasks
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}
