// src/data/static-logs.ts
export const staticLogs = [
  {
    timestamp: "2026-02-27 14:42:10",
    level: "info",
    message: "Agent Inbox Zero Bot processed 12 emails",
    component: "email-skill",
  },
  {
    timestamp: "2026-02-27 14:41:55",
    level: "warn",
    message: "Travel Booker hit rate limit on flight API",
    component: "flight-search",
  },
  {
    timestamp: "2026-02-27 14:40:22",
    level: "info",
    message: "New session started from WhatsApp",
    component: "channels",
  },
  {
    timestamp: "2026-02-27 14:39:08",
    level: "error",
    message: "Failed to parse PDF: invalid format",
    component: "pdf-extract",
  },
  {
    timestamp: "2026-02-27 14:38:45",
    level: "info",
    message: "Skill 'Image Generate' invoked successfully",
    component: "creative-tools",
  },
];
