alter function public.join_class_by_code(text) set schema private;
revoke all on function private.join_class_by_code(text) from public, anon;
grant execute on function private.join_class_by_code(text) to authenticated;
create function public.join_class_by_code(join_code_input text) returns void language sql security invoker set search_path = '' as $$ select private.join_class_by_code(join_code_input); $$;
revoke all on function public.join_class_by_code(text) from public, anon;
grant execute on function public.join_class_by_code(text) to authenticated;
