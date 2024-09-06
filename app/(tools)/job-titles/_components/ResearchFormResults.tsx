import { countries } from "countries-list";
import Link from "next/link";
import { PropsWithChildren } from "react";
import Glass from "../../_components/Glass";
import { AlternateJobTitle, CountryCode } from "../_domain";

export default async function ResearchFormResults({
  jobTitle,
  alternateJobTitles,
  location,
}: {
  jobTitle?: string;
  alternateJobTitles?: AlternateJobTitle[];
  location: CountryCode;
}) {
  if (alternateJobTitles === undefined) {
    return;
  }

  return (
    <ResultsContainer jobTitle={jobTitle} location={location}>
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
            <td className="py-1 font-mono text-right max-sm:text-sm">
              {Number(alternative.indeedScore).toLocaleString()}
            </td>
            <td className="py-1 font-mono text-right max-sm:text-sm">
              {Number(alternative.linkedInScore).toLocaleString()}
            </td>
          </tr>
        ))}
    </ResultsContainer>
  );
}

function ResultsContainer({
  jobTitle,
  location,
  children,
}: PropsWithChildren & { jobTitle?: string; location: CountryCode }) {
  return (
    <Glass>
      <div className="flex flex-col gap-3 md:gap-5 xl:gap-7 p-3 md:p-5 xl:p-7">
        <h2 className="text-lg font-bold !leading-tight sm:text-xl lg:text-2xl 2xl:text-3xl">
          Results for {jobTitle},{" "}
          {location !== "global" ? countries[location]?.name : "Global"}
        </h2>

        <table className="table w-full">
          <colgroup>
            <col className="md:grow" />
            <col className="md:shrink" />
            <col className="md:shrink" />
            <col className="md:shrink" />
          </colgroup>

          <thead className="border-b text-lg">
            <tr>
              <th className="text-left pb-2">Job Title</th>
              <th className="text-right pb-2">Relevance</th>
              <th className="text-right pb-2">Popularity</th>
              <th className="text-right pb-2">Indeed</th>
              <th className="text-right pb-2">LinkedIn</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>

        <div className="text-sm flex flex-col gap-3 md:gap-5 border-t pt-3 md:pt-5 xl:pt-7">
          <p className="max-w-2xl opacity-75">
            These are the top 10 job titles that are similar to the one you
            entered. The relevance score is a measure of how similar the job
            title is to the one you entered. The popularity score is a measure
            of how often the job title is used in job postings based on number
            of search engine results. The Indeed and LinkedIn scores are a
            measure of how often the job title was used in job postings on the
            respective site in the three months previous.
          </p>

          <p className="max-w-2xl opacity-75">
            Picking the right job title to advertise can have a big influence
            over the number and quality of applications you receive. Same goes
            for when you are deciding who to sell to. Use this tool to research
            the best job title.
          </p>

          <p>
            <Link
              href="?"
              className="font-medium underline hover:text-odpink-mid"
            >
              Looking for more inspiration?
            </Link>
          </p>
        </div>
      </div>
    </Glass>
  );
}
