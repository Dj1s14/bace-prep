import React from 'react';
import {
  LayoutDashboard,
  School,
  Users,
  ClipboardList,
  Database,
  BarChart2,
  FileCheck,
  Settings,
  Sparkles,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { useApp, TeacherNavPage } from '../../context/AppContext';

interface TeacherSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isOpen, onClose }) => {
  const {
    teacherPage,
    setTeacherPage,
    assignments,
    questions,
    students,
    classes,
    currentTeacher,
    openAccountModal,
    setRole,
    setStudentPage,
  } = useApp();

  const teacherDisplayName = currentTeacher?.last_name
    ? `${currentTeacher.prefix ? `${currentTeacher.prefix} ` : ''}${currentTeacher.first_name} ${currentTeacher.last_name}`
    : 'No Teacher Account';

  const teacherDepartment = currentTeacher?.department || currentTeacher?.school_name || 'Department of Biotechnology';

  const navItems: Array<{
    id: TeacherNavPage;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes', label: 'Class Sections & Codes', icon: School, badge: `${classes.length} Periods` },
    { id: 'students', label: 'Students', icon: Users, badge: `${students.length} Roster` },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList, badge: `${assignments.length}` },
    { id: 'question_bank', label: 'Question Bank', icon: Database, badge: `${questions.length}` },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'mock_exams', label: 'Mock Exams', icon: FileCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about_program', label: 'Wagner CTE & PLTW', icon: GraduationCap, badge: 'Info' },
  ];

  const handleNav = (page: TeacherNavPage) => {
    setTeacherPage(page);
    onClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 w-64 border-r border-slate-800">
      {/* Teacher Profile snippet */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between text-xs uppercase font-semibold text-teal-400 tracking-wider mb-1">
          <span>Faculty Educator Console</span>
          <button
            onClick={() => openAccountModal('switch')}
            className="text-[10px] text-teal-300 hover:text-teal-200 font-medium lowercase"
          >
            switch
          </button>
        </div>
        <div className="text-sm font-semibold text-white truncate">{teacherDisplayName}</div>
        <div className="text-xs text-slate-400 truncate">{teacherDepartment}</div>

        <div className="mt-3 bg-teal-950/40 rounded-lg p-2.5 border border-teal-800/40">
          <div className="text-xs text-teal-200 font-medium">Cohort Exam Target</div>
          <div className="text-xs text-slate-300 mt-0.5">May 12, 2026 • 80% Benchmark</div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            teacherPage === item.id ||
            (item.id === 'students' && teacherPage === 'student_detail');

          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-teal-800 text-teal-100'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Student Candidate Access for Faculty */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-gradient-to-br from-blue-950/80 to-slate-900 border border-blue-800/60 text-xs">
        <div className="font-bold text-blue-200 flex items-center gap-1.5 mb-1">
          <GraduationCap className="w-4 h-4 text-blue-400" />
          <span>Student Candidate Access</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5">
          Preview the candidate portal, lab math bench simulator, practice sets, and mock exams as seen by students.
        </p>
        <button
          type="button"
          onClick={() => {
            setRole('student');
            setStudentPage('dashboard');
            onClose();
          }}
          className="w-full py-1.5 px-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <span>Open Candidate Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom info footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
        <div className="flex items-center space-x-2 text-teal-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Supabase Connected</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400 font-mono">
          gfdbcrfqbsowlbnprqqn
        </p>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex md:flex-shrink-0 w-64 h-full">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 shadow-xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
