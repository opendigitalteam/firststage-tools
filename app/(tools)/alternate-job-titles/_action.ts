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
import { redirect } from "next/navigation";
import OpenAI from "openai";
import { z, ZodFormattedError } from "zod";
import { AlternateJobTitle, ResearchQuery } from "./_domain";

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
  });

  if (validation.success) {
    try {
      await suggestRankedAlternatives(validation.data.jobTitle);
    } catch (err) {
      console.error(err);
    }
    redirect(`?${new URLSearchParams({ jobTitle: validation.data.jobTitle })}`);
  } else {
    return validation.error.format();
  }
}

type ResearchFromCacheResponse = AlternateJobTitle[] | undefined;

export async function researchFromCache(
  jobTitle: string
): Promise<ResearchFromCacheResponse> {
  const query = ResearchQuery.parse({
    jobTitle,
  });

  const response = await FetchCacheData({
    gateway: cacheGateway,
    keyPrefix: "tools/alternate-job-titles/ranked-alternatives-v2",
    key: query.jobTitle,
  });

  if (response) {
    return response.data.alternatives;
  }
}

async function suggestRankedAlternatives(
  jobTitle: string
): Promise<AlternateJobTitle[]> {
  const response = await DoOnce(
    {
      gateway: cacheGateway,
      keyPrefix: "tools/alternate-job-titles/ranked-alternatives-v2",
      key: jobTitle,
    },
    async () => {
      const alternatives = await searchResults(
        [
          {
            jobTitle,
            relevance: 10,
          },
          ...(await suggestAlternatives(jobTitle)),
        ].slice(0, 10)
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
  const response = await CreateChatCompletion({
    gateway: completionGateway,
    messages: [
      {
        role: "system",
        content: `
I'm trying to find some alternative job titles. 

Provide a relevance score out of 10, with 10 being most relevant.

Come up with at least 10 alternatives.

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
            .object({ jobTitle: z.string(), relevance: z.number() })
            .array(),
        })
        .parse(input),
  });

  if (response.ok) {
    return response.content.alternatives;
  } else {
    return [];
  }
}

async function searchResults(
  alternatives: { jobTitle: string; relevance: number }[]
) {
  return Promise.all(
    alternatives.map(async ({ jobTitle, relevance }) => {
      const { popularityScore } = await searchForJob(jobTitle);
      return { jobTitle, relevance, popularityScore };
    })
  );
}

async function searchForJob(jobTitle: string) {
  const response = await DoOnce(
    {
      gateway: cacheGateway,
      keyPrefix: "tools/alternate-job-titles/job-google-search-v4",
      key: jobTitle,
    },
    async () =>
      await Search({
        gateway: new GoogleCustomSearchGateway({
          apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
          engineId: GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID,
        }),
        query: `${jobTitle} jobs`,
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
