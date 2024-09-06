import { countries, TCountryCode } from "countries-list";
import { z } from "zod";

export const CountryCode = z.custom<TCountryCode | "global">(
  (countryCode) =>
    countries.hasOwnProperty(countryCode) || countryCode === "global"
);
export type CountryCode = z.infer<typeof CountryCode>;

export const ResearchQuery = z.object({
  jobTitle: z.string().min(1, "Enter job title"),
  location: CountryCode.default("global"),
});
export type ResearchQuery = z.infer<typeof ResearchQuery>;

export const AlternateJobTitle = z.object({
  jobTitle: z.string(),
  relevance: z.number(),
  popularityScore: z.number(),
  indeedScore: z.number(),
  linkedInScore: z.number(),
});
export type AlternateJobTitle = z.infer<typeof AlternateJobTitle>;
