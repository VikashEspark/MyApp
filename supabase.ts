import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = 'https://dzokxprrmapwexagwafe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6b2t4cHJybWFwd2V4YWd3YWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDY3ODcsImV4cCI6MjA1MDUyMjc4N30.FKT8isutY7CAIp-6c4cMvQeiAniGmpL4MdE1dTPctEY';

const supabase = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

export default supabase;
