import { Plus, Bot, CheckSquare } from "lucide-react";
import { BentoGrid } from "@/components/layout/bento-grid";
import { SystemHealthWidget } from "@/components/dashboard/system-health-widget";
import { ActiveAgentsWidget } from "@/components/dashboard/active-agents-widget";
import { RecentSessionsWidget } from "@/components/dashboard/recent-sessions-widget";
import { RecentTasksWidget } from "@/components/dashboard/recent-tasks-widget";
import { ChannelSummaryWidget } from "@/components/dashboard/channel-summary-widget";
import { QuickActionsWidget } from "@/components/dashboard/quick-actions-widget";
import {
  staticAgents,
  staticChannels,
  staticSessions,
  staticTasks,
} from "@/data";

export default function DashboardPage() {
  // Compute derived data
  const activeAgentCount = staticAgents.filter(
    (a) => a.status === "active",
  ).length;
  const connectedChannelCount = staticChannels.filter(
    (c) => c.status === "connected",
  ).length;
  const totalUnread = staticChannels.reduce((sum, c) => sum + c.unread, 0);
  const systemStatus =
    activeAgentCount > 0 && connectedChannelCount > 0
      ? "operational"
      : "degraded";

  // Define quick actions
  const quickActions = [
    { label: "New Session", href: "/sessions", icon: Plus },
    { label: "View Agents", href: "/agents", icon: Bot },
    { label: "View Tasks", href: "/tasks", icon: CheckSquare },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <BentoGrid>
        <SystemHealthWidget
          activeAgentCount={activeAgentCount}
          connectedChannelCount={connectedChannelCount}
          status={systemStatus}
        />
        <ActiveAgentsWidget agents={staticAgents.slice(0, 5)} />
        <RecentSessionsWidget sessions={staticSessions.slice(0, 3)} />
        <RecentTasksWidget tasks={staticTasks.slice(0, 4)} />
        <ChannelSummaryWidget
          connectedCount={connectedChannelCount}
          totalUnread={totalUnread}
        />
        <QuickActionsWidget actions={quickActions} />
      </BentoGrid>
    </main>
  );
}
