-- Applied to Supabase project gfdbcrfqbsowlbnprqqn on 2026-09-28.
-- Prevent public Data API callers from invoking the SECURITY DEFINER event-trigger helper.
revoke execute on function public.rls_auto_enable() from public;
revoke execute on function public.rls_auto_enable() from anon;
revoke execute on function public.rls_auto_enable() from authenticated;
