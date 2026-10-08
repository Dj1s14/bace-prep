import { createPasswordResetHandler } from './handler.ts';
const runtime = (globalThis as unknown as { Deno: { env: { get(name: string): string | undefined }; serve(handler: (req: Request) => Promise<Response>): void } }).Deno;
runtime.serve(createPasswordResetHandler({ url: runtime.env.get('SUPABASE_URL') || '', serviceKey: runtime.env.get('SUPABASE_SERVICE_ROLE_KEY') || '' }));
