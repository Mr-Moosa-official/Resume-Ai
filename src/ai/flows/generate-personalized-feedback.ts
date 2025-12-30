'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized feedback on a resume.
 *
 * The flow takes resume text and a job description as input and provides suggestions on how to improve the resume.
 * @fileOverview Resume Feedback Generator
 *
 * This module exports:
 * - `generatePersonalizedFeedback`: A function that generates personalized feedback for a resume.
 * - `PersonalizedFeedbackInput`: The input type for the `generatePersonalizedFeedback` function.
 * - `PersonalizedFeedbackOutput`: The output type for the `generatePersonalizedFeedback` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFeedbackInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be analyzed.'),
  jobDescription: z
    .string()
    .describe('The description of the job the user is applying for.'),
});
export type PersonalizedFeedbackInput = z.infer<
  typeof PersonalizedFeedbackInputSchema
>;

const PersonalizedFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe('Personalized suggestions on how to improve the resume.'),
});
export type PersonalizedFeedbackOutput = z.infer<
  typeof PersonalizedFeedbackOutputSchema
>;

export async function generatePersonalizedFeedback(
  input: PersonalizedFeedbackInput
): Promise<PersonalizedFeedbackOutput> {
  return generatePersonalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFeedbackPrompt',
  input: {schema: PersonalizedFeedbackInputSchema},
  output: {schema: PersonalizedFeedbackOutputSchema},
  prompt: `You are an expert resume advisor. Analyze the following resume and provide personalized suggestions on how to improve it, specifically for the job described below. Focus on areas where the resume can be strengthened to better match the job requirements.

Resume:
{{resumeText}}

Job Description:
{{jobDescription}}

Provide specific, actionable advice that the candidate can implement immediately.`,
});

const generatePersonalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedFeedbackFlow',
    inputSchema: PersonalizedFeedbackInputSchema,
    outputSchema: PersonalizedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
