import { Metadata } from "next";
import H1 from "../_components/H1";
import { researchFromCache } from "./_action";
import ExamplesToTry from "./_components/ExamplesToTry";
import ResearchForm from "./_components/ResearchForm";
import ResearchFormResults from "./_components/ResearchFormResults";
import { AlternateJobTitle, ResearchQuery } from "./_domain";

export const metadata: Metadata = {
  title: "Job Title Research Tool - FirstStage Tools",
  description:
    " This is a free tool to help you research job title popularity and find alternatives you might not have thought of",
  openGraph: {
    title: "Job Title Research Tool",
    description: "Use AI to research job titles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Title Research Tool",
    description: "Use AI to research job titles",
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
    alternateJobTitles = await researchFromCache(
      queryValidation.data.jobTitle,
      queryValidation.data.location
    );
  }

  return (
    <div className="flex flex-col  max-w-5xl gap-3 md:gap-8">
      <H1>Job Title Research Tool</H1>

      <p className="text-sm sm:text-base md:text-lg sm:text-balance max-w-3xl">
        This is a free tool to help you research job title popularity and find
        alternatives you might not have thought of.
      </p>

      <div className="flex flex-col gap-5 md:gap-7 xl:gap-10">
        <ResearchForm
          key={queryValidation.data?.jobTitle}
          jobTitle={queryValidation.data?.jobTitle}
          location={queryValidation.data?.location}
          autoSubmit={alternateJobTitles === undefined}
        />

        {queryValidation.data?.jobTitle ? (
          <ResearchFormResults
            jobTitle={queryValidation.data?.jobTitle}
            location={queryValidation.data?.location}
            alternateJobTitles={alternateJobTitles}
          />
        ) : (
          <ExamplesToTry />
        )}
      </div>
    </div>
  );
}
