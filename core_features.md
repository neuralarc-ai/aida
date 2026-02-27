# OpenClaw Dashboard Demo – Core Pages

Project type: Next.js (App Router) demo with dummy data only  
UI style: Bento grid dominant + heavy shadcn/ui usage  
Colors: Existing globals.css / Tailwind palette (no overrides)  
Data: All mocked (src/data/ + src/mocks/api.ts + Zustand stores)  
Tracking file: progress.md (append milestones here after each major page/component)

## Core Pages

- **1. Dashboard / Overview**
  - Path: `/` (app/page.tsx)
  - Purpose: High-level overview with widgets, metrics, recent activity, quick actions, system health
  - Layout: Yes – main Bento grid
  - Key shadcn Components: Card, Badge, Skeleton, HoverCard
  - Priority: High
  - Status: Planned
  - Notes / Next Tasks: Bento widgets (large for key metrics, medium for recent sessions/tasks, small for quick links); fake data; loading skeletons

- **2. Channels Management**
  - Path: `/channels`
  - Purpose: View, add, configure, test connected channels (WhatsApp, Telegram, etc.)
  - Layout: Yes – Bento tiles
  - Key shadcn Components: Card, Badge, Dialog (add wizard), Switch
  - Priority: High
  - Status: Planned
  - Notes / Next Tasks: Each channel as a tile with status indicator; modal wizard for adding/testing; toggle enable/disable

- **3. Agents / Nodes Management**
  - Path: `/agents`
  - Purpose: Create, edit, assign skills to agents/nodes; view status and details
  - Layout: Yes – Bento grid of agent cards
  - Key shadcn Components: Card, Badge, Dialog, Accordion, Form
  - Priority: High
  - Status: Planned
  - Notes / Next Tasks: Create/edit modal with system prompt textarea, skill drag-drop assignment, status badges

- **4. Skills Management (installed + marketplace)**
  - Path: `/skills`
  - Purpose: Browse fake ClawHub marketplace, install skills, assign/uninstall to agents
  - Layout: Yes – Bento tiles (larger for featured/popular)
  - Key shadcn Components: Card, Badge, Table/DataTable, Dialog
  - Priority: High
  - Status: Planned
  - Notes / Next Tasks: Fake search bar + install buttons; installed list with assign/uninstall actions

- **5. Sessions Management**
  - Path: `/sessions`
  - Purpose: View historical and active sessions with threaded chat history
  - Layout: Partial (Bento for session list, then expandable content)
  - Key shadcn Components: Card, Accordion (threads), ScrollArea
  - Priority: Medium
  - Status: Planned
  - Notes / Next Tasks: Timeline/list view; expandable fake message threads; export button simulation

- **6. Tasks / Jobs Management**
  - Path: `/tasks`
  - Purpose: Create, monitor, manage agentic tasks/jobs (pending, running, completed, failed)
  - Layout: Yes – Kanban hybrid with Bento task cards
  - Key shadcn Components: Card, Badge, Progress, Tabs (or columns)
  - Priority: High
  - Status: Planned
  - Notes / Next Tasks: Drag-drop simulation between columns; progress bars; detail panel with fake logs

- **7. Configurations / Settings**
  - Path: `/settings`
  - Purpose: Edit global mock settings (LLM providers, toggles, integrations)
  - Layout: Yes – Bento sections within tabs
  - Key shadcn Components: Tabs, Card, Form, Switch, Input
  - Priority: Medium
  - Status: Planned
  - Notes / Next Tasks: Tabbed interface; form fields with fake save + toast feedback

- **8. Logs / Monitoring / Troubleshooting**
  - Path: `/logs`
  - Purpose: View filtered, color-coded logs with search and tail simulation
  - Layout: Partial (large scrollable viewer tile + filter controls)
  - Key shadcn Components: ScrollArea, Badge (log levels), Table
  - Priority: Medium
  - Status: Planned
  - Notes / Next Tasks: Filter by level/component/time; color-coded entries; auto-scroll tail mode

## Additional Shared / Global Elements

- **Sidebar / Navigation**
  - Location: app/layout.tsx
  - Purpose: Persistent left sidebar with links to all core pages
  - Bento-related?: No
  - Key shadcn Components: Accordion, Button, Separator
  - Status: Planned

- **BentoGrid component**
  - Location: components/ui/bento-grid.tsx (or layout/)
  - Purpose: Reusable asymmetric grid wrapper for most pages
  - Bento-related?: Core
  - Key shadcn Components: — (custom CSS Grid)
  - Status: Planned

- **Mock API functions**
  - Location: src/mocks/api.ts
  - Purpose: Promise-based mocks with artificial delays and random errors
  - Status: Planned

- **Dummy data files**
  - Location: src/data/
  - Purpose: Static arrays + generators (agents, skills, channels, sessions, tasks, logs)
  - Status: Planned

- **Zustand stores**
  - Location: src/stores/
  - Purpose: Feature-slice state (useAgentsStore, useTasksStore, etc.)
  - Status: Planned

- **Toaster / Notifications**
  - Location: app/layout.tsx
  - Purpose: Global sonner toaster for CRUD success/error/feedback
  - Key shadcn Components: Toaster (sonner)
  - Status: Planned

## Recommended Implementation Order

1. Scaffold layout.tsx + sidebar navigation
2. Create reusable BentoGrid component
3. Set up dummy data files + one example Zustand store (e.g. agents)
4. Build Dashboard page (first visual win)
5. Channels → Agents → Skills → Tasks (high-impact pages)
6. Sessions → Settings → Logs

## How to Use This File in Prompts

Example Kiro prompt:

> Implement the Dashboard page as described in core-pages.md → item 1. Use BentoGrid, pull dummy data from src/data, display with shadcn Card + Badge, add loading skeletons.

When finished → append to progress.md, e.g.:

## 2026-02-27 - Dashboard page completed

- Bento grid layout with 6–8 widgets
- Fake metrics and recent activity
- Integrated shadcn components and sonner toasts

Feel free to add sub-bullets for blockers, decisions, or Kiro-specific notes.

Last updated: February 27, 2026
