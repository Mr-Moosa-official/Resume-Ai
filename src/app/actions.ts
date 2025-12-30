'use server';

import {
  analyzeATSScore,
  AnalyzeATSScoreOutput,
} from '@/ai/flows/analyze-ats-score';
import {
  generatePersonalizedFeedback,
  PersonalizedFeedbackOutput,
} from '@/ai/flows/generate-personalized-feedback';
import {
  identifySkillGaps,
  IdentifySkillGapsOutput,
} from '@/ai/flows/identify-skill-gaps';
import {
  matchResumeWithJobRoles,
  MatchResumeWithJobRolesOutput,
} from '@/ai/flows/match-resume-with-job-roles';

export type AnalysisResults = {
  atsScore: AnalyzeATSScoreOutput;
  skillGaps: IdentifySkillGapsOutput;
  jobMatches: MatchResumeWithJobRolesOutput;
  feedback: PersonalizedFeedbackOutput;
};

export async function analyzeResume({
  resumeText,
  jobDescription,
}: {
  resumeText: string;
  jobDescription: string;
}): Promise<Partial<AnalysisResults> & { error?: string }> {
  try {
    if (!resumeText.trim()) {
      return { error: 'Resume text cannot be empty.' };
    }
    if (!jobDescription.trim()) {
      return { error: 'Job description cannot be empty.' };
    }

    const [atsScore, skillGaps, jobMatches, feedback] = await Promise.all([
      analyzeATSScore({ resumeText, jobDescription }),
      identifySkillGaps({
        resumeText,
        jobRoleDescription: jobDescription,
      }),
      matchResumeWithJobRoles({
        resumeText,
        jobRolePreferences: jobDescription,
      }),
      generatePersonalizedFeedback({ resumeText, jobDescription }),
    ]);

    return { atsScore, skillGaps, jobMatches, feedback };
  } catch (e) {
    console.error('An error occurred during resume analysis:', e);
    // Provide a user-friendly error message
    return {
      error:
        'An unexpected error occurred while analyzing the resume. Please try again later.',
    };
  }
}
