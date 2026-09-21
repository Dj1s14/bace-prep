import React from 'react';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Users,
  Database,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types/database';

interface PortalGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortalGatewayModal: React.FC<PortalGatewayModalProps> = ({ isOpen, onClose }) => {
  const { role, setRole, setStudentPage, setTeacherPage, setAdminPage } = useApp();

  if (!isOpen) return null;

  const handleSelectPortal = (targetRole: UserRole) => {
    setRole(targetRole);
    if (targetRole === 'student') {
      setStudentPage('dashboard');
    } else if (targetRole === 'teacher') {
      setTeacherPage('dashboard');
    } else {
      setAdminPage('dashboard');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-800/60">
                BACE Portal Gateway
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Select Your Designated Portal
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Access is segregated into dedicated, role-specific workspaces for candidates, educators, and administrators.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portals Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Student Portal */}
          <div
            className={`flex flex-col justify-between rounded-xl p-5 border transition-all ${
              role === 'student'
                ? 'bg-blue-950/30 border-blue-500 ring-1 ring-blue-500/50'
                : 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/70'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                {role === 'student' ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Learner</span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Student Portal</h3>
                <p className="text-xs text-blue-300 font-medium mt-0.5">
                  BACE Exam Candidate Study Space
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated learning environment for exam candidates. Study the 8 BACE domains, take practice quizzes, complete mock exams, and practice with the interactive virtual benchtop.
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>8 Biotility BACE Learning Modules</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Interactive Benchtop & Practice Drills</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Full-Length 100-Item Mock Exam</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectPortal('student')}
              className={`mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                role === 'student'
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
                  : 'bg-slate-700 hover:bg-blue-600 text-slate-200 hover:text-white'
              }`}
            >
              <span>{role === 'student' ? 'Continue in Student Portal' : 'Enter Student Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Teacher Portal */}
          <div
            className={`flex flex-col justify-between rounded-xl p-5 border transition-all ${
              role === 'teacher'
                ? 'bg-teal-950/30 border-teal-500 ring-1 ring-teal-500/50'
                : 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/70'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-600/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                {role === 'teacher' ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded border border-teal-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Instructor</span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Educator Portal</h3>
                <p className="text-xs text-teal-300 font-medium mt-0.5">
                  Faculty & Cohort Command Center
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Instructor workspace for monitoring classroom mastery. Track individual student domain benchmarks, assign targeted drills, review item statistics, and manage rosters.
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-400" />
                  <span>Class Rosters & Student Mastery Breakdown</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                  <span>Assign Review Modules & Homework</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Exam Item Performance Analytics</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectPortal('teacher')}
              className={`mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                role === 'teacher'
                  ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-xs'
                  : 'bg-slate-700 hover:bg-teal-600 text-slate-200 hover:text-white'
              }`}
            >
              <span>{role === 'teacher' ? 'Continue in Educator Portal' : 'Enter Educator Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Admin Portal */}
          <div
            className={`flex flex-col justify-between rounded-xl p-5 border transition-all ${
              role === 'admin'
                ? 'bg-indigo-950/30 border-indigo-500 ring-1 ring-indigo-500/50'
                : 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/70'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                {role === 'admin' ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-900/60 px-2 py-0.5 rounded border border-indigo-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Administrator</span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Administration Portal</h3>
                <p className="text-xs text-indigo-300 font-medium mt-0.5">
                  Institutional & Database Oversight
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                High-level administrative console. Manage student and teacher directories, remove students and teachers, configure classes, and sync curriculum with Supabase.
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Student & Teacher Directory & Removal</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Supabase Schema & Question Sync</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>System Audit & Section Setup</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectPortal('admin')}
              className={`mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                role === 'admin'
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                  : 'bg-slate-700 hover:bg-indigo-600 text-slate-200 hover:text-white'
              }`}
            >
              <span>{role === 'admin' ? 'Continue in Admin Portal' : 'Enter Admin Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer info note */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Portals are completely isolated: student, teacher, and admin sessions are strictly separated.</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white underline font-medium"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
