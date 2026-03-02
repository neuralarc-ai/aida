import { staticTasks } from "@/data/static-tasks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  CheckCircle2,
  Clock,
  PlayCircle,
  XCircle,
  Calendar,
  Bot,
  MoreVertical,
} from "lucide-react";

export default function TasksPage() {
  const completedCount = staticTasks.filter(
    (t) => t.status === "completed",
  ).length;
  const runningCount = staticTasks.filter((t) => t.status === "running").length;
  const pendingCount = staticTasks.filter((t) => t.status === "pending").length;
  const failedCount = staticTasks.filter((t) => t.status === "failed").length;

  const tasksByStatus = {
    pending: staticTasks.filter((t) => t.status === "pending"),
    running: staticTasks.filter((t) => t.status === "running"),
    completed: staticTasks.filter((t) => t.status === "completed"),
    failed: staticTasks.filter((t) => t.status === "failed"),
  };

  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    running: {
      label: "Running",
      icon: PlayCircle,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-800",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      borderColor: "border-red-200 dark:border-red-800",
    },
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage agent task execution
          </p>
        </div>
        <Button className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl text-yellow-600 dark:text-yellow-400">
              {pendingCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Running</CardDescription>
            <CardTitle className="text-3xl text-blue-600 dark:text-blue-400">
              {runningCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl text-green-600 dark:text-green-400">
              {completedCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Failed</CardDescription>
            <CardTitle className="text-3xl text-red-600 dark:text-red-400">
              {failedCount}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {Object.entries(tasksByStatus).map(([status, tasks]) => {
          const config = statusConfig[status as keyof typeof statusConfig];
          const Icon = config.icon;

          return (
            <div key={status} className="space-y-3">
              {/* Column Header */}
              <div
                className={`flex items-center gap-2 p-3 rounded-lg border ${config.borderColor} ${config.bgColor}`}
              >
                <Icon className={`h-5 w-5 ${config.color}`} />
                <h3 className={`font-semibold ${config.color}`}>
                  {config.label}
                </h3>
                <Badge variant="secondary" className="ml-auto">
                  {tasks.length}
                </Badge>
              </div>

              {/* Task Cards */}
              <div className="space-y-3">
                {tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-medium leading-tight">
                          {task.title}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Agent */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Bot className="h-3 w-3" />
                        <span>{task.agent}</span>
                      </div>

                      {/* Created At */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{task.createdAt}</span>
                      </div>

                      {/* Progress Bar for Running Tasks */}
                      {task.status === "running" &&
                        task.progress !== undefined && (
                          <div className="space-y-1">
                            <Progress value={task.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground text-right">
                              {task.progress}%
                            </p>
                          </div>
                        )}

                      {/* Completed At */}
                      {task.status === "completed" && task.completedAt && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            Completed: {task.completedAt}
                          </p>
                        </div>
                      )}

                      {/* Error Message */}
                      {task.status === "failed" && task.error && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-red-600 dark:text-red-400">
                            Error: {task.error}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {tasks.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
