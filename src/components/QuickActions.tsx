
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Calendar, Mail, Download, Plus } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: "Add Candidate",
      description: "Add new candidate",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: FileText,
      label: "Parse Resume",
      description: "Upload & analyze",
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      icon: Calendar,
      label: "Schedule Interview",
      description: "Book new interview",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: Mail,
      label: "Send Email",
      description: "Bulk notifications",
      color: "bg-orange-600 hover:bg-orange-700"
    },
    {
      icon: Download,
      label: "Export Data",
      description: "Download reports",
      color: "bg-gray-600 hover:bg-gray-700"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-200"
              >
                <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.label}</p>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
