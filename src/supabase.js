import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ijjkxdvyqupsswahovmo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqamt4ZHZ5cXVwc3N3YWhvdm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNjI0MDQsImV4cCI6MjEwMzczODQwNH0.aU6N_Sq1mp496eyqeVin5ccGDUEZjblfTHFOGX-jSWM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)