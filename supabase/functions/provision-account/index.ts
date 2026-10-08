import { createProvisionHandler } from './handler.ts';

// Supabase provides these server-only environment variables. They never enter the Pages bundle.
const runtime = (globalThis as unknown as { Deno: { env: { get(name: string): string | undefined }; serve(handler: (req: Request) => Promise<Response>): void } }).Deno;
runtime.serve(createProvisionHandler({
  url: runtime.env.get('SUPABASE_URL') || '',
  serviceKey: runtime.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
}));
