// use server'

/**
 * @fileOverview Flow for identifying skill gaps in a resume compared to a job role and suggesting skills to learn or improve.
 *
 * - identifySkillGaps - A function that handles the skill gap identification process.
 * - IdentifySkillGapsInput - The input type for the identifySkillGaps function.
 * - IdentifySkillGapsOutput - The return type for the identifySkillGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifySkillGapsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to analyze.'),
  jobRoleDescription: z
    .string()
    .describe('The description of the job role to compare against.'),
});
export type IdentifySkillGapsInput = z.infer<typeof IdentifySkillGapsInputSchema>;

const IdentifySkillGapsOutputSchema = z.object({
  missingSkills: z
    .array(z.string())
    .describe('Skills missing from the resume compared to the job role.'),
  suggestedSkillsToImprove: z
    .array(z.string())
    .describe('Skills in the resume that could be improved to better match the job role.'),
  overallFeedback: z
    .string()
    .describe('Suggestions on how to improve the resume to better match the job role.'),
});
export type IdentifySkillGapsOutput = z.infer<typeof IdentifySkillGapsOutputSchema>;

export async function identifySkillGaps(input: IdentifySkillGapsInput): Promise<IdentifySkillGapsOutput> {
  return identifySkillGapsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifySkillGapsPrompt',
  input: {schema: IdentifySkillGapsInputSchema},
  output: {schema: IdentifySkillGapsOutputSchema},
  prompt: `You are a resume expert. Compare the resume and job role description to generate an analysis of missing skills and suggestions on how to improve the resume.

    Resume:
    {{resumeText}}

    Job Role Description:
    {{jobRoleDescription}}

    Identify skills missing from the resume that are present in the job role description.  Suggest skills in the resume that could be improved to better match the job role.  Also give suggestions on how to generally improve the resume to better match the job role. Return the missing skills, suggested skills to improve and overall feedback in the format specified by the schema. Focus on technical skills and required experience.
    `,
});

const identifySkillGapsFlow = ai.defineFlow(
  {
    name: 'identifySkillGapsFlow',
    inputSchema: IdentifySkillGapsInputSchema,
    outputSchema: IdentifySkillGapsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
