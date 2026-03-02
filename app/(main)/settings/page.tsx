"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Bell, Shield, Zap, Database, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { value: "general", label: "General" },
    { value: "agents", label: "Agents" },
    { value: "notifications", label: "Notifications" },
    { value: "security", label: "Security" },
    { value: "advanced", label: "Advanced" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your OpenClaw control plane preferences
          </p>
        </div>
      </div>

      {/* Mobile Select / Desktop Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        {/* Mobile Dropdown */}
        <div className="lg:hidden">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a section" />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Tabs */}
        <TabsList className="hidden lg:grid w-full grid-cols-5">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  defaultValue="Admin User"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  defaultValue="admin@openclaw.ai"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  placeholder="UTC"
                  defaultValue="America/New_York"
                />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce spacing and padding for more content
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Timestamps</Label>
                  <p className="text-sm text-muted-foreground">
                    Display relative or absolute timestamps
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent Settings */}
        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Agent Behavior
              </CardTitle>
              <CardDescription>
                Configure default agent execution settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-start Agents</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically start agents on system boot
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-retry Failed Tasks</Label>
                  <p className="text-sm text-muted-foreground">
                    Retry failed tasks up to 3 times
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Parallel Execution</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow multiple agents to run simultaneously
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="max-concurrent">Max Concurrent Agents</Label>
                <Input
                  id="max-concurrent"
                  type="number"
                  defaultValue="5"
                  min="1"
                  max="20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeout">Default Task Timeout (seconds)</Label>
                <Input
                  id="timeout"
                  type="number"
                  defaultValue="300"
                  min="30"
                  max="3600"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Management</CardTitle>
              <CardDescription>
                Configure skill installation and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-update Skills</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically update skills to latest versions
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verify Skill Signatures</Label>
                  <p className="text-sm text-muted-foreground">
                    Only install cryptographically signed skills
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Agent Status Changes</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when agents start, stop, or error
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Completions</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when tasks complete successfully
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Failures</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when tasks fail or encounter errors
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Channel Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify for new messages from channels
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify for system health and performance issues
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to your email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Browser Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show desktop notifications in browser
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Slack Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to Slack workspace
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
              <CardDescription>
                Manage security settings and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>
                Configure authentication and authorization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for login
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>API Key Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow API access with keys
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Auto-logout after 30 minutes of inactivity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Privacy</CardTitle>
              <CardDescription>
                Control how your data is stored and used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Log Retention</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep logs for 30 days
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics Collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve OpenClaw with usage data
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Advanced settings for power users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input
                  id="api-endpoint"
                  placeholder="https://api.openclaw.ai"
                  defaultValue="https://api.openclaw.ai/v1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="websocket-url">WebSocket URL</Label>
                <Input
                  id="websocket-url"
                  placeholder="wss://ws.openclaw.ai"
                  defaultValue="wss://ws.openclaw.ai"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-level">Log Level</Label>
                <Input id="log-level" placeholder="info" defaultValue="info" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>
                Optimize system performance and resource usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Caching</Label>
                  <p className="text-sm text-muted-foreground">
                    Cache responses for faster performance
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lazy Load Components</Label>
                  <p className="text-sm text-muted-foreground">
                    Load UI components on demand
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="cache-size">Cache Size (MB)</Label>
                <Input
                  id="cache-size"
                  type="number"
                  defaultValue="100"
                  min="10"
                  max="1000"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Developer Options</CardTitle>
              <CardDescription>
                Tools for debugging and development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Show detailed error messages and logs
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verbose Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log all system events and API calls
                  </p>
                </div>
                <Switch />
              </div>
              <Button variant="destructive" className="mt-4">
                Reset to Defaults
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
