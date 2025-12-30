import { config } from 'dotenv';
config();

import '@/ai/flows/generate-personalized-feedback.ts';
import '@/ai/flows/analyze-ats-score.ts';
import '@/ai/flows/match-resume-with-job-roles.ts';
import '@/ai/flows/identify-skill-gaps.ts';