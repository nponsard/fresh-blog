import { load } from 'https://deno.land/std@0.173.0/dotenv/mod.ts';

const _configData = await load({
  export: true,
  envPath: Deno.env.get('ENV_PATH') || '.env',
  defaultsPath: '.env.defaults',
});

export const MONGO_DATABASE = Deno.env.get('MONGO_DATABASE') || 'deno';
export const MONGO_URL =
  Deno.env.get('MONGO_URL') || 'mongodb://localhost:27017';

export const MINIO_HOST = Deno.env.get('MINIO_HOST') || 'localhost:9000';
export const MINIO_ACCESS = Deno.env.get('MINIO_ACCESS') || 'minio';
export const MINIO_SECRET = Deno.env.get('MINIO_SECRET') || 'minio123';
