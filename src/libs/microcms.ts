import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { z } from "zod";
import {
  type ExperienceListResponse,
  experienceListSchema,
} from "@/schemas/experience";

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// Client SDKの初期化を行う
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

async function fetchList<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  queries?: MicroCMSQueries,
): Promise<T> {
  const data = await client.getList({
    endpoint,
    queries,
  });
  return schema.parse(data);
}

export async function getExperiences(
  queries?: MicroCMSQueries,
): Promise<ExperienceListResponse> {
  return fetchList("experiencies", experienceListSchema, queries);
}
