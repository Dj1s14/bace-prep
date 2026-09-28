import React, { useState } from 'react';
import {
  FlaskConical,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Key,
  KeyRound,
  School,
  Calendar,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useApp, DEFAULT_FACULTY_ACCESS_CODE, DEFAULT_ADMIN_ACCESS_CODE } from '../../context/AppContext';
import { UserRole } from '../../types/database';

export const AuthPortal: React.FC = () => {
  const {
    registerStudent,
    loginUser,
    registerTeacher,
    registerAdmin,
    signInWithGoogle,
    oneClickGoogleSignIn,
    classes,
  } = useApp();

  // Primary portal tab: student vs faculty vs admin
  const [activePortal, setActivePortal] = useState<'student' | 'teacher' | 'admin'>('student');
  // Sub-mode: sign_in vs sign_up
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_up');

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Student Sign-Up Fields
  const [sFirstName, setSFirstName] = useState('');
  const [sLastName, setSLastName] = useState('');
  const [sEmail, setSEmail] = useState('');
  const [sPassword, setSPassword] = useState('');
  const [sJoinCode, setSJoinCode] = useState('');
  const [sExamDate, setSExamDate] = useState('2026-05-12');

  // Teacher Sign-Up Fields
  const [tPrefix, setTPrefix] = useState('Mr.');
  const [tFirstName, setTFirstName] = useState('');
  const [tLastName, setTLastName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPassword, setTPassword] = useState('');
  const [tSchool, setTSchool] = useState('Wagner High School');
  const [tDepartment, setTDepartment] = useState('CTE Biomedical Science');
  const [tAccessCode, setTAccessCode] = useState(DEFAULT_FACULTY_ACCESS_CODE);

  // Administrator Sign-Up Fields (Protected by Master Key)
  const [aFirstName, setAFirstName] = useState('Derrick');
  const [aLastName, setALastName] = useState('Jones');
  const [aEmail, setAEmail] = useState('dcjones1441@gmail.com');
  const [aPassword, setAPassword] = useState('');
  const [aSchool, setASchool] = useState('Wagner High School');
  const [aDepartment, setADepartment] = useState('Biomedical CTE Administration & Leadership');
  const [aAccessCode, setAAccessCode] = useState('');

  // Sign-In Fields (Shared)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // UI state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle Student Registration
  const handleStudentSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!sFirstName.trim() || !sLastName.trim()) {
      setErrorMsg('Please enter both your first and last name.');
      return;
    }
    if (!sEmail.trim() || !sEmail.includes('@')) {
      setErrorMsg('Please enter a valid candidate email address.');
      return;
    }
    if (!sPassword || sPassword.length < 6) {
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
      target_exam_date: sExamDate,
    });
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  // Handle Faculty Registration (Decoupled from mandatory class creation)
  const handleTeacherSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!tFirstName.trim() || !tLastName.trim()) {
      setErrorMsg('Please enter your first and last name.');
      return;
    }
    if (!tEmail.trim() || !tEmail.includes('@')) {
      setErrorMsg('Please enter a valid institutional email address.');
      return;
    }
    if (!tPassword || tPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (!tAccessCode.trim()) {
      setErrorMsg('Faculty Authorization Key is required. Please enter the authorized faculty key (e.g. WAGNER-FACULTY-2026).');
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
      access_code: tAccessCode.trim().toUpperCase(),
    });
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  // Handle Administrator Registration
  const handleAdminSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!aFirstName.trim() || !aLastName.trim()) {
      setErrorMsg('Please enter both your first and last name.');
      return;
    }
    if (!aEmail.trim() || !aEmail.includes('@')) {
      setErrorMsg('Please enter a valid administrator email address.');
      return;
    }
    if (!aPassword || aPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (!aAccessCode.trim()) {
      setErrorMsg('Administrator Authorization Key is required.');
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
      access_code: aAccessCode.trim().toUpperCase(),
    });
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  // Handle Sign In (Student, Teacher, or Admin)
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }

    if (activePortal === 'admin' && (!loginPassword || loginPassword.trim().length === 0)) {
      setErrorMsg('Administrator password is required.');
      return;
    }

    setLoading(true);
    const res = await loginUser(loginEmail.trim(), loginPassword, activePortal);
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  // Google OAuth button handler
  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setLoading(true);
    const res = await signInWithGoogle(activePortal);
    setLoading(false);
    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-900/30">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">BACE Prep Lab</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Official BACE Platform
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Biotility Biotechnician Assistant Credentialing Exam Preparation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400 hidden sm:flex">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Secure Student Data Isolation</span>
          </div>
        </div>
      </header>

      {/* Main Authentication Center */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-xl">
          {/* Main Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Role Tab Selector: Student vs Faculty (Admin is restricted behind gateway) */}
            {activePortal === 'admin' ? (
              <div className="bg-indigo-950/80 border-b border-indigo-900/60 p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-indigo-300">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide">
                      CTE Administrator Gateway • Restricted Access
                    </div>
                    <div className="text-[11px] text-indigo-300/80">
                      Authorized Wagner & District Leadership Only • Password Enforced
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActivePortal('student');
                    setErrorMsg(null);
                  }}
                  className="text-xs text-indigo-300 hover:text-white px-3 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-700/60 transition-colors cursor-pointer"
                >
                  ← Exit Admin Gateway
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setActivePortal('student');
                    setErrorMsg(null);
                  }}
                  className={`flex items-center justify-center space-x-1.5 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activePortal === 'student'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span className="truncate">Candidate</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActivePortal('teacher');
                    setErrorMsg(null);
                  }}
                  className={`flex items-center justify-center space-x-1.5 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activePortal === 'teacher'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span className="truncate">Faculty</span>
                </button>
              </div>
            )}

            {/* Mode Selector: Sign Up vs Sign In */}
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {activePortal === 'student'
                      ? authMode === 'sign_up'
                        ? 'Create Student Account'
                        : 'Student Candidate Sign In'
                      : activePortal === 'teacher'
                      ? authMode === 'sign_up'
                        ? 'Register Faculty Console'
                        : 'Faculty Sign In'
                      : authMode === 'sign_up'
                      ? 'Register Administrator Console'
                      : 'Administrator Sign In'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activePortal === 'student'
                      ? authMode === 'sign_up'
                        ? 'Join your school biotech section or prepare as an independent candidate.'
                        : 'Access your individualized mastery analytics, practice sets, and mock exams.'
                      : activePortal === 'teacher'
                      ? authMode === 'sign_up'
                        ? 'Create your faculty console. Class sections can be created anytime later.'
                        : 'Log in to manage course sections, student rosters, and curriculum assignments.'
                      : authMode === 'sign_up'
                      ? 'Register administrative master console with full system and cohort controls.'
                      : 'Sign in to district CTE admin console for user management and reporting.'}
                  </p>
                </div>

                <div className="flex bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('sign_in');
                      setErrorMsg(null);
                    }}
                    className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      authMode === 'sign_in' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('sign_up');
                      setErrorMsg(null);
                    }}
                    className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      authMode === 'sign_up' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message banner */}
            {errorMsg && (
              <div className="mx-6 my-2 p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span>{errorMsg}</span>
                  {errorMsg.includes('Faculty Authorization Key') && (
                    <button
                      type="button"
                      onClick={() => {
                        setTAccessCode(DEFAULT_FACULTY_ACCESS_CODE);
                        setErrorMsg(null);
                      }}
                      className="mt-2 block bg-teal-900/80 hover:bg-teal-800 border border-teal-600 text-teal-200 font-mono text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Autofill Wagner Faculty Key: {DEFAULT_FACULTY_ACCESS_CODE}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Form Body */}
            <div className="p-6">
              {/* STUDENT SIGN UP */}
              {activePortal === 'student' && authMode === 'sign_up' && (
                <form onSubmit={handleStudentSignUp} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={sFirstName}
                          onChange={(e) => setSFirstName(e.target.value)}
                          placeholder="e.g. Elena"
                          className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        value={sLastName}
                        onChange={(e) => setSLastName(e.target.value)}
                        placeholder="e.g. Rostova"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={sEmail}
                        onChange={(e) => setSEmail(e.target.value)}
                        placeholder="candidate@school.edu"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Create Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={sPassword}
                        onChange={(e) => setSPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-300">Class Join Code</label>
                        <span className="text-[10px] text-slate-400">Optional</span>
                      </div>
                      <div className="relative">
                        <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={sJoinCode}
                          onChange={(e) => setSJoinCode(e.target.value.toUpperCase())}
                          placeholder="e.g. BACE101"
                          className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 font-mono tracking-wider focus:outline-none focus:border-blue-500 uppercase"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Provided by your biotech instructor</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Target Exam Date</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={sExamDate}
                          onChange={(e) => setSExamDate(e.target.value)}
                          className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>{loading ? 'Creating Candidate Account...' : 'Register Candidate Account & Begin'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* TEACHER SIGN UP */}
              {activePortal === 'teacher' && authMode === 'sign_up' && (
                <form onSubmit={handleTeacherSignUp} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Prefix</label>
                      <select
                        value={tPrefix}
                        onChange={(e) => setTPrefix(e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="Dr.">Dr.</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Prof.">Prof.</option>
                      </select>
                    </div>

                    <div className="sm:col-span-1.5">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
                      <input
                        type="text"
                        required
                        value={tFirstName}
                        onChange={(e) => setTFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="sm:col-span-1.5">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        value={tLastName}
                        onChange={(e) => setTLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Institutional Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={tEmail}
                        onChange={(e) => setTEmail(e.target.value)}
                        placeholder="educator@school.edu"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={tPassword}
                        onChange={(e) => setTPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Institution / School</label>
                      <div className="relative">
                        <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={tSchool}
                          onChange={(e) => setTSchool(e.target.value)}
                          placeholder="e.g. Life Sciences Academy"
                          className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
                      <input
                        type="text"
                        value={tDepartment}
                        onChange={(e) => setTDepartment(e.target.value)}
                        placeholder="e.g. CTE Biomedical Science"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Notice: Class Creation Optional */}
                  <div className="p-3 bg-teal-950/40 border border-teal-800/40 rounded-xl flex items-center space-x-2 text-xs text-teal-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>No upfront class creation required. You can configure class sections and invite candidates anytime from your instructor dashboard.</span>
                  </div>

                  {/* Faculty Authorization Key */}
                  <div className="p-3.5 bg-teal-950/40 border border-teal-700/60 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-teal-200 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-teal-400" />
                        <span>Faculty Authorization Key</span>
                        <span className="text-rose-400 text-xs">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setTAccessCode(DEFAULT_FACULTY_ACCESS_CODE)}
                        className="text-[10px] text-teal-400 hover:text-teal-300 underline font-mono cursor-pointer"
                      >
                        Fill Default: {DEFAULT_FACULTY_ACCESS_CODE}
                      </button>
                    </div>
                    <div className="relative">
                      <Key className="w-4 h-4 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={tAccessCode}
                        onChange={(e) => setTAccessCode(e.target.value.toUpperCase())}
                        placeholder="e.g. WAGNER-FACULTY-2026"
                        className="w-full bg-slate-950/90 border border-teal-600/80 rounded-xl pl-9 pr-3 py-2 text-xs text-teal-100 placeholder-teal-600/60 font-mono tracking-wider focus:outline-none focus:border-teal-400 uppercase"
                      />
                    </div>
                    <p className="text-[10px] text-teal-300/80 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-teal-400" />
                      <span>Security key required to create educator consoles. Default Wagner key is <strong className="font-mono text-teal-200">WAGNER-FACULTY-2026</strong>.</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-teal-900/40 flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>{loading ? 'Creating Faculty Account...' : 'Register Faculty Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* ADMINISTRATOR SIGN UP */}
              {activePortal === 'admin' && authMode === 'sign_up' && (
                <form onSubmit={handleAdminSignUp} className="space-y-4">
                  <div className="p-3 bg-indigo-950/40 border border-indigo-700/60 rounded-xl text-indigo-200 text-xs flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Administrator console provides full tenant oversight, user role management, and analytics across all biotechnology sections.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={aFirstName}
                          onChange={(e) => setAFirstName(e.target.value)}
                          placeholder="e.g. Derrick"
                          className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        value={aLastName}
                        onChange={(e) => setALastName(e.target.value)}
                        placeholder="e.g. Jones"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={aEmail}
                        onChange={(e) => setAEmail(e.target.value)}
                        placeholder="dcjones1441@gmail.com"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Create Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={aPassword}
                        onChange={(e) => setAPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Institution / District</label>
                      <div className="relative">
                        <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={aSchool}
                          onChange={(e) => setASchool(e.target.value)}
                          placeholder="e.g. Wagner High School"
                          className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Department / Office</label>
                      <input
                        type="text"
                        value={aDepartment}
                        onChange={(e) => setADepartment(e.target.value)}
                        placeholder="e.g. CTE Administration"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Admin Authorization Key */}
                  <div className="p-3.5 bg-indigo-950/40 border border-indigo-700/60 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-indigo-200 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Administrator Authorization Key</span>
                        <span className="text-rose-400 text-xs">*</span>
                      </label>
                      <span className="text-[10px] text-slate-400">
                        Provided by District CTE Office
                      </span>
                    </div>
                    <div className="relative">
                      <Key className="w-4 h-4 text-indigo-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={aAccessCode}
                        onChange={(e) => setAAccessCode(e.target.value.toUpperCase())}
                        placeholder="Enter master admin authorization key"
                        className="w-full bg-slate-950/90 border border-indigo-600/80 rounded-xl pl-9 pr-3 py-2 text-xs text-indigo-100 placeholder-indigo-600/60 font-mono tracking-wider focus:outline-none focus:border-indigo-400 uppercase"
                      />
                    </div>
                    <p className="text-[10px] text-indigo-300/80 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                      <span>Security key required to create administrator consoles. Contact CTE leadership for authorization.</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-indigo-900/40 flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>{loading ? 'Creating Administrator Console...' : 'Register Administrator Console'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* SHARED SIGN IN FORM */}
              {authMode === 'sign_in' && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder={
                          activePortal === 'student'
                            ? 'candidate@school.edu'
                            : activePortal === 'teacher'
                            ? 'instructor@school.edu'
                            : 'dcjones1441@gmail.com'
                        }
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {activePortal === 'admin' ? 'Administrator Password' : 'Password'}
                      {activePortal === 'admin' && <span className="text-rose-400 ml-1">*</span>}
                    </label>
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
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer mt-2 ${
                      activePortal === 'student'
                        ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/40'
                        : activePortal === 'teacher'
                        ? 'bg-teal-600 hover:bg-teal-500 shadow-teal-900/40'
                        : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40'
                    }`}
                  >
                    <span>
                      {loading
                        ? 'Authenticating...'
                        : activePortal === 'student'
                        ? 'Sign In to Candidate Dashboard'
                        : activePortal === 'teacher'
                        ? 'Sign In to Faculty Console'
                        : 'Sign In to Administrator Console'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-3 text-slate-500 font-medium">Or continue with</span>
                </div>
              </div>

              {/* Supabase Google Sign-In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2.5 cursor-pointer shadow-xs"
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
                <span>Continue with Google (Supabase Auth)</span>
              </button>

              {/* Discrete Restricted Administrator Gateway Toggle */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                  <span>Restricted Access:</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActivePortal(activePortal === 'admin' ? 'student' : 'admin');
                    setErrorMsg(null);
                  }}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{activePortal === 'admin' ? '← Back to Candidate & Faculty Portal' : 'District CTE Administrator Gateway'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Partition Notice */}
          <div className="mt-6 text-center text-xs text-slate-500 space-y-1">
            <p>
              Candidate data is strictly partitioned. Students only have access to their individualized curriculum and records.
            </p>
            <p className="text-[11px] text-slate-600">
              Aligned with Biotility BACE Credentialing Standards • 8 Knowledge & Practical Domains
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-600">
        BACE Prep Lab • Biotechnician Assistant Credentialing Exam Preparation System
      </footer>
    </div>
  );
};
