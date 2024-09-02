import { ExternalLink } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import BigLabelInput from "../_components/BigLabelInput";
import { FormFieldset, FormInputGroup } from "../_components/Form";
import Glass from "../_components/Glass";
import H1 from "../_components/H1";
import Radio from "../_components/Radio";
import { UtilityLink, UtilitySubmit } from "../_components/UtilityButton";
import CompanySizeBarChart from "./_components/CompanySizeBarChart";
import {
  DATES_FROM_BICS_DATA,
  loadAllCompaniesData,
  SIC_SECTIONS_FROM_BICS_DATA,
} from "./_data";

export const metadata: Metadata = {
  title: "AI Adoption in UK Businesses - FirstStage Tools",
  description:
    "Benchmark your business to see how your business compares to similar organisations across the UK.",
  openGraph: {
    title: "AI Adoption in UK Businesses",
    description: "Compare your business with the rest of the UK",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Adoption in UK Businesses",
    description: "Compare your business with the rest of the UK",
    creator: "@opendigitalteam",
  },
};

export default function Page({
  searchParams,
}: {
  searchParams: {
    companySize: string;
    companySection: string;
    usingAI: string;
  };
}) {
  if (!searchParams.companySize || !searchParams.companySection) {
    redirect(`?companySize=all&companySection=all`);
  }

  const allCompaniesData = loadAllCompaniesData("all");
  const companiesOfSizeData = loadAllCompaniesData(searchParams.companySize);
  const companiesOfSectionData = loadAllCompaniesData(
    searchParams.companySection
  );

  return (
    <div className="flex flex-col gap-5 md:gap-10 xl:gap-20 pb-5 md:pb-10 xl:pb-20">
      <Glass>
        <div className="p-5 md:p-7 xl:p-10 2xl:p-14 flex flex-col gap-3 md:gap-5 xl:gap-8 text-odblue-black">
          {(searchParams.companySize === "all" &&
            searchParams.companySection === "all") || (
            <div className="flex flex-col gap-3 md:gap-5 xl:gap-8 text-center text-balance ">
              {searchParams.usingAI === "yes" ? (
                <div>
                  <H1>Congratulations! Your business is using AI</H1>
                  <p className="text-sm md:text-base">
                    You are ahead of the curve. AI adoption is still in its
                    early stages in the UK.
                  </p>
                </div>
              ) : searchParams.usingAI === "no" ? (
                <div>
                  <H1>Your business is not using AI</H1>
                  <p className="text-sm md:text-base">
                    AI adoption is still in its early stages in the UK. You are
                    not alone.
                  </p>
                </div>
              ) : (
                <div>
                  <H1>Benchmark Results</H1>
                  <p className="text-sm md:text-base">
                    AI adoption is still in its early stages in the UK.
                  </p>
                </div>
              )}

              <div className="flex justify-center gap-3 md:gap-5 xl:gap-8">
                <div className="flex-1 max-w-60 bg-odblue-lightest p-3 md:p-4 lg:p-5 rounded-lg">
                  <div className="text-4xl text-odblue-mid font-medium">
                    {Math.round(allCompaniesData[allCompaniesData.length - 1])}%
                  </div>
                  <div className="text-xs md:text-base">
                    of all businesses in the UK have adopted AI
                  </div>
                </div>

                <div className="flex-1 max-w-60 bg-odblue-lightest p-3 md:p-4 lg:p-5 rounded-lg">
                  <div className="text-4xl text-odblue-mid font-medium">
                    {Math.round(
                      companiesOfSizeData[companiesOfSizeData.length - 1]
                    )}
                    %
                  </div>
                  <div className="text-xs md:text-base">
                    of businesses with {searchParams.companySize} employees have
                    adopted AI
                  </div>
                </div>

                <div className="flex-1 max-w-60 bg-odblue-lightest p-3 md:p-4 lg:p-5 rounded-lg">
                  <div className="text-4xl text-odblue-mid font-medium">
                    {Math.round(
                      companiesOfSectionData[companiesOfSectionData.length - 1]
                    )}
                    %
                  </div>
                  <div className="text-xs md:text-base">
                    of {searchParams.companySection.toLocaleLowerCase()}{" "}
                    businesses have adopted AI
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex max-md:flex-col gap-3 md:gap-5 xl:gap-8">
            {searchParams.companySize === "all" &&
            searchParams.companySection === "all" ? (
              <div className="flex flex-col grow">
                <div className="md:text-center font-medium">
                  <H1>AI adoption in UK businesses</H1>
                </div>
                <CompanySizeBarChart
                  dates={DATES_FROM_BICS_DATA}
                  data={allCompaniesData}
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-between flex-1">
                  <div className="md:text-center font-medium">
                    AI adoption in companies with {searchParams.companySize}{" "}
                    employees
                  </div>
                  <CompanySizeBarChart
                    dates={DATES_FROM_BICS_DATA}
                    data={companiesOfSizeData}
                  />{" "}
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="md:text-center font-medium">
                    AI adoption in{" "}
                    {searchParams.companySection.toLocaleLowerCase()} companies
                  </div>
                  <CompanySizeBarChart
                    dates={DATES_FROM_BICS_DATA}
                    data={companiesOfSectionData}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Glass>

      <div className="flex flex-col gap-3 md:gap-5 xl:gap-8">
        <h2 className="text-xl font-bold !leading-tight sm:text-2xl lg:text-3xl 2xl:text-4">
          Benchmark your business
        </h2>

        <p className="text-lg max-w-3xl">
          Use the options below to see how your business compares to similar
          organisations across the UK. All data is based on the latest available
          from the{" "}
          <a
            href="https://www.ons.gov.uk/economy/economicoutputandproductivity/output/datasets/businessinsightsandimpactontheukeconomy"
            target="_blank"
            className="font-medium underline hover:text-odpink-mid inline-flex gap-0.5 items-center"
          >
            Office for National Statistics <ExternalLink size={16} />
          </a>
          .
        </p>

        <p>
          This is a free and{" "}
          <a
            href="https://github.com/opendigitalteam/firststage-tools/tree/main/app/(tools)/ai-adoption-uk"
            target="_blank"
            className="font-medium underline hover:text-odpink-mid inline-flex gap-0.5 items-center"
          >
            open source <ExternalLink size={12} />
          </a>{" "}
          tool built by the FirstStage team.
        </p>

        <form className="flex flex-col gap-3 md:gap-5 xl:gap-8">
          <FormFieldset legend="What is the size of your company?">
            <FormInputGroup>
              <div className="flex flex-wrap gap-3">
                {["0 - 9", "10 - 49", "50 - 99", "100 - 249", "250 +"].map(
                  (size) => (
                    <BigLabelInput
                      key={size}
                      input={
                        <Radio
                          name="companySize"
                          value={size}
                          defaultChecked={searchParams.companySize === size}
                          className="self-center"
                        />
                      }
                      label={size}
                    />
                  )
                )}
              </div>
            </FormInputGroup>
          </FormFieldset>

          <FormFieldset legend="Which category matches your business best?">
            <FormInputGroup>
              <div className="flex max-md:flex-col gap-3 flex-wrap">
                {SIC_SECTIONS_FROM_BICS_DATA.map((section) => (
                  <BigLabelInput
                    key={section}
                    input={
                      <Radio
                        name="companySection"
                        value={section}
                        defaultChecked={searchParams.companySection === section}
                        className="self-center"
                      />
                    }
                    label={section}
                  />
                ))}
              </div>
            </FormInputGroup>
          </FormFieldset>

          <FormFieldset legend="Are you using AI?">
            <FormInputGroup>
              <div className="flex gap-3">
                <BigLabelInput
                  input={
                    <Radio
                      name="usingAI"
                      value="yes"
                      defaultChecked={searchParams.usingAI === "yes"}
                      className="self-center"
                    />
                  }
                  label="Yes"
                />
                <BigLabelInput
                  input={
                    <Radio
                      name="usingAI"
                      value="no"
                      defaultChecked={searchParams.usingAI === "no"}
                      className="self-center"
                    />
                  }
                  label="No"
                />
              </div>
            </FormInputGroup>
          </FormFieldset>

          <div className="flex gap-3 max-md:flex-col">
            <UtilitySubmit size="xl" color="pink">
              Run Benchmark
            </UtilitySubmit>

            <UtilityLink size="xl" color="pink-light" href="/ai-adoption-uk">
              Show All Company Data
            </UtilityLink>
          </div>
        </form>
      </div>
    </div>
  );
}
