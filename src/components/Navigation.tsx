
import { cn } from "@/lib/utils";
import { BarChart3, Calendar, FileText, Home, Users, TrendingUp } from "lucide-react";

interface NavigationProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export const Navigation = ({ activeModule, setActiveModule }: NavigationProps) => {
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      color: "blue"
    },
    {
      id: "candidates",
      label: "Candidates",
      icon: Users,
      color: "green"
    },
    {
      id: "resume-parsing",
      label: "Resume Parsing",
      icon: FileText,
      color: "purple"
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: Calendar,
      color: "orange"
    },
    {
      id: "analysis",
      label: "Analytics",
      icon: TrendingUp,
      color: "red"
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">RecruitBot</h1>
            <p className="text-sm text-gray-600">HR Management</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  "hover:bg-gray-50 hover:scale-105",
                  isActive ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm" : "text-gray-700"
                )}
              >
                <Icon 
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-blue-600" : "text-gray-500"
                  )} 
                />
                <span className={cn(
                  "font-medium",
                  isActive ? "text-blue-700" : "text-gray-700"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">HR</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">HR Manager</p>
            <p className="text-xs text-gray-600">hr@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
