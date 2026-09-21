import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  LogIn,
  ExternalLink,
  ChevronRight,
  User,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types/database';

export const GoogleAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalPreferredRole,
    signInWithGoogle,
    oneClickGoogleSignIn,
    isGoogleAuthLoading,
    googleUser,
    signOutGoogle,
    role,
    facultyAccessCode,
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>(authModalPreferredRole || 'student');
  const [facultyKeyInput, setFacultyKeyInput] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const validateRoleAccess = (): boolean => {
    if (selectedRole === 'student') return true;

    const validCodes = ['WAGNER-FACULTY-2026', 'WAGNER-ADMIN-2026', 'ADMIN2026', 'BACE-TEACHER-CTE', 'WAGNER-CTE-TEACHER', 'WAGNER-CTE-ADMIN-2026'];
    if (facultyAccessCode) validCodes.push(facultyAccessCode.trim().toUpperCase());

    const cleanInput = facultyKeyInput.trim().toUpperCase();
    if (!cleanInput || !validCodes.includes(cleanInput)) {
      setErrorMessage(
        'Access Denied: Invalid Faculty Authorization Key. Student candidates are strictly restricted from creating or signing into teacher accounts.'
      );
      return false;
    }
    return true;
  };

  const handleSupabaseOAuthLogin = async () => {
    setErrorMessage(null);
    if (!validateRoleAccess()) return;

    const res = await signInWithGoogle(selectedRole);
    if (!res.success && res.error) {
      setErrorMessage(
        `Supabase Google Provider notice: ${res.error}. You can also use the instant one-click login below to sign in immediately with your Google account!`
      );
    }
  };

  const handleInstantGoogleLogin = (email: string, name: string) => {
    setErrorMessage(null);
    if (!validateRoleAccess()) return;
    oneClickGoogleSignIn(email, name, selectedRole);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) {
      setErrorMessage('Please enter a valid Google email address.');
      return;
    }
    const derivedName = customName.trim() || customEmail.split('@')[0];
    handleInstantGoogleLogin(customEmail.trim(), derivedName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0B192C] text-white px-6 py-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Google Account Sign-In</h2>
              <p className="text-xs text-slate-400">Powered by Supabase Auth & Google OAuth</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Current Signed In User Banner */}
          {googleUser && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  {googleUser.name[0] || 'U'}
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Signed In with Google</span>
                  </div>
                  <p className="text-xs text-emerald-800">{googleUser.email}</p>
                </div>
              </div>
              <button
                onClick={signOutGoogle}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-white px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Role Choice */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Step 1: Choose Access Role
            </label>
            <p className="text-xs text-slate-500">
              Select the permission level you want to access with this account:
            </p>
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'student'
                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <GraduationCap
                  className={`w-5 h-5 mb-1.5 ${
                    selectedRole === 'student' ? 'text-blue-600' : 'text-slate-500'
                  }`}
                />
                <span className="text-xs font-bold text-slate-900">Student</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Prep & Labs</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('teacher')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'teacher'
                    ? 'border-teal-600 bg-teal-50/70 ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <Briefcase
                  className={`w-5 h-5 mb-1.5 ${
                    selectedRole === 'teacher' ? 'text-teal-600' : 'text-slate-500'
                  }`}
                />
                <span className="text-xs font-bold text-slate-900">Teacher</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Classes & Rosters</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'admin'
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <ShieldCheck
                  className={`w-5 h-5 mb-1.5 ${
                    selectedRole === 'admin' ? 'text-indigo-600' : 'text-slate-500'
                  }`}
                />
                <span className="text-xs font-bold text-slate-900">Admin</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Manage All Users</span>
              </button>
            </div>

            {/* Faculty Key Requirement if Teacher or Admin chosen */}
            {selectedRole !== 'student' && (
              <div className="mt-3 p-3 bg-teal-50/80 border border-teal-200 rounded-xl space-y-1.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-teal-700" />
                    <span>Faculty Authorization Key Required</span>
                  </label>
                  <span className="text-[10px] text-teal-700 font-medium">Students Restricted</span>
                </div>
                <p className="text-[11px] text-teal-800 leading-relaxed">
                  Student candidates are prohibited from accessing educator consoles. Enter your institutional faculty key to proceed with teacher sign-in.
                </p>
                <input
                  type="text"
                  value={facultyKeyInput}
                  onChange={(e) => setFacultyKeyInput(e.target.value.toUpperCase())}
                  placeholder="e.g. WAGNER-FACULTY-2026"
                  className="w-full px-3 py-2 text-xs font-mono font-bold bg-white border border-teal-300 rounded-lg uppercase tracking-wider text-teal-950 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>
            )}
          </div>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Step 2: One-Click Options */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Step 2: Sign In Options
            </label>

            {/* Quick 1-Click for dcjones1441@gmail.com */}
            <button
              onClick={() => handleInstantGoogleLogin('dcjones1441@gmail.com', 'D. C. Jones')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left group bg-white shadow-2xs"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  DJ
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                    <span>One-Click Login as dcjones1441@gmail.com</span>
                    <span className="text-[10px] font-medium bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                      Primary
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Sign in immediately as <strong className="capitalize">{selectedRole}</strong>
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </button>

            {/* Standard Supabase Google OAuth Button */}
            <button
              onClick={handleSupabaseOAuthLogin}
              disabled={isGoogleAuthLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 font-medium text-xs text-slate-800 transition-colors shadow-2xs bg-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>
                {isGoogleAuthLoading ? 'Connecting to Supabase...' : 'Continue with Google OAuth'}
              </span>
            </button>

            {/* Custom Google Account Form Toggle */}
            {!isCustomMode ? (
              <button
                type="button"
                onClick={() => setIsCustomMode(true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline block text-center w-full pt-1"
              >
                Sign in with a different Google email address
              </button>
            ) : (
              <form onSubmit={handleCustomGoogleSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="text-xs font-bold text-slate-800">Enter Google Account Details:</div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Google Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="user@gmail.com or school.edu"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Full Name (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
                <div className="flex items-center justify-end space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsCustomMode(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Sign In as {selectedRole}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Integration Note */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Supabase Authentication</span>
            </div>
            <p>
              Your profile is authenticated through Supabase Auth. Administrators have full authorization to manage real student and teacher accounts, perform roster removals, and configure class enrollments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
