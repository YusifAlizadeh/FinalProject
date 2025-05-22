import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ssrwukmvyyurhigverwn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcnd1a212eXl1cmhpZ3ZlcnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxOTEwMDUsImV4cCI6MjA1OTc2NzAwNX0.vJzhPs2PGmksIxdwPkS4ygsHSOj-9bPJjqZA4t8vY_Y";

const supabase = createClient(supabaseUrl,supabaseAnonKey);

export default supabase;