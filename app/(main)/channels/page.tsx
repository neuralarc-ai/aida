import { staticChannels } from "@/data/static-channels";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Send,
  MessageSquare,
  Slack,
  Mail,
  Plus,
  Settings,
  MoreVertical,
} from "lucide-react";
import CustomIcon from "@/components/custom-icon";

const iconMap: Record<string, any> = {
  MessageCircle,
  Send,
  MessageSquare,
  Slack,
  Mail,
};

export default function ChannelsPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Channels</h1>
          <p className="text-muted-foreground mt-1">
            Manage your communication channels and integrations
          </p>
        </div>
        <Button className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Add Channel
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Channels</CardDescription>
            <CardTitle className="text-3xl">{staticChannels.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Connected</CardDescription>
            <CardTitle className="text-3xl text-green-600 dark:text-green-400">
              {staticChannels.filter((ch) => ch.status === "connected").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Disconnected</CardDescription>
            <CardTitle className="text-3xl text-red-600 dark:text-red-400">
              {
                staticChannels.filter((ch) => ch.status === "disconnected")
                  .length
              }
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Unread Messages</CardDescription>
            <CardTitle className="text-3xl">
              {staticChannels.reduce((sum, ch) => sum + ch.unread, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staticChannels.map((channel) => {
          const Icon = iconMap[channel.icon] || MessageCircle;
          const isConnected = channel.status === "connected";

          return (
            <Card
              key={channel.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isConnected
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {channel.type}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant={isConnected ? "default" : "secondary"}
                    className={
                      isConnected
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }
                  >
                    {isConnected ? "Connected" : "Disconnected"}
                  </Badge>
                  {channel.unread > 0 && (
                    <Badge variant="outline" className="font-semibold">
                      {channel.unread} unread
                    </Badge>
                  )}
                </div>

                {/* Last Message */}
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-1">
                    Last message
                  </p>
                  <p className="text-sm truncate">{channel.lastMessage}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="mr-2 h-3 w-3" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="mr-2 h-3 w-3" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
