// TODO: manual fix required – env.ts is empty. Add environment variable utilities.
import { z } from 'zod';

const envSchema = z.object({
  API_KEY: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

export const API_KEY = process.env.API_KEY || '';

export const NODE_ENV = process.env.NODE_ENV || 'development';
