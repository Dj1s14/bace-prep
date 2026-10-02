update public.assignment_progress
set status = 'Pending'
where status = 'Assigned';

alter table public.assignment_progress
alter column status set default 'Pending';
