import { staticLogs } from "@/data/static-logs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  Info,
  AlertTriangle,
  XCircle,
  Clock,
  Package,
} from "lucide-react";

export default function LogsPage() {
  const infoCount = staticLogs.filter((l) => l.level === "info").length;
  const warnCount = staticLogs.filter((l) => l.level === "warn").length;
  const errorCount = staticLogs.filter((l) => l.level === "error").length;

  const levelConfig = {
    info: {
      icon: Info,
      color: "text-blue-700 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      badgeClass:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    },
    warn: {
      icon: AlertTriangle,
      color: "text-yellow-700 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      badgeClass:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    error: {
      icon: XCircle,
      color: "text-red-700 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      badgeClass:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    },
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
          <p className="text-muted-foreground mt-1">
            Monitor system events and troubleshoot issues
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Logs</CardDescription>
            <CardTitle className="text-3xl">{staticLogs.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Info</CardDescription>
            <CardTitle className="text-3xl text-blue-600 dark:text-blue-400">
              {infoCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Warnings</CardDescription>
            <CardTitle className="text-3xl text-yellow-600 dark:text-yellow-400">
              {warnCount}
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

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest system events and messages</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-2">
              {staticLogs.map((log, index) => {
                const config =
                  levelConfig[log.level as keyof typeof levelConfig];
                const Icon = config.icon;

                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    {/* Level Icon */}
                    <div
                      className={`flex-shrink-0 p-2 rounded-lg ${config.bgColor}`}
                    >
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>

                    {/* Log Content */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Message */}
                      <p className="text-sm font-medium leading-relaxed">
                        {log.message}
                      </p>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          <span>{log.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Package className="h-3 w-3" />
                          <span>{log.component}</span>
                        </div>
                      </div>
                    </div>

                    {/* Level Badge */}
                    <Badge
                      variant="secondary"
                      className={`flex-shrink-0 ${config.badgeClass}`}
                    >
                      {log.level.toUpperCase()}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
