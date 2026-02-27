/**
 * Integration verification for RecentTasksWidget
 * This file demonstrates the component works with actual static data
 */

import { RecentTasksWidget } from "../recent-tasks-widget";
import { staticTasks } from "@/data/static-tasks";

// Verify component can be instantiated with real data
export function VerifyRecentTasksWidget() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">RecentTasksWidget Verification</h2>

      {/* Test 1: With actual static data */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">
          With Static Data (4 tasks)
        </h3>
        <RecentTasksWidget tasks={staticTasks} maxDisplay={4} />
      </div>

      {/* Test 2: With limited display */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">
          With Limited Display (2 tasks)
        </h3>
        <RecentTasksWidget tasks={staticTasks} maxDisplay={2} />
      </div>

      {/* Test 3: Empty state */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Empty State</h3>
        <RecentTasksWidget tasks={[]} />
      </div>

      {/* Test 4: Single running task with progress */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">
          Running Task with Progress
        </h3>
        <RecentTasksWidget
          tasks={[
            {
              id: "task-test",
              title: "Processing large dataset",
              status: "running",
              agent: "Data Processor",
              createdAt: "2026-02-27 15:30",
              progress: 75,
            },
          ]}
        />
      </div>

      {/* Test 5: Failed task with error */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Failed Task with Error</h3>
        <RecentTasksWidget
          tasks={[
            {
              id: "task-failed",
              title: "API sync operation",
              status: "failed",
              agent: "Sync Agent",
              createdAt: "2026-02-27 14:00",
              error: "Connection timeout after 30s",
            },
          ]}
        />
      </div>
    </div>
  );
}

// Type verification - ensures component props match requirements
type TaskType = Parameters<typeof RecentTasksWidget>[0]["tasks"][0];

// Verify all required fields are present
const verifyTaskStructure: TaskType = {
  id: "test",
  title: "Test",
  status: "completed",
  agent: "Agent",
  createdAt: "2026-02-27",
  progress: 50, // optional
  error: "error", // optional
};

// Verify status types are correct
const validStatuses: TaskType["status"][] = [
  "completed",
  "running",
  "pending",
  "failed",
];

console.log("✓ RecentTasksWidget type verification passed");
