// Apne Supabase project ka URL aur anon public key yahan likhein
// (Dashboard -> Project Settings -> API)
const PROJECTURL = `YOUR_SUPABASE_PROJECT_URL`;
const ANON_PUBLIC_KEY = `YOUR_SUPABASE_ANON_PUBLIC_KEY`;

const supabase = window.supabase.createClient(PROJECTURL, ANON_PUBLIC_KEY);
export default supabase;
