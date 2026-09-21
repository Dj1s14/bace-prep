import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Question, Assignment, LessonGradeRecord } from '../types/database';

// Safe environment variable resolution with fallback to user's provided credentials
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://gfdbcrfqbsowlbnprqqn.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZGJjcmZxYnNvd2xibnBycXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMTQ2NzgsImV4cCI6MjEwNDc5MDY3OH0.sW9iok1K2DWIThYfJIsQIDnu26r5Xh3L7p-6i4xUyQs';

let supabaseClient: SupabaseClient | null = null;

/**
 * Lazily initialize and return the Supabase client
 */
export function getSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }
  if (!supabaseClient) {
    try {
      supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseClient;
}

export const supabase = getSupabase();

export interface SupabaseHealthResult {
  connected: boolean;
  projectRef: string;
  projectUrl: string;
  authWorking: boolean;
  tablesFound: string[];
  tablesMissing: string[];
  latencyMs: number;
  message: string;
}

/**
 * Diagnostic check to test connection status to the Supabase endpoint and inspect table schema
 */
export async function testSupabaseConnection(): Promise<SupabaseHealthResult> {
  const start = performance.now();
  const url = SUPABASE_URL;
  const anonKey = SUPABASE_ANON_KEY;

  let projectRef = 'gfdbcrfqbsowlbnprqqn';
  try {
    const urlObj = new URL(url);
    projectRef = urlObj.hostname.split('.')[0];
  } catch {
    // fallback
  }

  try {
    // 1. Test Auth service endpoint
    const authRes = await fetch(`${url}/auth/v1/settings`, {
      method: 'GET',
      headers: {
        apikey: anonKey,
      },
    });

    const latencyMs = Math.round(performance.now() - start);

    if (!authRes.ok) {
      return {
        connected: false,
        projectRef,
        projectUrl: url,
        authWorking: false,
        tablesFound: [],
        tablesMissing: ['questions', 'assignments', 'lesson_grades'],
        latencyMs,
        message: `Connection failed with status ${authRes.status}: ${authRes.statusText}`,
      };
    }

    // 2. Check if primary tables exist in public schema
    const checkTables = ['questions', 'assignments', 'lesson_grades', 'domains'];
    const tablesFound: string[] = [];
    const tablesMissing: string[] = [];

    await Promise.all(
      checkTables.map(async (tableName) => {
        try {
          const res = await fetch(`${url}/rest/v1/${tableName}?select=count`, {
            method: 'HEAD',
            headers: {
              apikey: anonKey,
              Authorization: `Bearer ${anonKey}`,
            },
          });
          if (res.ok) {
            tablesFound.push(tableName);
          } else {
            tablesMissing.push(tableName);
          }
        } catch {
          tablesMissing.push(tableName);
        }
      })
    );

    return {
      connected: true,
      projectRef,
      projectUrl: url,
      authWorking: true,
      tablesFound,
      tablesMissing,
      latencyMs,
      message:
        tablesFound.length > 0
          ? `Connected to Supabase (${projectRef}) - ${tablesFound.length} tables active.`
          : `Connected to Supabase (${projectRef})! Database is reachable. Run SQL schema in Supabase to create tables.`,
    };
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      connected: false,
      projectRef,
      projectUrl: url,
      authWorking: false,
      tablesFound: [],
      tablesMissing: ['questions', 'assignments', 'lesson_grades'],
      latencyMs,
      message: `Network error connecting to Supabase: ${err?.message || 'Check connection'}`,
    };
  }
}

/**
 * Upsert questions into Supabase
 */
export async function syncQuestionsToSupabase(questions: Question[]): Promise<{ count: number; error?: string }> {
  const client = getSupabase();
  if (!client) return { count: 0, error: 'Supabase client not initialized' };

  try {
    const records = questions.map((q) => ({
      id: q.id,
      domain_id: q.domain_id,
      topic_id: q.topic_id,
      lesson_id: q.lesson_id || null,
      question_type: q.question_type || 'multiple_choice',
      difficulty: q.difficulty || 'Moderate',
      question_text: q.question_text,
      explanation: q.explanation,
      bace_standard: q.bace_standard || null,
      active: q.active ?? true,
      choices: q.choices || [],
    }));

    const { error } = await client.from('questions').upsert(records, { onConflict: 'id' });
    if (error) throw error;
    return { count: records.length };
  } catch (err: any) {
    return { count: 0, error: err?.message || 'Failed to sync questions' };
  }
}

/**
 * Upsert assignments into Supabase
 */
export async function syncAssignmentsToSupabase(assignments: Assignment[]): Promise<{ count: number; error?: string }> {
  const client = getSupabase();
  if (!client) return { count: 0, error: 'Supabase client not initialized' };

  try {
    const records = assignments.map((a) => ({
      id: a.id,
      teacher_id: a.teacher_id,
      class_id: a.class_id,
      class_name: a.class_name || null,
      title: a.title,
      assignment_type: a.assignment_type,
      reference_id: a.reference_id || null,
      instructions: a.instructions || '',
      due_date: a.due_date,
    }));

    const { error } = await client.from('assignments').upsert(records, { onConflict: 'id' });
    if (error) throw error;
    return { count: records.length };
  } catch (err: any) {
    return { count: 0, error: err?.message || 'Failed to sync assignments' };
  }
}

/**
 * Upsert a lesson grade record into Supabase
 */
export async function syncLessonGradeToSupabase(grade: LessonGradeRecord): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  if (!client) return { success: false, error: 'Supabase client not initialized' };

  try {
    const { error } = await client.from('lesson_grades').upsert(grade, { onConflict: 'id' });
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to sync grade' };
  }
}
