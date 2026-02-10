import { z } from "zod";

export const microcmsContentIdSchema = z.object({
  id: z.string(),
});

export const microcmsDateSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
});

export const microcmsListContentSchema = microcmsContentIdSchema.extend(
  microcmsDateSchema.shape,
);

export function microcmsListResponseSchema<T extends z.ZodTypeAny>(
  itemSchema: T,
) {
  return z.object({
    contents: z.array(itemSchema),
    totalCount: z.number(),
    offset: z.number(),
    limit: z.number(),
  });
}
