'use server';

/**
 * @fileOverview Analyzes the ATS score of a resume.
 *
 * - analyzeATSScore - A function that handles the ATS score analysis process.
 * - AnalyzeATSScoreInput - The input type for the analyzeATSScore function.
 * - AnalyzeATSScoreOutput - The return type for the analyzeATSScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeATSScoreInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobDescription: z.string().optional().describe('The job description for which the resume is being analyzed.'),
});
export type AnalyzeATSScoreInput = z.infer<typeof AnalyzeATSScoreInputSchema>;

const AnalyzeATSScoreOutputSchema = z.object({
  atsScore: z.number().describe('The ATS score of the resume, out of 100.'),
  feedback: z.string().describe('Personalized suggestions about how the candidate can improve their resume for ATS.'),
});
export type AnalyzeATSScoreOutput = z.infer<typeof AnalyzeATSScoreOutputSchema>;

export async function analyzeATSScore(input: AnalyzeATSScoreInput): Promise<AnalyzeATSScoreOutput> {
  return analyzeATSScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeATSScorePrompt',
  input: {schema: AnalyzeATSScoreInputSchema},
  output: {schema: AnalyzeATSScoreOutputSchema},
  prompt: `You are an expert resume analyst, specializing in Applicant Tracking Systems (ATS). You will analyze the resume text provided and provide an ATS score out of 100, as well as personalized feedback on how to improve the resume for ATS.

  Consider the job description if provided to tailor the feedback to the specific job role.

  Resume Text: {{{resumeText}}}

  Job Description: {{{jobDescription}}}

  Provide the ATS score and feedback in a structured format.
  `,
});

const analyzeATSScoreFlow = ai.defineFlow(
  {
    name: 'analyzeATSScoreFlow',
    inputSchema: AnalyzeATSScoreInputSchema,
    outputSchema: AnalyzeATSScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
