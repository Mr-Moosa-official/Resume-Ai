'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Wand2 } from 'lucide-react';

type ResumeFormProps = {
  onAnalyze: (resumeText: string, jobDescription: string) => void;
  isLoading: boolean;
};

export function ResumeForm({ onAnalyze, isLoading }: ResumeFormProps) {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(resumeText, jobDescription);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Start Your Analysis</CardTitle>
        <CardDescription>
          Paste your resume and a job description to begin. This tool does not store your data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="resume-text">Your Resume</Label>
              <Textarea
                id="resume-text"
                placeholder="Paste the full text content of your resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[300px] text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-description">Target Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the full job description you are targeting..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[300px] text-sm"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full max-w-xs"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {isLoading ? 'Analyzing...' : 'Analyze Resume'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
