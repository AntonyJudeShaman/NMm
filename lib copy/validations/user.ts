import * as z from "zod";

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
  email: z.string().email(), 
  // address: z.string().min(5), 
  // phone: z.string().min(10).max(15), 
  // birthdate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/), 
});
