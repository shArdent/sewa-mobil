const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "postgres://postgres.jzgwcezvjnwnqtrdvghw:qTOPh2vtckE8O6RU@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Z3djZXp2am53bnF0cmR2Z2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxODE3NjAsImV4cCI6MjAzMTc1Nzc2MH0.-gUTYffsmBiZDpN8LjKDI7X9CDJ0zNbaex5B7JGf7mg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
