import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const envPath = path.resolve(__dirname, `../../.env.${env}`);

// path will become either .env.development or .env.production
dotenv.config({ path: envPath });

// fallbakc to .env
if (!process.env.SUPABASE_URL) {
  dotenv.config();
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log(`Running in ${env} mode with Supabase`);
