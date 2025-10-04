const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000/api',
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  prod: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || '',
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },
};

const getEnvVars = () => {
  const env = process.env.EXPO_PUBLIC_ENV || 'development';

  if (env === 'production') {
    return ENV.prod;
  }
  return ENV.dev;
};

export default getEnvVars();
