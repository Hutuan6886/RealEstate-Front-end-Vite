import { z } from "zod";

export const SearchFormSchema = z.object({
  search: z.string(),
});
