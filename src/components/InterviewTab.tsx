
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar as CalendarIcon, Clock, Plus, Edit, RotateCcw, CheckCircle, Users, Video, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Interview {
  id: string;
  candidateName: string;
  interviewer: string;
  date: Date;
  time: string;
  mode: "Online" | "Offline";
  status: "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
}

export const InterviewTab = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("calendar");
  
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: "1",
      candidateName: "John Doe",
      interviewer: "Sarah Wilson",
      date: new Date(2024, 0, 15),
      time: "10:00 AM",
      mode: "Online",
      status: "Scheduled",
      notes: "Technical round - React and Node.js focus"
    },
    {
      id: "2",
      candidateName: "Jane Smith",
      interviewer: "Mike Johnson",
      date: new Date(2024, 0, 16),
      time: "2:30 PM", 
      mode: "Offline",
      status: "Scheduled",
      notes: "Final round - Cultural fit"
    },
    {
      id: "3",
      candidateName: "Alex Brown",
      interviewer: "Lisa Davis",
      date: new Date(2024, 0, 14),
      time: "11:00 AM",
      mode: "Online",
      status: "Completed"
    }
  ]);

  const [newInterview, setNewInterview] = useState({
    candidateName: "",
    interviewer: "",
    date: "",
    time: "",
    mode: "Online" as "Online" | "Offline",
    notes: ""
  });

  const handleScheduleInterview = () => {
    const interview: Interview = {
      id: Date.now().toString(),
      candidateName: newInterview.candidateName,
      interviewer: newInterview.interviewer,
      date: new Date(newInterview.date),
      time: newInterview.time,
      mode: newInterview.mode,
      status: "Scheduled",
      notes: newInterview.notes
    };
    setInterviews([...interviews, interview]);
    setNewInterview({
      candidateName: "",
      interviewer: "",
      date: "",
      time: "",
      mode: "Online",
      notes: ""
    });
    setIsScheduleModalOpen(false);
  };

  const updateInterviewStatus = (id: string, status: Interview['status']) => {
    setInterviews(interviews.map(interview => 
      interview.id === id ? { ...interview, status } : interview
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const upcomingInterviews = interviews.filter(interview => 
    interview.status === "Scheduled" && interview.date >= new Date()
  );

  // Mock calendar events for display
  const getInterviewsForDate = (date: Date) => {
    return interviews.filter(interview => 
      interview.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interview Management</h1>
          <p className="text-gray-600 mt-1">Schedule, track, and evaluate candidate interviews</p>
        </div>
        <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4" />
              Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Interview</DialogTitle>
              <DialogDescription>Set up an interview with a candidate.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="candidate">Candidate Name</Label>
                <Input
                  id="candidate"
                  value={newInterview.candidateName}
                  onChange={(e) => setNewInterview({...newInterview, candidateName: e.target.value})}
                  placeholder="Select or enter candidate name"
                />
              </div>
              <div>
                <Label htmlFor="interviewer">Interviewer Name</Label>
                <Input
                  id="interviewer"
                  value={newInterview.interviewer}
                  onChange={(e) => setNewInterview({...newInterview, interviewer: e.target.value})}
                  placeholder="Enter interviewer name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newInterview.date}
                    onChange={(e) => setNewInterview({...newInterview, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newInterview.time}
                    onChange={(e) => setNewInterview({...newInterview, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="mode">Mode</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {newInterview.mode}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setNewInterview({...newInterview, mode: "Online"})}>
                      <Video className="w-4 h-4 mr-2" />
                      Online
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNewInterview({...newInterview, mode: "Offline"})}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Offline
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={newInterview.notes}
                  onChange={(e) => setNewInterview({...newInterview, notes: e.target.value})}
                  placeholder="Interview notes or focus areas"
                />
              </div>
              <Button onClick={handleScheduleInterview} className="w-full">
                Schedule Interview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                  Interview Calendar
                </CardTitle>
                <CardDescription>Click on a date to view scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Selected Date Details */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? selectedDate.toDateString() : "Select a Date"}
                </CardTitle>
                <CardDescription>Interviews scheduled for this day</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate && (
                  <div className="space-y-3">
                    {getInterviewsForDate(selectedDate).map((interview) => (
                      <div key={interview.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium">{interview.candidateName}</p>
                          <Badge className={getStatusColor(interview.status)}>
                            {interview.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {interview.time}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <Users className="w-3 h-3 inline mr-1" />
                          {interview.interviewer}
                        </p>
                        <p className="text-sm text-gray-600">
                          {interview.mode === "Online" ? (
                            <Video className="w-3 h-3 inline mr-1" />
                          ) : (
                            <MapPin className="w-3 h-3 inline mr-1" />
                          )}
                          {interview.mode}
                        </p>
                      </div>
                    ))}
                    {getInterviewsForDate(selectedDate).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No interviews scheduled</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>All scheduled interviews with action buttons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{interview.candidateName}</p>
                        <p className="text-sm text-gray-600">
                          {interview.date.toLocaleDateString()} at {interview.time}
                        </p>
                        <p className="text-sm text-gray-600">Interviewer: {interview.interviewer}</p>
                        {interview.notes && (
                          <p className="text-xs text-gray-500 mt-1">{interview.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateInterviewStatus(interview.id, "Cancelled")}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateInterviewStatus(interview.id, "Completed")}
                          className="text-green-600"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {upcomingInterviews.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No upcoming interviews scheduled</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
