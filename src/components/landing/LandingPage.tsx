import { requestPasswordRecovery } from '../../lib/passwordRecovery';
import React, { useState } from 'react';
import {
  FlaskConical,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Key,
  School,
  Calendar,
  AlertCircle,
  Eye,
  EyeOff,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Dna,
  Layers,
  Timer,
  Microscope,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';

export const LandingPage: React.FC = () => {
  const {
    loginUser,
    registerStudent,
    registerTeacher,
    registerAdmin,
    classes,
    domains,
    isAuthenticated,
    currentUser,
    role,
    setStudentPage,
    setTeacherPage,
    setAdminPage,
  } = useApp();

  // Mode: sign_in vs sign_up
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_in');
  // Role for registration only
  const [signUpRole, setSignUpRole] = useState<'student' | 'teacher' | 'admin'>('student');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Sign In Fields (Unified: student, teacher, or admin)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Student Registration Fields
  const [sFirstName, setSFirstName] = useState('');
  const [sLastName, setSLastName] = useState('');
  const [sEmail, setSEmail] = useState('');
  const [sPassword, setSPassword] = useState('');
  const [sJoinCode, setSJoinCode] = useState('');
  const [sExamDate, setSExamDate] = useState('2026-05-12');

  // Teacher Registration Fields
  const [tPrefix, setTPrefix] = useState('Dr.');
  const [tFirstName, setTFirstName] = useState('');
  const [tLastName, setTLastName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPassword, setTPassword] = useState('');
  const [tSchool, setTSchool] = useState('Wagner High School');
  const [tDepartment, setTDepartment] = useState('CTE Biomedical Science');
  const [tAccessCode, setTAccessCode] = useState('');

  // Admin Registration Fields
  const [aFirstName, setAFirstName] = useState('');
  const [aLastName, setALastName] = useState('');
  const [aEmail, setAEmail] = useState('');
  const [aPassword, setAPassword] = useState('');
  const [aSchool, setASchool] = useState('Wagner High School');
  const [aDepartment, setADepartment] = useState('Biomedical CTE Administration & Leadership');
  const [aAccessCode, setAAccessCode] = useState('');

  // Status & Error feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Unified Sign In Handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginEmail.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!loginPassword || loginPassword.trim().length === 0) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    const res = await loginUser(loginEmail.trim(), loginPassword);
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  // Student Registration Handler
  const handleStudentSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!sFirstName.trim() || !sLastName.trim() || !sEmail.trim()) {
      setErrorMsg('Please complete all required student fields.');
      return;
    }
    if (!sPassword || sPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const res = await registerStudent({
      first_name: sFirstName.trim(),
      last_name: sLastName.trim(),
      email: sEmail.trim(),
      password: sPassword,
      class_join_code: sJoinCode.trim() || undefined,
      target_exam_date: sExamDate,
    });
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error);
    } else if (res.success) {
      setSuccessMsg('Student account created. If email confirmation is enabled, check your inbox before signing in.');
    }
  };

  // Teacher Registration Handler
  const handleTeacherSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!tFirstName.trim() || !tLastName.trim() || !tEmail.trim()) {
      setErrorMsg('Please complete all required faculty fields.');
      return;
    }
    if (!tPassword || tPassword.length < 6) {
      setErrorMsg('Faculty password must be at least 6 characters long.');
      return;
    }
    if (!tAccessCode.trim()) {
      setErrorMsg('Faculty Authorization Key is required. Contact CTE administration.');
      return;
    }

    setLoading(true);
    const res = await registerTeacher({
      prefix: tPrefix,
      first_name: tFirstName.trim(),
      last_name: tLastName.trim(),
      email: tEmail.trim(),
      password: tPassword,
      school_name: tSchool.trim(),
      department: tDepartment.trim(),
      access_code: tAccessCode.trim(),
    });
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  // Admin Registration Handler
  const handleAdminSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!aFirstName.trim() || !aLastName.trim() || !aEmail.trim()) {
      setErrorMsg('Please complete all required administrator fields.');
      return;
    }
    if (!aPassword || aPassword.length < 6) {
      setErrorMsg('Administrator password must be at least 6 characters long.');
      return;
    }
    if (!aAccessCode.trim()) {
      setErrorMsg('District Administrator Master Key is required.');
      return;
    }

    setLoading(true);
    const res = await registerAdmin({
      first_name: aFirstName.trim(),
      last_name: aLastName.trim(),
      email: aEmail.trim(),
      password: aPassword,
      school_name: aSchool.trim(),
      department: aDepartment.trim(),
      access_code: aAccessCode.trim(),
    });
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  const returnToActiveDashboard = () => {
    if (role === 'teacher') setTeacherPage('dashboard');
    else if (role === 'admin') setAdminPage('dashboard');
    else setStudentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Top Brand Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Dna className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                <span>Wagner High School</span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  BACE Prep Lab
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Biomedical Science CTE & PLTW Credentialing System
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated && currentUser ? (
              <button
                type="button"
                onClick={returnToActiveDashboard}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <span>Return to {currentUser.first_name}'s Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs text-slate-400 hidden sm:inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Institutional Sign In</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Hero & Auth Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Academic Program Overview */}
          <div className="lg:col-span-6 space-y-6 lg:pt-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Biotility Biotechnician Assistant Credentialing Exam</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Master the BACE with Wagner High School's Prep Lab.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Designed specifically for Wagner High School Biomedical CTE candidates preparing for the official Biotility BACE certification exam. Access high-yield practice drills, virtual benchtop simulations, and timed mock exams.
            </p>

            {/* Key Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Direct Unified Sign In</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Students, faculty instructors, and district administrators log into their respective consoles directly from this portal using institutional credentials.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Interactive Virtual Benchtop</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Realistic simulators for micropipette volume selection, serial dilution math (C₁V₁ = C₂V₂), agarose gel electrophoresis, and spectrophotometry.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Timer className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Full-Length Timed Mock Exams</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Extensive scenario-based and multiple-choice practice across all 8 BACE domains with immediate rationales and readiness analytics.
                  </p>
                </div>
              </div>
            </div>

            {/* Program Accreditation Banner */}
            <div className="flex items-center space-x-4 pt-2 text-xs text-slate-400 border-t border-slate-800/80">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                PLTW Biomedical Science
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Biotility Credential Aligned
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Periods 1–6 Supported
              </span>
            </div>
          </div>

          {/* Right Column: Unified Sign-In & Registration Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              
              {/* Header Tab: Sign In vs Create Account */}
              <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950/70 p-1.5 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('sign_in');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                    authMode === 'sign_in'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('sign_up');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                    authMode === 'sign_up'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {/* Status Messages */}
                {errorMsg && (
                  <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="mb-5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* MODE 1: UNIFIED SIGN IN FORM */}
                {authMode === 'sign_in' && (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-slate-300">Email Address</label>
                        <span className="text-[11px] text-slate-500">Candidate, Faculty, or Admin</span>
                      </div>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="candidate@wagner-cte.org or faculty email"
                          className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-slate-300">Password</label>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-900/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      {loading ? (
                        <span>Authenticating...</span>
                      ) : (
                        <>
                          <span>Sign In to Portal</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-slate-400 text-center pt-2 leading-relaxed">
                      Your credentials automatically log you directly into your student candidate, faculty educator, or administrator workspace.
                    </p>

                    <div className="text-center mb-3"><button type="button" disabled={loading} className="text-sm text-blue-700 underline" onClick={async () => {
                      setLoading(true); setErrorMsg(null); setSuccessMsg(null);
                      try { await requestPasswordRecovery(loginEmail); setSuccessMsg('If that account exists, a recovery email will arrive shortly. Check your spam folder too.'); }
                      catch (error: any) { setErrorMsg(error.message); }
                      finally { setLoading(false); }
                    }}>Forgot password?</button></div>
                    <div className="pt-4 border-t border-slate-800 text-center">
                      <span className="text-xs text-slate-400">Need an account? </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('sign_up');
                          setErrorMsg(null);
                        }}
                        className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                      >
                        Register here
                      </button>
                    </div>
                  </form>
                )}

                {/* MODE 2: REGISTRATION FORM */}
                {authMode === 'sign_up' && (
                  <div className="space-y-4">
                    {/* Role Selector Tabs for Registration */}
                    <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs text-blue-200">
                      Self-registration creates <strong>student candidate</strong> accounts only. Administrators can create student and teacher accounts in the Admin Portal.
                    </div>

                    {/* STUDENT REGISTRATION */}
                    {signUpRole === 'student' && (
                      <form onSubmit={handleStudentSignUp} className="space-y-3">
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">First Name *</label>
                            <input
                              type="text"
                              required
                              value={sFirstName}
                              onChange={(e) => setSFirstName(e.target.value)}
                              placeholder="e.g. Jordan"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name *</label>
                            <input
                              type="text"
                              required
                              value={sLastName}
                              onChange={(e) => setSLastName(e.target.value)}
                              placeholder="e.g. Rivera"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Student Email *</label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={sEmail}
                              onChange={(e) => setSEmail(e.target.value)}
                              placeholder="jordan.rivera@student.wagner.edu"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Create Password *</label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              required
                              value={sPassword}
                              onChange={(e) => setSPassword(e.target.value)}
                              placeholder="At least 6 characters"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              Class Join Code
                            </label>
                            <input
                              type="text"
                              value={sJoinCode}
                              onChange={(e) => setSJoinCode(e.target.value.toUpperCase())}
                              placeholder="e.g. WAGNER202"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              Target BACE Date
                            </label>
                            <input
                              type="date"
                              value={sExamDate}
                              onChange={(e) => setSExamDate(e.target.value)}
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>Register Candidate Account</span>
                        </button>
                      </form>
                    )}

                    {/* FACULTY REGISTRATION */}
                    {signUpRole === 'teacher' && (
                      <form onSubmit={handleTeacherSignUp} className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Prefix</label>
                            <select
                              value={tPrefix}
                              onChange={(e) => setTPrefix(e.target.value)}
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                            >
                              <option value="Dr.">Dr.</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Ms.">Ms.</option>
                              <option value="Mrs.">Mrs.</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">First Name *</label>
                            <input
                              type="text"
                              required
                              value={tFirstName}
                              onChange={(e) => setTFirstName(e.target.value)}
                              placeholder="Elena"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name *</label>
                            <input
                              type="text"
                              required
                              value={tLastName}
                              onChange={(e) => setTLastName(e.target.value)}
                              placeholder="Martinez"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Institutional Email *</label>
                          <input
                            type="email"
                            required
                            value={tEmail}
                            onChange={(e) => setTEmail(e.target.value)}
                            placeholder="martinez.cte@wagner-cte.org"
                            className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={tPassword}
                            onChange={(e) => setTPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-semibold text-slate-300">
                              Faculty Authorization Key *
                            </label>
                            <button
                              type="button"
                              onClick={() => setTAccessCode('')}
                              className="text-[10px] text-teal-400 hover:underline cursor-pointer"
                            >
                              Faculty accounts are provisioned
                            </button>
                          </div>
                          <div className="relative">
                            <Key className="w-4 h-4 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={tAccessCode}
                              onChange={(e) => setTAccessCode(e.target.value.toUpperCase())}
                              placeholder="Provisioned by administrator"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-teal-500"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full mt-2 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <Briefcase className="w-4 h-4" />
                          <span>Register Faculty Educator Console</span>
                        </button>
                      </form>
                    )}

                    {/* ADMINISTRATOR REGISTRATION */}
                    {signUpRole === 'admin' && (
                      <form onSubmit={handleAdminSignUp} className="space-y-3">
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">First Name *</label>
                            <input
                              type="text"
                              required
                              value={aFirstName}
                              onChange={(e) => setAFirstName(e.target.value)}
                              placeholder="Derrick"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name *</label>
                            <input
                              type="text"
                              required
                              value={aLastName}
                              onChange={(e) => setALastName(e.target.value)}
                              placeholder="Jones"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Administrator Email *</label>
                          <input
                            type="email"
                            required
                            value={aEmail}
                            onChange={(e) => setAEmail(e.target.value)}
                            placeholder="administrator@school.edu"
                            className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={aPassword}
                            onChange={(e) => setAPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-semibold text-slate-300">
                              Admin Authorization Key *
                            </label>
                            <button
                              type="button"
                              onClick={() => setAAccessCode('')}
                              className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                            >
                              Admin accounts are provisioned
                            </button>
                          </div>
                          <div className="relative">
                            <Key className="w-4 h-4 text-indigo-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={aAccessCode}
                              onChange={(e) => setAAccessCode(e.target.value.toUpperCase())}
                              placeholder="Provisioned by administrator"
                              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Register Administrator Console</span>
                        </button>
                      </form>
                    )}

                    <div className="pt-3 border-t border-slate-800 text-center">
                      <span className="text-xs text-slate-400">Already registered? </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('sign_in');
                          setErrorMsg(null);
                        }}
                        className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                      >
                        Sign in directly
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 8 BACE Exam Domains Grid */}
        <section className="mt-16 sm:mt-24 pt-12 border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-3">
              <Microscope className="w-3.5 h-3.5 text-teal-400" />
              <span>Official Biotility Certification Competencies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Master the 8 BACE Examination Domains
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Comprehensive question banks, laboratory math drills, and virtual benchtop modules mapped directly to industry credentialing standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold font-mono text-teal-400 bg-teal-950/60 border border-teal-800/80 px-2 py-0.5 rounded">
                    Domain {domain.display_order} • {domain.exam_weight}% of points
                  </span>
                  <DomainIcon name={domain.icon_name} className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{domain.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{domain.description}</p>
              </div>
            ))}

            {/* Virtual Bench Simulator feature */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-950/40 to-slate-900 border border-teal-800/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono text-teal-300 bg-teal-900/80 px-2 py-0.5 rounded">
                  Interactive Lab
                </span>
                <Award className="w-5 h-5 text-teal-300" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Virtual Practical Exam Training</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Simulate the BACE practical laboratory skills exam right in your browser with real-time feedback on technique, calculation accuracy, and standard curve analysis.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Institutional Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-400">
            <School className="w-4 h-4 text-teal-400" />
            <span>Wagner High School CTE Biomedical Science • Judson Independent School District</span>
          </div>
          <div className="text-slate-500 text-center sm:text-right">
            Biotility Biotechnician Assistant Credentialing Exam (BACE) Preparation System
          </div>
        </div>
      </footer>
    </div>
  );
};
