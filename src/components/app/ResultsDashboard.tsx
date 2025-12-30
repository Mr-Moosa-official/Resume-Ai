import type { AnalysisResults } from '@/app/page';
import { AtsScoreCard } from './AtsScoreCard';
import { SkillGapsCard } from './SkillGapsCard';
import { JobMatchesCard } from './JobMatchesCard';
import { FeedbackCard } from './FeedbackCard';

type ResultsDashboardProps = {
  results: AnalysisResults;
};

export function ResultsDashboard({ results }: ResultsDashboardProps) {
  const { atsScore, skillGaps, jobMatches, feedback } = results;

  return (
    <div className="mt-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {atsScore && (
          <div className="lg:col-span-1">
            <AtsScoreCard data={atsScore} />
          </div>
        )}
        {jobMatches && (
          <div className="lg:col-span-1">
            <JobMatchesCard data={jobMatches} />
          </div>
        )}
        {skillGaps && (
          <div className="lg:col-span-2">
            <SkillGapsCard data={skillGaps} />
          </div>
        )}
        {feedback && (
          <div className="lg:col-span-2">
            <FeedbackCard data={feedback} />
          </div>
        )}
      </div>
    </div>
  );
}
