import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Eye,
  EyeOff,
  FlaskConical,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthPortal: React.FC = () => {
  const { registerStudent, loginUser, signInWithGoogle } = useApp();

  const [activePortal, setActivePortal] = useState<'student' | 'teacher' | 'admin'>('student');
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_up');
  const [showPassword, setShowPassword] = useState(false);

  const [sFirstName, setSFirstName] = useState('');
  const [sLastName, setSLastName] = useState('');
  const [sEmail, setSEmail] = useState('');
  const [sPassword, setSPassword] = useState('');
  const [sJoinCode, setSJoinCode] = useState('');
  const [sExamDate, setSExamDate] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const switchPortal = (portal: 'student' | 'teacher' | 'admin') => {
    setActivePortal(portal);
    setAuthMode(portal === 'student' ? authMode : 'sign_in');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleStudentSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!sFirstName.trim() || !sLastName.trim()) {
      setErrorMsg('Please enter your first and last name.');
      return;
    }
    if (!sEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (sPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await registerStudent({
      first_name: sFirstName.trim(),
      last_name: sLastName.trim(),
      email: sEmail.trim(),
      password: sPassword,
      class_join_code: sJoinCode.trim() || undefined,
      target_exam_date: sExamDate || undefined,
    });
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Unable to create the student account.');
      return;
    }

    setSuccessMsg('Account created. If email confirmation is enabled, confirm your email before signing in.');
    setAuthMode('sign_in');
    setLoginEmail(sEmail.trim());
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginEmail.includes('@')) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }
    if (!loginPassword) {
      setErrorMsg('Password is required.');
      return;
    }

    setLoading(true);
    const res = await loginUser(loginEmail.trim(), loginPassword, activePortal);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Unable to sign in.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    const res = await signInWithGoogle(activePortal);
    setLoading(false);
    if (!res.success) setErrorMsg(res.error || 'Unable to continue with Google.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/70 px-4 sm:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-lg text-white">BACE Prep Lab</div>
            <div className="text-xs text-slate-400">Biotechnician Assistant Credentialing Exam Preparation</div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-3 gap-1.5 p-1.5 border-b border-slate-800 bg-slate-950/60">
            <button
              type="button"
              onClick={() => switchPortal('student')}
              className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold ${
                activePortal === 'student' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Candidate
            </button>
            <button
              type="button"
              onClick={() => switchPortal('teacher')}
              className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold ${
                activePortal === 'teacher' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" /> Faculty
            </button>
            <button
              type="button"
              onClick={() => switchPortal('admin')}
              className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold ${
                activePortal === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Admin
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h1 className="text-xl font-bold text-white">
                  {activePortal === 'student' && authMode === 'sign_up'
                    ? 'Create Student Account'
                    : activePortal === 'student'
                    ? 'Student Sign In'
                    : activePortal === 'teacher'
                    ? 'Faculty Sign In'
                    : 'Administrator Sign In'}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  {activePortal === 'student'
                    ? 'Access BACE lessons, practice, mock exams, and progress.'
                    : 'Teacher and administrator roles must be provisioned securely before sign-in.'}
                </p>
              </div>

              {activePortal === 'student' && (
                <div className="flex bg-slate-800 p-1 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setAuthMode('sign_in')}
                    className={`px-3 py-1 rounded-md ${
                      authMode === 'sign_in' ? 'bg-slate-700 text-white' : 'text-slate-400'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('sign_up')}
                    className={`px-3 py-1 rounded-md ${
                      authMode === 'sign_up' ? 'bg-slate-700 text-white' : 'text-slate-400'
                    }`}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 text-xs flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-xs">
                {successMsg}
              </div>
            )}

            {activePortal === 'student' && authMode === 'sign_up' ? (
              <form onSubmit={handleStudentSignUp} className="space-y-4 mt-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={sFirstName}
                      onChange={(e) => setSFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs"
                    />
                  </div>
                  <input
                    value={sLastName}
                    onChange={(e) => setSLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={sEmail}
                    onChange={(e) => setSEmail(e.target.value)}
                    placeholder="student@school.edu"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs"
                  />
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={sPassword}
                    onChange={(e) => setSPassword(e.target.value)}
                    placeholder="Password (6+ characters)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={sJoinCode}
                    onChange={(e) => setSJoinCode(e.target.value.toUpperCase())}
                    placeholder="Class join code (optional)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono"
                  />
                  <input
                    type="date"
                    value={sExamDate}
                    onChange={(e) => setSExamDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs"
                  />
                </div>

                <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2">
                  {loading ? 'Creating account...' : 'Create Candidate Account'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-4 mt-5">
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs"
                  />
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button disabled={loading} className="w-full bg-teal-600 hover:bg-teal-500 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2">
                  {loading ? 'Signing in...' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="my-5 border-t border-slate-800" />

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl py-2.5 text-xs font-medium"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-600">
        BACE Prep Lab • 8 BACE Domains
      </footer>
    </div>
  );
};
