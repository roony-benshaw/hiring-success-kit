
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, Filter, Calendar, TrendingUp, Users, Clock, Award } from "lucide-react";

export const AnalyticsTab = () => {
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [selectedRole, setSelectedRole] = useState("All Roles");

  // Mock data for charts
  const resumeMatchData = [
    { month: "Jan", matches: 45, hires: 12 },
    { month: "Feb", matches: 52, hires: 15 },
    { month: "Mar", matches: 38, hires: 8 },
    { month: "Apr", matches: 61, hires: 18 },
    { month: "May", matches: 49, hires: 14 },
    { month: "Jun", matches: 55, hires: 16 }
  ];

  const interviewConversionData = [
    { stage: "Applied", count: 247, percentage: 100 },
    { stage: "Shortlisted", count: 89, percentage: 36 },
    { stage: "Interviewed", count: 45, percentage: 18 },
    { stage: "Selected", count: 12, percentage: 5 }
  ];

  const topRolesData = [
    { role: "Frontend Developer", demand: 35, color: "#3B82F6" },
    { role: "Backend Developer", demand: 28, color: "#10B981" },
    { role: "Full Stack Developer", demand: 22, color: "#8B5CF6" },
    { role: "Data Analyst", demand: 15, color: "#F59E0B" }
  ];

  const candidateSourcesData = [
    { source: "LinkedIn", count: 89, color: "#0A66C2" },
    { source: "Job Portals", count: 67, color: "#059669" },
    { source: "Referrals", count: 45, color: "#7C3AED" },
    { source: "Company Website", count: 32, color: "#DC2626" },
    { source: "Others", count: 14, color: "#6B7280" }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  const summaryStats = [
    {
      title: "Total Matches",
      value: "247",
      change: "+18%",
      icon: Users,
      color: "blue"
    },
    {
      title: "Total Hires",
      value: "83",
      change: "+12%",
      icon: Award,
      color: "green"
    },
    {
      title: "Avg Interview Score",
      value: "7.8/10",
      change: "+0.5",
      icon: TrendingUp,
      color: "purple"
    },
    {
      title: "Avg Time to Hire",
      value: "18 days",
      change: "-3 days",
      icon: Clock,
      color: "orange"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Comprehensive hiring analytics and performance insights</p>
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {dateRange}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDateRange("Last 7 days")}>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Last 30 days")}>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Last 3 months")}>Last 3 months</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Last 6 months")}>Last 6 months</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {selectedRole}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedRole("All Roles")}>All Roles</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("Frontend Developer")}>Frontend Developer</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("Backend Developer")}>Backend Developer</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("Full Stack Developer")}>Full Stack Developer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Resume Match Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Match & Hire Rate</CardTitle>
            <CardDescription>Monthly comparison of matched resumes vs successful hires</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resumeMatchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="matches" fill="#3B82F6" name="Matches" />
                <Bar dataKey="hires" fill="#10B981" name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Interview Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Conversion Funnel</CardTitle>
            <CardDescription>Candidate journey from application to selection</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interviewConversionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Roles in Demand */}
        <Card>
          <CardHeader>
            <CardTitle>Top Roles in Demand</CardTitle>
            <CardDescription>Most sought-after positions based on applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topRolesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ role, demand }) => `${role}: ${demand}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="demand"
                >
                  {topRolesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Candidate Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Sources Breakdown</CardTitle>
            <CardDescription>Where candidates are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={candidateSourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ source, count }) => `${source}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {candidateSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>Download reports in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export as PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export as CSV
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export as Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
