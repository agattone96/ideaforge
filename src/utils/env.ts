import { z } from 'zod';

const envSchema = z.object({
  API_KEY: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

export const API_KEY = parsedEnv.API_KEY;
export default parsedEnv;
