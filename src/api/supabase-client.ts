import { createClient } from "@supabase/supabase-js";
import { envConfig } from "@/config";

export const supabase = createClient(
  envConfig.supbaseUrl,
  envConfig.supbaseAnonKey,
);
