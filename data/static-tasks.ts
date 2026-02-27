// src/data/static-tasks.ts
type TaskStatus = "completed" | "running" | "pending" | "failed";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  agent: string;
  createdAt: string;
  completedAt?: string;
  progress?: number;
  error?: string;
}

export const staticTasks: Task[] = [
  {
    id: "task-1",
    title: "Summarize weekly team emails",
    status: "completed" as const,
    agent: "Inbox Zero Bot",
    createdAt: "2026-02-27 10:00",
    completedAt: "2026-02-27 10:15",
  },
  {
    id: "task-2",
    title: "Find flights to Goa next weekend",
    status: "running" as const,
    agent: "Travel Booker",
    createdAt: "2026-02-27 12:30",
    progress: 60,
  },
  {
    id: "task-3",
    title: "Generate LinkedIn post about new skill",
    status: "pending" as const,
    agent: "Content Creator",
    createdAt: "2026-02-27 14:00",
  },
  {
    id: "task-4",
    title: "Check calendar conflicts for March",
    status: "failed" as const,
    agent: "Calendar Guardian",
    createdAt: "2026-02-26 09:00",
    error: "API rate limit hit",
  },
];
