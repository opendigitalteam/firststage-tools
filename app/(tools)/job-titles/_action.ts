"use server";
import "server-only";

import {
  AWS_S3_CACHE_BUCKET,
  GOOGLE_CUSTOM_SEARCH_API_KEY,
  GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID,
  OPENAI_API_KEY,
} from "@/app/_constants";
import { DoOnce, FetchCacheData } from "@aitoolkit/cache";
import { CacheDataS3Gateway } from "@aitoolkit/cache/s3";
import { CreateChatCompletion } from "@aitoolkit/complete";
import { OpenAIChatCompletionGateway } from "@aitoolkit/complete/openai";
import { Search } from "@aitoolkit/search";
import GoogleCustomSearchGateway from "@aitoolkit/search/gateways/GoogleCustomSearchGateway";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import OpenAI from "openai";
import { z, ZodFormattedError } from "zod";
import {
  AlternateJobTitle,
  CountryCode,
  JobTitle,
  ResearchQuery,
} from "./_domain";
import {
  indeedDomainsByCountryCode,
  linkedInDomainsByCountryCode,
} from "./_jobSites";

const CACHE_VERSION = "v10";

const completionGateway = new OpenAIChatCompletionGateway({
  client: new OpenAI({ apiKey: OPENAI_API_KEY }),
});
const cacheGateway = new CacheDataS3Gateway({
  bucketName: AWS_S3_CACHE_BUCKET,
});

type ResearchResponse = ZodFormattedError<ResearchQuery> | undefined;

export async function research(
  prevState: ResearchResponse,
  formData: FormData
): Promise<ResearchResponse> {
  const validation = ResearchQuery.safeParse({
    jobTitle: formData.get("jobTitle"),
    location: formData.get("location"),
  });

  if (validation.success) {
    try {
      await suggestRankedAlternatives(
        validation.data.jobTitle,
        validation.data.location
      );
    } catch (err) {
      console.error(err);
    }
    redirect(`?${new URLSearchParams(validation.data)}`);
  } else {
    return validation.error.format();
  }
}

type ResearchFromCacheResponse = AlternateJobTitle[] | undefined;

export async function researchFromCache(
  jobTitle: string,
  location: CountryCode
): Promise<ResearchFromCacheResponse> {
  const query = ResearchQuery.parse({
    jobTitle,
    location,
  });

  const response = await FetchCacheData({
    gateway: cacheGateway,
    keyPrefix: `tools/alternate-job-titles/ranked-alternatives-${CACHE_VERSION}`,
    key: `${query.jobTitle}-${query.location}`,
  });

  if (response) {
    return response.data.alternatives;
  }
}

async function suggestRankedAlternatives(
  jobTitle: string,
  location: CountryCode
): Promise<AlternateJobTitle[]> {
  const response = await DoOnce(
    {
      gateway: cacheGateway,
      keyPrefix: `tools/alternate-job-titles/ranked-alternatives-${CACHE_VERSION}`,
      key: `${jobTitle}-${location}`,
    },
    async () => {
      const alternatives = await searchResults(
        [
          {
            jobTitle,
            relevance: 10,
          },
          ...(await suggestAlternatives(jobTitle)),
        ].slice(0, 10),
        location
      );
      return { alternatives };
    }
  );

  if (!response.ok) {
    throw new Error("Failed to suggest alternatives");
  }

  return response.data.alternatives;
}

async function suggestAlternatives(jobTitle: string) {
  const response = await DoOnce(
    {
      gateway: cacheGateway,
      keyPrefix: `tools/alternate-job-titles/suggest-alternatives-${CACHE_VERSION}`,
      key: jobTitle,
    },
    async () => {
      const response = await CreateChatCompletion({
        gateway: completionGateway,
        messages: [
          {
            role: "system",
            content: `
I'm trying to find some alternative job titles. 

Provide a relevance score out of 10, with 10 being most relevant.

Come up with at least 20 alternatives.

Respond with JSON in this format:

{"alternatives": [{ "jobTitle": string, "relevance": number]}
            `,
          },
          {
            role: "user",
            content: jobTitle,
          },
        ],
        responseValidator: (input) =>
          z
            .object({
              alternatives: z
                .object({ jobTitle: JobTitle, relevance: z.number() })
                .array(),
            })
            .parse(input),
      });

      if (response.ok) {
        return { alternatives: response.content.alternatives };
      } else {
        return { alternatives: [] };
      }
    }
  );

  return (response.data?.alternatives || []).sort(
    (a: AlternateJobTitle, b: AlternateJobTitle) => b.relevance - a.relevance
  );
}

