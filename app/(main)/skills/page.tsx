import { staticSkills } from "@/data/static-skills";
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
  Plus,
  Download,
  Trash2,
  Settings,
  Mail,
  Search,
  Image,
  Plane,
  Calendar,
  FileText,
  Zap,
  Users,
} from "lucide-react";

const categoryIcons: Record<string, any> = {
  Communication: Mail,
  Research: Search,
  Creative: Image,
  Travel: Plane,
  Productivity: Calendar,
  Documents: FileText,
};

const categoryColors: Record<string, string> = {
  Communication:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Research:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Creative: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Travel: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  Productivity:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Documents:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function SkillsPage() {
  const installedCount = staticSkills.filter((s) => s.installed).length;
  const availableCount = staticSkills.filter((s) => !s.installed).length;
  const categories = Array.from(new Set(staticSkills.map((s) => s.category)));

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skills Library</h1>
          <p className="text-muted-foreground mt-1">
            Manage and assign skills to your AI agents
          </p>
        </div>
        <Button className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Skills</CardDescription>
            <CardTitle className="text-3xl">{staticSkills.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Installed</CardDescription>
            <CardTitle className="text-3xl text-green-600 dark:text-green-400">
              {installedCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Available</CardDescription>
            <CardTitle className="text-3xl text-blue-600 dark:text-blue-400">
              {availableCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Categories</CardDescription>
            <CardTitle className="text-3xl">{categories.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staticSkills.map((skill) => {
          const Icon = categoryIcons[skill.category] || Zap;
          const categoryColor =
            categoryColors[skill.category] || "bg-gray-100 text-gray-700";

          return (
            <Card key={skill.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${categoryColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {skill.description}
                </p>

                {/* Status & Assignment */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Status
                    </span>
                    <Badge
                      variant={skill.installed ? "default" : "secondary"}
                      className={
                        skill.installed
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                      }
                    >
                      {skill.installed ? "Installed" : "Available"}
                    </Badge>
                  </div>

                  {skill.installed && skill.assignedTo.length > 0 && (
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>Assigned to</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {skill.assignedTo.length}{" "}
                        {skill.assignedTo.length === 1 ? "agent" : "agents"}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {skill.installed ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="mr-2 h-3 w-3" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-3 w-3" />
                      Install
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
