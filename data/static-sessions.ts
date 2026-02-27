// src/data/static-sessions.ts
type MessageRole = "user" | "assistant";

interface Message {
  role: MessageRole;
  content: string;
  time: string;
}

interface Session {
  id: string;
  agentId: string;
  channel: string;
  title: string;
  startedAt: string;
  messages: Message[];
}

export const staticSessions: Session[] = [
  {
    id: "sess-1",
    agentId: "agent-1",
    channel: "Email",
    title: "Re: Project Update",
    startedAt: "2026-02-27 11:30 AM",
    messages: [
      {
        role: "user" as const,
        content: "Did you get the report?",
        time: "11:30",
      },
      {
        role: "assistant" as const,
        content: "Yes, summarizing now...",
        time: "11:31",
      },
      {
        role: "assistant" as const,
        content: "Key points: deadline extended to March 10",
        time: "11:32",
      },
    ],
  },
  {
    id: "sess-2",
    agentId: "agent-3",
    channel: "WhatsApp",
    title: "Meeting tomorrow",
    startedAt: "2026-02-26 4:15 PM",
    messages: [
      {
        role: "user" as const,
        content: "Can you book 2pm slot?",
        time: "4:15",
      },
      {
        role: "assistant" as const,
        content: "Slot booked with John and Sarah",
        time: "4:16",
      },
      { role: "user" as const, content: "Thanks!", time: "4:17" },
    ],
  },
  {
    id: "sess-3",
    agentId: "agent-2",
    channel: "Telegram",
    title: "Research on AI agents",
    startedAt: "2026-02-27 09:00 AM",
    messages: [
      {
        role: "user" as const,
        content: "Latest papers on multi-agent systems",
        time: "09:00",
      },
      {
        role: "assistant" as const,
        content: "Found 3 recent papers...",
        time: "09:02",
      },
    ],
  },
];
