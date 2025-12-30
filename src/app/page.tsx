'use client';

import { useState } from 'react';
import type {
  AnalyzeATSScoreOutput,
  IdentifySkillGapsOutput,
  MatchResumeWithJobRolesOutput,
  PersonalizedFeedbackOutput,
} from '@/ai/flows';
import { analyzeResume } from './actions';
import { Header } from '@/components/app/Header';
import { ResumeForm } from '@/components/app/ResumeForm';
import { LoadingSpinner } from '@/components/app/LoadingSpinner';
import { ResultsDashboard } from '@/components/app/ResultsDashboard';
import { useToast } from '@/hooks/use-toast';

export type AnalysisResults = {
  atsScore?: AnalyzeATSScoreOutput;
  skillGaps?: IdentifySkillGapsOutput;
  jobMatches?: MatchResumeWithJobRolesOutput;
  feedback?: PersonalizedFeedbackOutput;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const { toast } = useToast();

  const handleAnalysis = async (resumeText: string, jobDescription: string) => {
    setIsLoading(true);
    setResults(null);

    const response = await analyzeResume({ resumeText, jobDescription });

    if (response.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: response.error,
      });
    } else {
      setResults(response);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
              Analyze Your Resume with AI
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get an instant ATS score, skill gap analysis, and personalized feedback to land your dream job.
            </p>
          </div>

          <ResumeForm onAnalyze={handleAnalysis} isLoading={isLoading} />

          {isLoading && <LoadingSpinner />}

          {results && <ResultsDashboard results={results} />}
        </div>
      </main>
    </div>
  );
}
