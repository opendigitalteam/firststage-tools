import { z } from "zod";

export const ResearchQuery = z.object({
  jobTitle: z.string().min(1, "Enter job title"),
});
export type ResearchQuery = z.infer<typeof ResearchQuery>;

export const AlternateJobTitle = z.object({
  jobTitle: z.string(),
  relevance: z.number(),
  popularityScore: z.number(),
});
export type AlternateJobTitle = z.infer<typeof AlternateJobTitle>;
