import { Metadata } from "next";
import H1 from "../_components/H1";
import { researchFromCache } from "./_action";
import ResearchForm from "./_components/ResearchForm";
import ResearchFormResults from "./_components/ResearchFormResults";
import { AlternateJobTitle, ResearchQuery } from "./_domain";

export const metadata: Metadata = {
  title: "Alternative Job Titles - FirstStage Tools",
  description:
    "Research alternative job titles to attract the right volume and quality of candidates.",
  openGraph: {
    title: "Alternative Job Titles",
    description: "Use AI to research alternative job titles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alternative Job Titles",
    description: "Use AI to research alternative job titles",
    creator: "@opendigitalteam",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: { jobTitle: string; location: string };
}) {
  const queryValidation = ResearchQuery.safeParse(searchParams);
  let alternateJobTitles: AlternateJobTitle[] | undefined;

  if (queryValidation.success) {
    alternateJobTitles = await researchFromCache(queryValidation.data.jobTitle);
  }

  return (
    <div className="flex flex-col  max-w-3xl gap-3 md:gap-8">
      <H1>Alternate Job Titles</H1>

      <p className="text-lg text-balance">
        Picking the right job title to advertise can have a big influence over
        the number and quality of applications you receive. This is a free tool
        to help you research the best job title for your business.
      </p>

      <div className="flex flex-col gap-5 md:gap-7 xl:gap-10">
        <ResearchForm
          key={queryValidation.data?.jobTitle}
          jobTitle={queryValidation.data?.jobTitle}
        />

        <ResearchFormResults
          jobTitle={queryValidation.data?.jobTitle}
          alternateJobTitles={alternateJobTitles}
        />
      </div>
    </div>
  );
}
