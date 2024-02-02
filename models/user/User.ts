import { z } from "zod";

export type UserDataModelInterface = {
  id: number;
  name: string;
  phone: string;
};

export const UserDataModel = z.object({
  name: z.string(),
  id: z.number(),
  phone: z.string(),
});
