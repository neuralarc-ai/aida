// Dummy chat messages for development/fallback

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: "user" | "assistant" | "tool";
  content: string;
  timestamp: Date;
  toolName?: string;
  toolStatus?: "running" | "success" | "error";
}

export const staticChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sessionId: "session-1",
    role: "user",
    content: "Can you help me analyze the recent system logs?",
    timestamp: new Date("2026-03-02T09:15:00"),
  },
  {
    id: "msg-2",
    sessionId: "session-1",
    role: "assistant",
    content:
      "I'll analyze the system logs for you. Let me fetch the recent entries.",
    timestamp: new Date("2026-03-02T09:15:02"),
  },
  {
    id: "msg-3",
    sessionId: "session-1",
    role: "tool",
    content:
      "Fetched 247 log entries from the past 24 hours. Found 3 warnings and 0 errors.",
    timestamp: new Date("2026-03-02T09:15:05"),
    toolName: "fetch_logs",
    toolStatus: "success",
  },
  {
    id: "msg-4",
    sessionId: "session-1",
    role: "assistant",
    content:
      'Based on the logs, your system is running smoothly. I found 3 minor warnings:\n\n1. High memory usage on agent-worker-2 (85%)\n2. Slow response time on channel "slack-support" (avg 2.3s)\n3. Pending skill update for "data-analysis-v2"\n\nWould you like me to investigate any of these further?',
    timestamp: new Date("2026-03-02T09:15:08"),
  },
  {
    id: "msg-5",
    sessionId: "session-1",
    role: "user",
    content: "Yes, please check the memory usage issue.",
    timestamp: new Date("2026-03-02T09:16:30"),
  },
  {
    id: "msg-6",
    sessionId: "session-2",
    role: "user",
    content: "Create a new agent for customer support",
    timestamp: new Date("2026-03-02T10:30:00"),
  },
  {
    id: "msg-7",
    sessionId: "session-2",
    role: "assistant",
    content:
      "I'll create a customer support agent for you. What model would you like to use?",
    timestamp: new Date("2026-03-02T10:30:02"),
  },
  {
    id: "msg-8",
    sessionId: "session-3",
    role: "user",
    content: "Show me the status of all active tasks",
    timestamp: new Date("2026-03-02T11:45:00"),
  },
  {
    id: "msg-9",
    sessionId: "session-3",
    role: "tool",
    content: "Retrieved 12 active tasks across 5 agents.",
    timestamp: new Date("2026-03-02T11:45:03"),
    toolName: "list_tasks",
    toolStatus: "success",
  },
  {
    id: "msg-10",
    sessionId: "session-3",
    role: "assistant",
    content:
      "Here are your active tasks:\n\n**High Priority (3)**\n- Data migration for client-db-prod\n- Security audit on auth-service\n- Deploy v2.1.0 to staging\n\n**Medium Priority (7)**\n- Update documentation\n- Review pull requests\n- Monitor performance metrics\n- And 4 more...\n\n**Low Priority (2)**\n- Clean up old logs\n- Archive completed projects",
    timestamp: new Date("2026-03-02T11:45:06"),
  },
];

export function getMessagesBySession(sessionId: string): ChatMessage[] {
  return staticChatMessages.filter((msg) => msg.sessionId === sessionId);
}