async function searchResults(
  alternatives: { jobTitle: string; relevance: number }[],
  location: CountryCode
) {
  return Promise.all(
    alternatives.map(async ({ jobTitle, relevance }) => {
      const [{ popularityScore }, { indeedScore }, { linkedInScore }] =
        await Promise.all([
          searchForJob(jobTitle, location),
          searchForJobOnIndeed(jobTitle, location),
          searchForJobOnLinkedIn(jobTitle, location),
        ]);
      return AlternateJobTitle.parse({
        jobTitle,
        relevance,
        popularityScore,
        indeedScore,
        linkedInScore,
      });
    })
  );
}

async function searchForJob(jobTitle: string, location: CountryCode) {
  const query = location
    ? `"${jobTitle}" jobs in ${location}`
    : `"${jobTitle}" jobs`;

  const response = await DoOnce(
    {
      gateway: cacheGateway,
      keyPrefix: `tools/alternate-job-titles/job-google-search-${CACHE_VERSION}`,
      key: query,
    },
    async () =>
      await Search({
        gateway: new GoogleCustomSearchGateway({
          apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
          engineId: GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID,
        }),
        query,
      })
  );

  if (response.ok) {
    return {
      jobTitle,
      popularityScore: response.data.totalResults || 0,
    };
  } else {
    return {
      jobTitle,
      popularityScore: 0,
    };
  }
}

async function searchForJobOnIndeed(jobTitle: string, location: CountryCode) {
  const afterDate = DateTime.now()
    .minus({ month: 4 })
    .startOf("month")
    .toISODate();
  const beforeDate = DateTime.now()
    .minus({ month: 1 })
    .endOf("month")
    .toISODate();

  const indeedDomain =
    location && location !== "global"
      ? indeedDomainsByCountryCode[location]
      : "indeed.com";

  const query = `intitle:"${jobTitle}" site:${indeedDomain}/viewjob after:${afterDate} before:${beforeDate}`;

  const response = await DoOnce(
    {
      gateway: cacheGateway,
      keyPrefix: `tools/alternate-job-titles/job-on-indeed-google-search-${CACHE_VERSION}`,
      key: query,
    },
    async () =>
      await Search({
        gateway: new GoogleCustomSearchGateway({
          apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
          engineId: GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID,
        }),
        query,
      })
  );

  if (response.ok) {
    return {
      jobTitle,
      indeedScore: response.data.totalResults || 0,
    };
  } else {
    return {
      jobTitle,
      indeedScore: 0,
    };
  }
}

async function searchForJobOnLinkedIn(jobTitle: string, location: CountryCode) {
  const afterDate = DateTime.now()
    .minus({ month: 4 })
    .startOf("month")
    .toISODate();
  const beforeDate = DateTime.now()
    .minus({ month: 1 })
    .endOf("month")
    .toISODate();

  const linkedInDomains =
    location && location !== "global"
      ? linkedInDomainsByCountryCode[location]
      : "linkedin.com";

  const query = `intitle:"${jobTitle}" site:${linkedInDomains}/jobs/view after:${afterDate} before:${beforeDate}`;

  const response = await DoOnce(
    {
      gateway: cacheGateway,
      keyPrefix: `tools/alternate-job-titles/job-on-li-google-search-${CACHE_VERSION}`,
      key: query,
    },
    async () =>
      await Search({
        gateway: new GoogleCustomSearchGateway({
          apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
          engineId: GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID,
        }),
        query,
      })
  );

  if (response.ok) {
    return {
      jobTitle,
      linkedInScore: response.data.totalResults || 0,
    };
  } else {
    return {
      jobTitle,
      linkedInScore: 0,
    };
  }
}
