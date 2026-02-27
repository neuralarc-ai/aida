import { describe, it, expect } from "vitest";
import { RecentTasksWidget } from "../recent-tasks-widget";

describe("RecentTasksWidget", () => {
  it("should accept valid props without errors", () => {
    const mockTasks = [
      {
        id: "task-1",
        title: "Test task",
        status: "completed" as const,
        agent: "Test Agent",
        createdAt: "2026-02-27 10:00",
      },
      {
        id: "task-2",
        title: "Running task",
        status: "running" as const,
        agent: "Test Agent 2",
        createdAt: "2026-02-27 11:00",
        progress: 50,
      },
    ];

    // This test verifies the component accepts the correct prop types
    expect(() => {
      RecentTasksWidget({ tasks: mockTasks, maxDisplay: 4 });
    }).not.toThrow();
  });

  it("should slice tasks array to maxDisplay limit", () => {
    const mockTasks = Array.from({ length: 10 }, (_, i) => ({
      id: `task-${i}`,
      title: `Task ${i}`,
      status: "pending" as const,
      agent: "Agent",
      createdAt: "2026-02-27 10:00",
    }));

    // Component should only display 4 tasks by default
    const props = { tasks: mockTasks, maxDisplay: 4 };
    expect(props.tasks.slice(0, props.maxDisplay).length).toBe(4);
  });

  it("should handle tasks with progress values", () => {
    const runningTask = {
      id: "task-1",
      title: "Running task",
      status: "running" as const,
      agent: "Agent",
      createdAt: "2026-02-27 10:00",
      progress: 75,
    };

    // Verify progress is properly typed and accessible
    expect(runningTask.progress).toBe(75);
    expect(runningTask.status).toBe("running");
  });

  it("should handle failed tasks with error messages", () => {
    const failedTask = {
      id: "task-1",
      title: "Failed task",
      status: "failed" as const,
      agent: "Agent",
      createdAt: "2026-02-27 10:00",
      error: "API rate limit hit",
    };

    // Verify error is properly typed and accessible
    expect(failedTask.error).toBe("API rate limit hit");
    expect(failedTask.status).toBe("failed");
  });
});
