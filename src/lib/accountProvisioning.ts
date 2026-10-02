export function validateAccountForm(fields: FormData): string {
  const value = (name: string) => String(fields.get(name) || '');
  if (!value('first_name').trim() || !value('last_name').trim()) return 'Enter both first and last name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email').trim())) return 'Enter a valid email address.';
  const password = value('password');
  if (password.length < 8 || password.length > 128) return 'Enter an initial password between 8 and 128 characters.';
  if (password !== value('confirm_password')) return 'Passwords do not match. Enter the same password in both fields.';
  return '';
}

import type { Profile } from '../types/database';

export function facultyDirectory(profiles: Profile[]) {
  return profiles.filter(profile => profile.role === 'teacher' || profile.role === 'admin').map(profile => ({
    role: profile.role as 'teacher' | 'admin', id: profile.id as string, prefix: profile.prefix as string | undefined,
    first_name: profile.first_name as string, last_name: profile.last_name as string,
    email: profile.email as string,
    school_name: (profile.school_name as string) || 'Biotechnology & Life Sciences Academy',
    department: (profile.department as string) || 'CTE Biomedical Science',
    created_at: profile.created_at as string | undefined,
  }));
}

