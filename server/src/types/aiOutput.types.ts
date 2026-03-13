import { z } from "zod";

export const aiOutputSchema = z.object({
  refinedIdea: z
    .string()
    .describe(
      "refinedIdea: A clearer, more precise and actionable version of the user's idea in maximum 2 sentences",
    ),
  strengths: z
    .array(z.string())
    .describe("strengths: Exactly 3 key strengths or advantages of this idea"),
  weaknesses: z
    .array(z.string())
    .describe("weaknesses: Exactly 3 potential weaknesses or challenges of this idea"),
  nextSteps: z
    .array(z.string())
    .describe("nextSteps: Exactly 4 concrete actionable next steps to move this idea forward"),
  questions: z
    .array(z.string())
    .describe(
      "questions: Exactly 2 thought provoking questions to help the user refine their idea further(Use socratic method)",
    ),
});
