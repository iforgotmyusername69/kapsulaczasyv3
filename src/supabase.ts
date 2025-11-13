import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uafyvybjnpbmdxmkjits.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhZnl2eWJqbnBibWR4bWtqaXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMTg5NDMsImV4cCI6MjA3ODU5NDk0M30.tnGf3fuxQCTu9ry64BcR2Nhrixbu6zoVvcFmbEuXMzA';

export const supabase = createClient(supabaseUrl, supabaseKey);