
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, FileText, TrendingUp, UserCheck, UserX, Clock, Briefcase } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { MetricCard } from "@/components/MetricCard";
import { RecentActivity } from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  const dashboardMetrics = [
    {
      title: "Total Candidates",
      value: "247",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      color: "blue"
    },
    {
      title: "Active Interviews",
      value: "18",
      change: "+5",
      trend: "up" as const,
      icon: Calendar,
      color: "green"
    },
    {
      title: "Resumes Parsed",
      value: "156",
      change: "+23",
      trend: "up" as const,
      icon: FileText,
      color: "purple"
    },
    {
      title: "Hire Rate",
      value: "24%",
      change: "+3%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "orange"
    }
  ];

  const candidatesByStatus = {
    shortlisted: 45,
    interviewed: 28,
    selected: 12,
    rejected: 89
  };

  const upcomingInterviews = [
    { candidate: "Sarah Johnson", role: "Frontend Developer", time: "10:00 AM", date: "Today" },
    { candidate: "Michael Chen", role: "UX Designer", time: "2:30 PM", date: "Today" },
    { candidate: "Emily Rodriguez", role: "Data Analyst", time: "11:00 AM", date: "Tomorrow" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <main className="ml-64 p-8">
        {activeModule === "dashboard" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Recruitment Dashboard</h1>
                <p className="text-gray-600 mt-1">Track your hiring progress and manage candidates efficiently</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Export Report
                </Button>
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Users className="w-4 h-4" />
                  Add Candidate
                </Button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardMetrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Candidate Status Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    Candidates by Status
                  </CardTitle>
                  <CardDescription>Current distribution of candidate applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">Shortlisted</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {candidatesByStatus.shortlisted}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">Interviewed</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {candidatesByStatus.interviewed}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="font-medium">Selected</span>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        {candidatesByStatus.selected}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <span className="font-medium">Rejected</span>
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        {candidatesByStatus.rejected}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <QuickActions />
            </div>

            {/* Upcoming Interviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Upcoming Interviews
                </CardTitle>
                <CardDescription>Scheduled interviews for the next 48 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingInterviews.map((interview, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{interview.candidate}</p>
                          <p className="text-sm text-gray-600">{interview.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{interview.time}</p>
                        <p className="text-sm text-gray-600">{interview.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <RecentActivity />
          </div>
        )}

        {activeModule === "candidates" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Candidate Management</h1>
                <p className="text-gray-600 mt-1">Manage all candidate applications and their journey</p>
              </div>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Users className="w-4 h-4" />
                Add New Candidate
              </Button>
            </div>
            <div className="bg-white rounded-lg border p-8 text-center">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Candidate Management Coming Soon</h3>
              <p className="text-gray-600">This module will include candidate CRUD operations, status tracking, and detailed profiles.</p>
            </div>
          </div>
        )}

        {activeModule === "resume-parsing" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Resume Parsing</h1>
                <p className="text-gray-600 mt-1">AI-powered resume analysis and skill extraction</p>
              </div>
              <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
                <FileText className="w-4 h-4" />
                Upload Resume
              </Button>
            </div>
            <div className="bg-white rounded-lg border p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Resume Parsing Coming Soon</h3>
              <p className="text-gray-600">AI-powered resume parsing with skill matching and candidate profile generation.</p>
            </div>
          </div>
        )}

        {activeModule === "interviews" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Interview Management</h1>
                <p className="text-gray-600 mt-1">Schedule, track, and evaluate candidate interviews</p>
              </div>
              <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                <Calendar className="w-4 h-4" />
                Schedule Interview
              </Button>
            </div>
            <div className="bg-white rounded-lg border p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Interview Management Coming Soon</h3>
              <p className="text-gray-600">Complete interview scheduling, tracking, and evaluation system.</p>
            </div>
          </div>
        )}

        {activeModule === "analysis" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
                <p className="text-gray-600 mt-1">Comprehensive hiring analytics and performance insights</p>
              </div>
              <Button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700">
                <TrendingUp className="w-4 h-4" />
                Generate Report
              </Button>
            </div>
            <div className="bg-white rounded-lg border p-8 text-center">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
              <p className="text-gray-600">Advanced recruitment analytics with time-to-hire, conversion rates, and hiring insights.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
