
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, UserPlus, Calendar, FileText, UserCheck } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      type: "candidate_added",
      message: "New candidate Sarah Johnson applied for Frontend Developer",
      time: "2 hours ago",
      icon: UserPlus,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      type: "interview_scheduled",
      message: "Interview scheduled with Michael Chen for UX Designer role",
      time: "4 hours ago",
      icon: Calendar,
      iconColor: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      type: "resume_parsed",
      message: "Resume parsed for Emily Rodriguez - Data Analyst position",
      time: "6 hours ago",
      icon: FileText,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      type: "candidate_selected",
      message: "David Kim selected for Full Stack Developer position",
      time: "1 day ago",
      icon: UserCheck,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full ${activity.bgColor}`}>
                  <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
