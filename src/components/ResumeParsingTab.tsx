
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, FileText, Plus, Zap, Save, X, Star } from "lucide-react";

interface ParsedResult {
  id: string;
  candidateName: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  experience: number;
  email: string;
}

export const ResumeParsingTab = () => {
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);
  const [parsedResults, setParsedResults] = useState<ParsedResult[]>([]);
  const [jobDescription, setJobDescription] = useState({
    title: "",
    skills: "",
    experience: 0
  });

  const [dragOverJD, setDragOverJD] = useState(false);
  const [dragOverResume, setDragOverResume] = useState(false);

  const mockParsedResults: ParsedResult[] = [
    {
      id: "1",
      candidateName: "John Doe",
      matchScore: 85,
      matchedSkills: ["React", "TypeScript", "Node.js"],
      missingSkills: ["AWS", "Docker"],
      experience: 3,
      email: "john@example.com"
    },
    {
      id: "2",
      candidateName: "Jane Smith", 
      matchScore: 92,
      matchedSkills: ["Python", "Django", "PostgreSQL", "AWS"],
      missingSkills: ["Kubernetes"],
      experience: 5,
      email: "jane@example.com"
    }
  ];

  const handleDragOver = (e: React.DragEvent, type: 'jd' | 'resume') => {
    e.preventDefault();
    if (type === 'jd') setDragOverJD(true);
    else setDragOverResume(true);
  };

  const handleDragLeave = (type: 'jd' | 'resume') => {
    if (type === 'jd') setDragOverJD(false);
    else setDragOverResume(false);
  };

  const handleDrop = (e: React.DragEvent, type: 'jd' | 'resume') => {
    e.preventDefault();
    setDragOverJD(false);
    setDragOverResume(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log(`${type} files dropped:`, files);
  };

  const handleMatch = () => {
    setParsedResults(mockParsedResults);
  };

  const handleSaveResult = (id: string) => {
    console.log(`Saving result for candidate ${id}`);
  };

  const handleDiscardResult = (id: string) => {
    setParsedResults(parsedResults.filter(r => r.id !== id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const renderStars = (score: number) => {
    const stars = Math.round(score / 20); // Convert to 5-star scale
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resume Parsing</h1>
          <p className="text-gray-600 mt-1">AI-powered resume analysis and skill matching</p>
        </div>
        <Dialog open={isJDModalOpen} onOpenChange={setIsJDModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              Add JD Manually
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Job Description</DialogTitle>
              <DialogDescription>Enter job requirements for skill matching.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Role Title</Label>
                <Input
                  id="title"
                  value={jobDescription.title}
                  onChange={(e) => setJobDescription({...jobDescription, title: e.target.value})}
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              <div>
                <Label htmlFor="jd-skills">Required Skills (comma-separated)</Label>
                <Input
                  id="jd-skills"
                  value={jobDescription.skills}
                  onChange={(e) => setJobDescription({...jobDescription, skills: e.target.value})}
                  placeholder="React, TypeScript, Node.js, AWS"
                />
              </div>
              <div>
                <Label htmlFor="jd-experience">Minimum Experience (years)</Label>
                <Input
                  id="jd-experience"
                  type="number"
                  value={jobDescription.experience}
                  onChange={(e) => setJobDescription({...jobDescription, experience: parseInt(e.target.value) || 0})}
                  placeholder="Years of experience required"
                />
              </div>
              <Button onClick={() => setIsJDModalOpen(false)} className="w-full">
                Save Job Description
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upload Areas */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Job Description Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Job Description
            </CardTitle>
            <CardDescription>Upload job description for skill matching</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOverJD ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
              }`}
              onDragOver={(e) => handleDragOver(e, 'jd')}
              onDragLeave={() => handleDragLeave('jd')}
              onDrop={(e) => handleDrop(e, 'jd')}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Drop JD files here</p>
              <p className="text-gray-500 mb-4">or click to browse</p>
              <Button variant="outline">Choose Files</Button>
            </div>
          </CardContent>
        </Card>

        {/* Resume Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Resumes
            </CardTitle>
            <CardDescription>Upload candidate resumes for parsing</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOverResume ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragOver={(e) => handleDragOver(e, 'resume')}
              onDragLeave={() => handleDragLeave('resume')}
              onDrop={(e) => handleDrop(e, 'resume')}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Drop resume files here</p>
              <p className="text-gray-500 mb-4">or click to browse</p>
              <Button variant="outline">Choose Files</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Match Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleMatch}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold"
          size="lg"
        >
          <Zap className="w-5 h-5 mr-2" />
          Match Resumes with JD
        </Button>
      </div>

      {/* Parsed Results */}
      {parsedResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Parsing Results</CardTitle>
            <CardDescription>AI-analyzed candidate matches with job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parsedResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-6 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{result.candidateName}</h3>
                      <p className="text-gray-600">{result.email}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(result.matchScore)}`}>
                        {result.matchScore}%
                      </div>
                      <div className="flex gap-1 mt-1">
                        {renderStars(result.matchScore)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-medium text-green-700 mb-2">Matched Skills</p>
                      <div className="flex gap-1 flex-wrap">
                        {result.matchedSkills.map((skill, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-red-700 mb-2">Missing Skills</p>
                      <div className="flex gap-1 flex-wrap">
                        {result.missingSkills.map((skill, index) => (
                          <Badge key={index} className="bg-red-100 text-red-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Experience: {result.experience} years</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSaveResult(result.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={() => handleDiscardResult(result.id)}
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Discard
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
