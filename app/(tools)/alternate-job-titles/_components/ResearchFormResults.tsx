import Link from "next/link";
import { PropsWithChildren } from "react";
import Glass from "../../_components/Glass";
import { AlternateJobTitle } from "../_domain";

export default async function ResearchFormResults({
  jobTitle,
  alternateJobTitles,
}: {
  jobTitle?: string;
  alternateJobTitles?: AlternateJobTitle[];
}) {
  if (alternateJobTitles === undefined) {
    return;
  }

  return (
    <ResultsContainer jobTitle={jobTitle}>
      {alternateJobTitles
        .sort((a, b) => (a.relevance > b.relevance ? -1 : 1))
        .map((alternative, i) => (
          <tr key={i}>
            <td className="py-1 ">
              <Link
                href={`?${new URLSearchParams({
                  jobTitle: alternative.jobTitle,
                })}`}
                prefetch={false}
              >
                {alternative.jobTitle}
              </Link>{" "}
            </td>
            <td className="py-1 font-mono text-right max-sm:text-sm">
              {alternative.relevance.toLocaleString()}
            </td>
            <td className="py-1 font-mono text-right max-sm:text-sm">
              {Number(alternative.popularityScore).toLocaleString()}
            </td>
          </tr>
        ))}
    </ResultsContainer>
  );
}

export function LoadingResearchFormResults({
  jobTitle,
}: {
  jobTitle?: string;
}) {
  return (
    <ResultsContainer jobTitle={jobTitle}>
      <tr>
        <td colSpan={3}>Loading...</td>
      </tr>
    </ResultsContainer>
  );
}

function ResultsContainer({
  jobTitle,
  children,
}: PropsWithChildren & { jobTitle?: string }) {
  return (
    <Glass>
      <div className="flex flex-col gap-3 md:gap-5 xl:gap-7 p-3 md:p-5 xl:p-7">
        <h2 className="text-lg font-bold !leading-tight sm:text-xl lg:text-2xl 2xl:text-3xl">
          Results for {jobTitle}
        </h2>

        <table className="table-fixed w-full">
          <colgroup>
            <col className="md:w-2/4" />
            <col className="md:w-1/4" />
            <col className="md:w-1/4" />
          </colgroup>

          <thead className="border-b text-lg">
            <tr>
              <th className="text-left pb-2">Job Title</th>
              <th className="text-right pb-2">Relevance</th>
              <th className="text-right pb-2">Popularity</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>

        <div className="border-t pt-3 md:pt-5 xl:pt-7">
          <p className="text-sm text-balance opacity-75">
            These are the top 10 job titles that are similar to the one you
            entered. The relevance score is a measure of how similar the job
            title is to the one you entered. The popularity score is a measure
            of how often the job title is used in job postings based on number
            of search engine results.
          </p>
        </div>
      </div>
    </Glass>
  );
}
