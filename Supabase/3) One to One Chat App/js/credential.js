// Apne Supabase project ka URL aur anon public key yahan likhein
// (Dashboard -> Project Settings -> API)
const PROJECTURL = `YOUR_SUPABASE_PROJECT_URL`;
const ANON_PUBLIC_KEY = `YOUR_SUPABASE_ANON_PUBLIC_KEY`;

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const configured = PROJECTURL.startsWith("http") && ANON_PUBLIC_KEY.length > 20;

// jab tak upar URL/key paste nahi hoti, supabase null rehta hai - baaki code isi se
// pata laga leta hai aur sample logon ke sath preview dikha deta hai, crash nahi hota
const supabase = configured ? createClient(PROJECTURL, ANON_PUBLIC_KEY) : null;

export default supabase;
