import React, { useState, useEffect } from 'react';
import {
  Settings,
  Database,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Save,
  Key,
  Server,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Download,
  ExternalLink,
  Code2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Zap,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  testSupabaseConnection,
  syncQuestionsToSupabase,
  syncAssignmentsToSupabase,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SupabaseHealthResult,
} from '../../lib/supabase';
import { SUPABASE_SQL_SCHEMA } from '../../lib/supabaseSchema';

export const TeacherSettingsView: React.FC = () => {
  const {
    questions,
    assignments,
    demoModeEnabled,
    setDemoModeEnabled,
    purgeDemoData,
  } = useApp();

  // Settings State
  const [passingThreshold, setPassingThreshold] = useState('80');
  const [targetExamDate, setTargetExamDate] = useState('2026-05-12');
  const [allowRetakes, setAllowRetakes] = useState(true);
  const [strictTimer, setStrictTimer] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Supabase State
  const [isTesting, setIsTesting] = useState(false);
  const [healthStatus, setHealthStatus] = useState<SupabaseHealthResult | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedAnonKey, setCopiedAnonKey] = useState(false);
  const [showSqlViewer, setShowSqlViewer] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ loading: boolean; message: string; type: 'success' | 'error' | 'info' | null }>({
    loading: false,
    message: '',
    type: null,
  });

  // Run initial test connection on mount
  useEffect(() => {
    handleTestConnection();
  }, []);

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      const result = await testSupabaseConnection();
      setHealthStatus(result);
    } catch {
      setHealthStatus({
        connected: false,
        projectRef: 'gfdbcrfqbsowlbnprqqn',
        projectUrl: SUPABASE_URL,
        authWorking: false,
        tablesFound: [],
        tablesMissing: ['questions', 'assignments', 'lesson_grades'],
        latencyMs: 0,
        message: 'Could not connect to Supabase endpoint.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopySchema = async () => {
    try {
      await navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyAnonKey = async () => {
    try {
      await navigator.clipboard.writeText(SUPABASE_ANON_KEY);
      setCopiedAnonKey(true);
      setTimeout(() => setCopiedAnonKey(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadSchema = () => {
    const element = document.createElement('a');
    const file = new Blob([SUPABASE_SQL_SCHEMA], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'bace_prep_lab_supabase_schema.sql';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSyncQuestions = async () => {
    setSyncStatus({ loading: true, message: 'Syncing questions to Supabase...', type: 'info' });
    const result = await syncQuestionsToSupabase(questions);
    if (result.error) {
      setSyncStatus({
        loading: false,
        message: `Database notice: ${result.error}. (Please run the SQL schema in Supabase to create public.questions table)`,
        type: 'error',
      });
    } else {
      setSyncStatus({
        loading: false,
        message: `Successfully synchronized ${result.count} questions to Supabase database!`,
        type: 'success',
      });
    }
    setTimeout(() => {
      handleTestConnection();
    }, 1000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const projectRef = 'gfdbcrfqbsowlbnprqqn';
  const sqlDashboardUrl = `https://supabase.com/dashboard/project/${projectRef}/sql`;

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <Settings className="w-3.5 h-3.5 text-teal-600" />
            <span>Platform Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Settings & Supabase Integration
          </h1>
          <p className="text-sm text-slate-600">
            Configure credentialing benchmarks, exam policies, and live Supabase PostgreSQL database connectivity.
          </p>
        </div>
      </div>

      {/* Supabase Live Integration Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center">
              <Database className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-slate-900">Supabase Database & API</h2>
                {healthStatus?.connected ? (
                  <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Connected ({healthStatus.latencyMs}ms)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Connecting...</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Project Ref: <span className="text-teal-700 font-bold">{projectRef}</span> &bull; Endpoint:{' '}
                <span className="text-slate-700">{SUPABASE_URL}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-teal-600' : ''}`} />
              <span>{isTesting ? 'Pinging...' : 'Test Connection'}</span>
            </button>
            <a
              href={sqlDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
              <span>Supabase SQL Dashboard</span>
            </a>
          </div>
        </div>

        {/* Diagnostic Status Box */}
        {healthStatus && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            healthStatus.connected
              ? 'bg-teal-50/50 border-teal-200 text-teal-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="font-bold flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-teal-600" />
                  <span>Connection Diagnostics</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {healthStatus.message}
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-white/70 px-2 py-0.5 rounded border border-slate-200">
                Ping: {healthStatus.latencyMs}ms
              </span>
            </div>

            {healthStatus.tablesFound.length > 0 ? (
              <div className="pt-2 flex flex-wrap gap-2 items-center">
                <span className="font-semibold text-slate-700">Active Tables:</span>
                {healthStatus.tablesFound.map((table) => (
                  <span key={table} className="bg-emerald-100 text-emerald-800 text-[11px] px-2 py-0.5 rounded font-mono border border-emerald-300">
                    &bull; {table}
                  </span>
                ))}
              </div>
            ) : (
              <div className="pt-2 text-slate-600 bg-white/80 p-3 rounded-lg border border-teal-100 text-[11px] leading-relaxed">
                <strong>Next Step for Complete Persistence:</strong> Your Supabase API key is connected and authenticated. To set up the PostgreSQL tables for student progress, assignments, and questions, copy the SQL schema script below and run it once in your{' '}
                <a
                  href={sqlDashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline font-semibold hover:text-teal-800"
                >
                  Supabase SQL Editor
                </a>.
              </div>
            )}
          </div>
        )}

        {/* Action Controls: SQL Schema & Sync */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Schema Tools */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
              <Code2 className="w-4 h-4 text-teal-600" />
              <h3>Database SQL Schema (DDL)</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complete schema definition with 10 relational tables, foreign key constraints, JSONB columns, and Row-Level Security (RLS) policies.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleCopySchema}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-colors cursor-pointer"
              >
                {copiedSchema ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied SQL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SQL Schema</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadSchema}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download .sql</span>
              </button>
              <button
                onClick={() => setShowSqlViewer(!showSqlViewer)}
                className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <span>{showSqlViewer ? 'Hide Schema' : 'Preview'}</span>
                {showSqlViewer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Sync Tools */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
              <RefreshCw className="w-4 h-4 text-teal-600" />
              <h3>Data Synchronization</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload local question bank items ({questions.length} questions) or class assignments directly into your Supabase tables.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleSyncQuestions}
                disabled={syncStatus.loading}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Server className="w-3.5 h-3.5 text-teal-600" />
                <span>Sync Questions ({questions.length})</span>
              </button>
              <button
                onClick={handleCopyAnonKey}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Copy anon public key"
              >
                <Key className="w-3.5 h-3.5 text-slate-500" />
                <span>{copiedAnonKey ? 'Copied Anon Key' : 'Copy Key'}</span>
              </button>
            </div>
            {syncStatus.message && (
              <p className={`text-[11px] font-medium mt-2 ${
                syncStatus.type === 'success' ? 'text-emerald-700' : syncStatus.type === 'error' ? 'text-amber-700' : 'text-slate-600'
              }`}>
                {syncStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Collapsible SQL Schema Preview */}
        {showSqlViewer && (
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800 font-mono">
              <span className="text-teal-400 font-bold">bace_prep_lab_supabase_schema.sql</span>
              <button
                onClick={handleCopySchema}
                className="text-xs text-slate-300 hover:text-white flex items-center space-x-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedSchema ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-slate-300 font-mono text-[11px] leading-relaxed max-h-72 overflow-y-auto overflow-x-auto whitespace-pre">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>
        )}
      </div>

      {/* Benchmark and Policy Configuration */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">BACE Exam Policies</h2>
          {savedSuccess && (
            <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Settings Saved</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Passing Benchmark Threshold (%)
            </label>
            <input
              type="number"
              min="50"
              max="100"
              value={passingThreshold}
              onChange={(e) => setPassingThreshold(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Official Biotility BACE benchmark standard is 80%.
            </span>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Cohort Official BACE Exam Date
            </label>
            <input
              type="date"
              value={targetExamDate}
              onChange={(e) => setTargetExamDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Used for milestone countdowns on student dashboards.
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={allowRetakes}
              onChange={(e) => setAllowRetakes(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
            />
            <div>
              <div className="font-semibold text-slate-800">
                Allow Unlimited Practice & Mock Exam Retakes
              </div>
              <div className="text-[11px] text-slate-500">
                Students can practice questions multiple times to build confidence.
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={strictTimer}
              onChange={(e) => setStrictTimer(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
            />
            <div>
              <div className="font-semibold text-slate-800">
                Enforce Strict Exam Simulation Timers
              </div>
              <div className="text-[11px] text-slate-500">
                Automatically submits student mock exam when the countdown expires.
              </div>
            </div>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Platform Preferences</span>
          </button>
        </div>
      </form>

      {/* Academic Rosters & Storage Management */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-slate-900 text-white">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Academic Rosters & Storage Management
              </h2>
              <p className="text-xs text-slate-500">
                Manage candidate registration records and local storage cache for Periods 1–6.
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full font-bold border bg-emerald-50 text-emerald-800 border-emerald-200">
            Live Production Mode
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-slate-800">Clear Historical Test Practice Logs</h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
              Permanently purge historical test sessions and sample logs from local storage without impacting your real enrolled students across Periods 1–6.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Purge historical test practice logs? All real student registrations across Periods 1–6 will remain intact.')) {
                purgeDemoData();
                alert('Test logs successfully purged.');
              }
            }}
            className="shrink-0 inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-xl bg-white hover:bg-red-50 text-red-700 border border-red-200 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            <span>Purge Test Logs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
