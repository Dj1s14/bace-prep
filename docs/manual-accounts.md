# Manual student and teacher accounts

In production, Admin Portal → Student Management → Add Student and Teacher Management → Provision Teacher create Supabase Auth logins and matching `profiles` rows. Faculty can also use Add Student from their class roster.

Enter the user's name, email and initial password (8–128 characters). Students may be assigned a class; teachers creating students must select a class they own. Administrators can create either role. No screen allows creating another administrator. Share the initial credentials privately. Password recovery remains available to change the initial password.

The `provision-account` Edge Function validates the caller with Supabase Auth, then reads their current database role. Teacher requests must name an owned class. It calls the Auth Admin API with `email_confirm: true`, so manually provisioned accounts can sign in immediately, even when self-registration confirmation is enabled. It does not sign the creator out, send invitations, or change existing accounts. It attempts to remove the newly created login and profile if profile setup fails.

The function uses the runtime's `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Never put the service role key in Vite environment variables or the Pages build. Deploy `supabase/functions/provision-account/index.ts` with JWT verification enabled. CORS permits `https://baceprep.jisd.link` and `https://dj1s14.github.io`.

For self-registration, Authentication → Sign In / Providers → Email → Confirm email should be off to match this project's desired behavior. The hosted Auth settings endpoint reported `mailer_autoconfirm: true` on October 1, 2026. Repository changes do not control that dashboard setting.

Validation: `npm run lint`, `npm test`, `npm run build:pages`. Backend tests cover administrator provisioning, student denial, teacher class ownership, role escalation, invalid input, duplicates and cleanup. Live release checks also created temporary teacher and student accounts, signed them in without confirmation, checked teacher ownership restrictions and duplicate rejection, and removed the temporary data after testing.
