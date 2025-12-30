'use server';
/**
 * @fileOverview Matches a resume with relevant job roles based on skills, experience, and keywords.
 *
 * - matchResumeWithJobRoles - A function that matches a resume with job roles.
 * - MatchResumeWithJobRolesInput - The input type for the matchResumeWithJobRoles function.
 * - MatchResumeWithJobRolesOutput - The return type for the matchResumeWithJobRoles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchResumeWithJobRolesInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobRolePreferences: z.string().optional().describe('Optional preferences or keywords for the desired job role.'),
});
export type MatchResumeWithJobRolesInput = z.infer<
  typeof MatchResumeWithJobRolesInputSchema
>;

const MatchResumeWithJobRolesOutputSchema = z.object({
  matchedJobRoles: z
    .array(z.string())
    .describe('A list of job roles that match the resume.'),
  reasoning: z
    .string()
    .describe('Explanation of why the Job Roles were matched to the resume'),
});
export type MatchResumeWithJobRolesOutput = z.infer<
  typeof MatchResumeWithJobRolesOutputSchema
>;

export async function matchResumeWithJobRoles(
  input: MatchResumeWithJobRolesInput
): Promise<MatchResumeWithJobRolesOutput> {
  return matchResumeWithJobRolesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchResumeWithJobRolesPrompt',
  input: {
    schema: MatchResumeWithJobRolesInputSchema,
  },
  output: {
    schema: MatchResumeWithJobRolesOutputSchema,
  },
  prompt: `You are an AI resume analyzer that specializes in matching resumes to job roles.

Analyze the following resume and match it with relevant job roles based on the skills, experience, and keywords found in the resume. 

Consider the job role preferences, if any, when matching the resume with job roles.

Resume:
{{resumeText}}

Job Role Preferences: {{jobRolePreferences}}

Return a JSON object with a list of matched job roles and reasoning for each.
`,
});

const matchResumeWithJobRolesFlow = ai.defineFlow(
  {
    name: 'matchResumeWithJobRolesFlow',
    inputSchema: MatchResumeWithJobRolesInputSchema,
    outputSchema: MatchResumeWithJobRolesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
