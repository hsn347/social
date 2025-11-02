import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://jzsqzbzgymffwpbrripz.supabase.co";

const supaKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6c3F6YnpneW1mZndwYnJyaXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTEyMzUsImV4cCI6MjA3NDgyNzIzNX0.JZyUyDhS5P7OtvgMbjz9l9M12TVgbvmNm3L2uu-PcNs" ;

export const supabase = createClient(supabaseUrl , supaKey);