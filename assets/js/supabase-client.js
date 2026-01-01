
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// These should be replaced by your actual environment variables in a build process
// For now, we manually inject them or expect them to be available globally
const supabaseUrl = 'https://earawrdnhkagxcytrham.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcmF3cmRuaGthZ3hjeXRyaGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNjU5NDgsImV4cCI6MjA4Mjg0MTk0OH0.OFqM1PeQ5IxvhjiWhDSpTtiWfWBS29xPgP-szSPj3SM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Log status
console.log('Supabase client initialized');
