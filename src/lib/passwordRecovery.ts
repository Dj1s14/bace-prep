import { getSupabase } from './supabase';
export async function requestPasswordRecovery(email: string) {
  const client = getSupabase();
  if (!client) throw new Error('Authentication is not configured.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) throw new Error('Enter your account email address first.');
  const { error } = await client.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: new URL(import.meta.env.BASE_URL, window.location.origin).toString(),
  });
  if (error) throw error;
}
