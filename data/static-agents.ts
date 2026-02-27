// src/data/static-agents.ts
type AgentStatus = "active" | "idle" | "error" | "disconnected";

interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  skills: string[];
  lastActive: string;
  description: string;
}

export const staticAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Inbox Zero Bot",
    status: "active" as const,
    skills: ["email-read", "email-reply", "email-summarize"],
    lastActive: "Just now",
    description:
      "Manages your inbox, replies to routine emails, summarizes threads",
  },
  {
    id: "agent-2",
    name: "Research Assistant",
    status: "idle" as const,
    skills: ["web-search", "summarize", "pdf-extract", "fact-check"],
    lastActive: "1 hour ago",
    description: "Deep research on any topic, pulls sources, creates summaries",
  },
  {
    id: "agent-3",
    name: "Calendar Guardian",
    status: "active" as const,
    skills: ["calendar-view", "calendar-create", "calendar-conflict-check"],
    lastActive: "5 minutes ago",
    description:
      "Schedules meetings, finds free slots, prevents double-booking",
  },
  {
    id: "agent-4",
    name: "Travel Booker",
    status: "error" as const,
    skills: ["flight-search", "hotel-book", "expense-log"],
    lastActive: "2 days ago",
    description: "Finds cheapest flights/hotels, books trips, tracks expenses",
  },
  {
    id: "agent-5",
    name: "Content Creator",
    status: "idle" as const,
    skills: ["image-generate", "text-rewrite", "social-post"],
    lastActive: "Yesterday",
    description:
      "Generates images, rewrites posts, prepares social media content",
  },
];
