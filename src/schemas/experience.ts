import { z } from "zod";
import {
  microcmsListContentSchema,
  microcmsListResponseSchema,
} from "./microcms";

export const experienceSchema = microcmsListContentSchema.extend({
  name: z.string(),
  role: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
});

export const experienceListSchema =
  microcmsListResponseSchema(experienceSchema);

export type Experience = z.infer<typeof experienceSchema>;
export type ExperienceListResponse = z.infer<typeof experienceListSchema>;
