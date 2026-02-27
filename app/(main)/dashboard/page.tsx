import { Activity, Radio, MessageSquare, CheckSquare } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActiveAgentsWidget } from "@/components/dashboard/active-agents-widget";
import { RecentSessionsWidget } from "@/components/dashboard/recent-sessions-widget";
import { RecentTasksWidget } from "@/components/dashboard/recent-tasks-widget";
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
  const activeTasksCount = staticTasks.filter(
    (t) => t.status === "running" || t.status === "pending",
  ).length;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Activity}
            value={activeAgentCount}
            label="Active Agents"
          />
          <StatCard
            icon={Radio}
            value={connectedChannelCount}
            label="Connected Channels"
          />
          <StatCard
            icon={MessageSquare}
            value={totalUnread}
            label="Unread Messages"
          />
          <StatCard
            icon={CheckSquare}
            value={activeTasksCount}
            label="Active Tasks"
          />
        </div>

        {/* Recent Tasks and Quick Actions Row */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div className="col-span-2 h-full">
            <RecentTasksWidget
              tasks={staticTasks.slice(0, 4)}
              className="h-full"
            />
          </div>
          <div className="col-span-1">
            <QuickActionsWidget />
          </div>
        </div>

        {/* Active Agents and Recent Sessions Row */}
        <div className="grid grid-cols-2 gap-6">
          <ActiveAgentsWidget agents={staticAgents.slice(0, 5)} className="" />
          <RecentSessionsWidget
            sessions={staticSessions.slice(0, 3)}
            className=""
          />
        </div>
      </div>
    </main>
  );
}
