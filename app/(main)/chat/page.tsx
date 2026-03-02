"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Wrench, Menu, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { staticSessions } from "@/data/static-sessions";
import {
  staticChatMessages,
  getMessagesBySession,
  type ChatMessage,
} from "@/data/static-chat-messages";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    staticSessions[0]?.id || "",
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load messages for selected session
  useEffect(() => {
    if (selectedSessionId) {
      setMessages(getMessagesBySession(selectedSessionId));
    }
  }, [selectedSessionId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;

    // Add user message (optimistic UI)
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sessionId: selectedSessionId,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    // Simulate streaming response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sessionId: selectedSessionId,
        role: "assistant",
        content:
          "This is a demo response. In production, this will stream from OpenClaw Gateway via WebSocket.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsStreaming(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const selectedSession = staticSessions.find(
    (s) => s.id === selectedSessionId,
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Session Sidebar */}
      <Card
        className={cn(
          "w-80 flex-col transition-transform duration-300 md:flex",
          // Mobile: fixed overlay
          "fixed inset-y-0 left-0 z-50 md:relative md:translate-x-0",
          isSidebarOpen ? "flex translate-x-0" : "hidden -translate-x-full",
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Sessions</h2>
            <p className="text-sm text-muted-foreground">
              Select a conversation
            </p>
          </div>
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {staticSessions.map((session) => {
              const sessionMessages = getMessagesBySession(session.id);
              const lastMessage = sessionMessages[sessionMessages.length - 1];

              return (
                <button
                  key={session.id}
                  onClick={() => handleSessionSelect(session.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-colors",
                    "hover:bg-accent",
                    selectedSessionId === session.id && "bg-accent",
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-medium text-sm truncate">
                      {session.title}
                    </span>
                    <Badge variant="default" className="shrink-0 text-xs">
                      active
                    </Badge>
                  </div>
                  {lastMessage && (
                    <p className="text-xs text-muted-foreground truncate">
                      {lastMessage.content}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {session.startedAt}
                  </p>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden shrink-0"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-lg truncate">
                {selectedSession?.title || "Select a session"}
              </h2>
              <p className="text-sm text-muted-foreground truncate">
                {selectedSession
                  ? `Agent ${selectedSession.agentId} • ${selectedSession.channel}`
                  : "No session selected"}
              </p>
            </div>
          </div>
          <Badge variant="default" className="shrink-0">
            active
          </Badge>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-2 md:p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="text-center px-4">
                  No messages yet. Start a conversation!
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2 md:gap-3",
                    message.role === "user" && "flex-row-reverse",
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center",
                      message.role === "user" && "bg-blue-500",
                      message.role === "assistant" && "bg-green-500",
                      message.role === "tool" && "bg-purple-500",
                    )}
                  >
                    {message.role === "user" && (
                      <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    )}
                    {message.role === "assistant" && (
                      <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    )}
                    {message.role === "tool" && (
                      <Wrench className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div
                    className={cn(
                      "flex-1 max-w-[85%] md:max-w-[70%]",
                      message.role === "user" && "flex flex-col items-end",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-lg p-2.5 md:p-3",
                        message.role === "user" && "bg-blue-500 text-white",
                        message.role === "assistant" && "bg-accent",
                        message.role === "tool" &&
                          "bg-purple-500/10 border border-purple-500/20",
                      )}
                    >
                      {message.role === "tool" && message.toolName && (
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {message.toolName}
                          </Badge>
                          {message.toolStatus && (
                            <Badge
                              variant={
                                message.toolStatus === "success"
                                  ? "default"
                                  : "destructive"
                              }
                              className="text-xs"
                            >
                              {message.toolStatus}
                            </Badge>
                          )}
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}

            {isStreaming && (
              <div className="flex gap-2 md:gap-3">
                <div className="shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div className="flex-1 max-w-[85%] md:max-w-[70%]">
                  <div className="rounded-lg p-2.5 md:p-3 bg-accent">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-2 md:p-4 border-t">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[50px] md:min-h-[60px] max-h-[150px] md:max-h-[200px] resize-none text-sm md:text-base"
              disabled={isStreaming}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              size="icon"
              className="shrink-0 h-[50px] w-[50px] md:h-[60px] md:w-[60px]"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
