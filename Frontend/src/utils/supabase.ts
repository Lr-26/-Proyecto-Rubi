import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : {
        from: () => ({
            select: () => Promise.resolve({ data: null, error: { message: "Supabase keys missing" } }),
            insert: () => Promise.resolve({ data: null, error: { message: "Supabase keys missing" } })
        })
    } as any;
