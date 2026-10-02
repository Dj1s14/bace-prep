import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  FlaskConical,
  Calendar,
  Briefcase,
  Menu,
  RotateCcw,
  ChevronDown,
  Check,
  Users,
  Settings2,
  ShieldCheck,
  KeyRound,
  Sparkles,
  School,
  Layers,
  ChevronRight,
  LogOut,
  User,
  Mail,
  Award,
  BookOpen,
  ClipboardList,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
  onToggleSidebar?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
  onToggleSidebar,
  isMobileMenuOpen,
}) => {
  const {
    role,
    currentUser,
    currentStudent,
    currentTeacher,
    studentPage,
    teacherPage,
    classes,
    students,
    teachers,
    signOut,
    resetAllData,
    setRole,
    setStudentPage,
    setTeacherPage,
    setAdminPage,
    isProduction,
    isFacultyPreviewingStudent,
    returnToFacultyConsole,
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = onToggleSidebar || onToggleMobileMenu;

  const isStudent = role === 'student';
  const isTeacher = role === 'teacher';
  const isAdmin = role === 'admin';

  // Automatically close dropdown on navigation, role change, or user change
  useEffect(() => {
    setDropdownOpen(false);
  }, [studentPage, teacherPage, role, currentUser]);

  // Close dropdown on outside click, touch, or Escape key
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Distinct Portal Look & Theme configurations
  const headerTheme = isStudent
    ? {
        bg: 'bg-[#0B192C]',
        border: 'border-blue-900/60',
        topAccent: 'border-t-2 border-t-blue-500',
        brandIconBg: 'bg-blue-600',
        brandTitle: 'BACE Prep Lab',
        badgeText: 'Candidate Portal',
        badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        subtitle: 'Biotility BACE Prep • Candidate Study Space',
        avatarBg: 'bg-blue-600',
        roleLabel: 'Student Candidate',
      }
    : isTeacher
    ? {
        bg: 'bg-[#06201D]',
        border: 'border-teal-900/60',
        topAccent: 'border-t-2 border-t-teal-400',
        brandIconBg: 'bg-teal-600',
        brandTitle: 'BACE Educator Portal',
        badgeText: 'Faculty Console',
        badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
        subtitle: 'Faculty Command Center • Curriculum & Cohort Analytics',
        avatarBg: 'bg-teal-600',
        roleLabel: 'Faculty Instructor',
      }
    : {
        bg: 'bg-[#0A1128]',
        border: 'border-indigo-900/60',
        topAccent: 'border-t-2 border-t-indigo-500',
        brandIconBg: 'bg-indigo-600',
        brandTitle: 'BACE District Admin',
        badgeText: 'System Admin',
        badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        subtitle: 'Site Administrator • School & Class Configuration',
        avatarBg: 'bg-indigo-600',
        roleLabel: 'Site Administrator',
      };

  const studentDisplayName = currentStudent.profile
    ? `${currentStudent.profile.first_name} ${currentStudent.profile.last_name}`
    : 'Candidate';

  const teacherDisplayName = currentTeacher
    ? `${currentTeacher.prefix ? `${currentTeacher.prefix} ` : ''}${currentTeacher.first_name} ${currentTeacher.last_name}`
    : 'Faculty Instructor';

  const adminDisplayName = currentUser
    ? `${currentUser.first_name} ${currentUser.last_name}`
    : 'Administrator';

  const studentInitials = currentStudent.profile
    ? `${currentStudent.profile.first_name[0] || ''}${currentStudent.profile.last_name[0] || ''}`.toUpperCase()
    : 'SC';

  const teacherInitials = currentTeacher
    ? `${currentTeacher.first_name[0] || ''}${currentTeacher.last_name[0] || ''}`.toUpperCase()
    : 'TC';

  const adminInitials = 'AD';

  const enrolledClass = classes.find((c) => c.id === currentStudent.class_id);

  return (
    <header
      className={`border-b ${headerTheme.bg} ${headerTheme.border} ${headerTheme.topAccent} text-white px-4 sm:px-6 py-3 transition-colors duration-200 relative z-40 shrink-0 shadow-md`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Brand & Identity */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md ${headerTheme.brandIconBg}`}
            >
              {isStudent ? (
                <GraduationCap className="w-5 h-5" />
              ) : isTeacher ? (
                <FlaskConical className="w-5 h-5" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                  {headerTheme.brandTitle}
                </span>
                <span
                  className={`hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${headerTheme.badgeClass}`}
                >
                  {headerTheme.badgeText}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {isStudent && enrolledClass ? (
                  <span>{enrolledClass.name} • Target Exam: {currentStudent.profile.target_exam_date || 'May 12, 2026'}</span>
                ) : isTeacher ? (
                  <span>{currentTeacher.school_name || 'Biotechnology Academy'} • {currentTeacher.department || 'CTE Biomedical Science'}</span>
                ) : (
                  <span>Biotility BACE Prep Lab System</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Candidate / Faculty Status & Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Faculty Preview Mode Quick Return */}
          {isFacultyPreviewingStudent && (
            <button
              onClick={returnToFacultyConsole}
              className="px-2.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
              title="Exit preview and return to Faculty Educator Console"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Return to Faculty</span>
            </button>
          )}

          {/* Teacher Student Access Preview Button */}
          {currentUser?.role !== 'student' && !isStudent && (
            <button
              onClick={() => {
                setRole('student');
                setStudentPage('dashboard');
              }}
              className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-blue-950/70 hover:bg-blue-900/80 border border-blue-700/60 text-blue-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Preview the candidate student dashboard and simulators"
            >
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              <span>Student Preview</span>
            </button>
          )}

          {currentUser?.role === 'admin' && !isStudent && <button onClick={() => setRole(isTeacher ? 'admin' : 'teacher')} className="px-2.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold">{isTeacher ? 'Admin Portal' : 'Teacher Workspace'}</button>}
          {/* Wagner CTE & PLTW Info Button */}
          <button
            onClick={() => {
              if (isStudent) setStudentPage('about_program');
              else if (isTeacher) setTeacherPage('about_program');
              else if (isAdmin) setAdminPage('dashboard');
            }}
            className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 text-blue-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            title="View Wagner CTE Program & PLTW Curriculum Alignment"
          >
            <School className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Wagner CTE & PLTW</span>
          </button>

          {/* Quick Stat Pill for Student */}
          {isStudent && (
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="text-slate-400">Mastery Readiness:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  currentStudent.overall_readiness >= 80
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : currentStudent.overall_readiness >= 70
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {currentStudent.overall_readiness}%
              </span>
            </div>
          )}

          {/* Quick Stat Pill for Faculty */}
          {isTeacher && (
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="text-slate-400">Enrolled Roster:</span>
              <span className="font-bold text-teal-300">
                {students.length} {students.length === 1 ? 'Candidate' : 'Candidates'}
              </span>
            </div>
          )}

          {/* Institutional Badge for Faculty & Admin */}
          {!isStudent && (
            <div
              className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold"
              title="Wagner High School CTE Academic Platform"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Wagner CTE Portal</span>
            </div>
          )}

          {/* User Profile & Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 pl-2 pr-2.5 py-1.5 rounded-xl hover:bg-white/10 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
              title="Account Details & Settings"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xs ${headerTheme.avatarBg}`}
              >
                {isStudent ? studentInitials : isTeacher ? teacherInitials : adminInitials}
              </div>
              <div className="hidden md:block text-left text-xs">
                <div className="font-semibold text-slate-200 truncate max-w-[130px]">
                  {isStudent ? studentDisplayName : isTeacher ? teacherDisplayName : adminDisplayName}
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                  {headerTheme.roleLabel}
                </div>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Backdrop & Menu */}
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-50 bg-black/30 backdrop-blur-2xs cursor-default"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                  }}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 text-xs overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                {/* Account Details Header */}
                <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border text-teal-300 bg-teal-500/20 border-teal-500/40">
                      {headerTheme.roleLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {isStudent ? currentStudent.profile.id : currentTeacher.id}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-white mt-1.5">
                    {isStudent ? studentDisplayName : isTeacher ? teacherDisplayName : adminDisplayName}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {isStudent ? currentStudent.profile.email : isAdmin ? currentUser?.email : currentTeacher.email}
                  </div>
                </div>

                {/* Account Status / Metadata */}
                <div className="p-3 border-b border-slate-800 bg-slate-900/50 space-y-2">
                  {isStudent ? (
                    <>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <School className="w-3.5 h-3.5 text-blue-400" />
                          Class Section:
                        </span>
                        <span className="font-medium text-slate-200">
                          {enrolledClass ? `${enrolledClass.name} (${enrolledClass.period})` : 'Self-Paced'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          Target Exam:
                        </span>
                        <span className="font-medium text-amber-300">
                          {currentStudent.profile.target_exam_date || 'May 12, 2026'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-emerald-400" />
                          Mastered Lessons:
                        </span>
                        <span className="font-bold text-emerald-400">
                          {currentStudent.lessons_completed} Lessons
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <School className="w-3.5 h-3.5 text-teal-400" />
                          Institution:
                        </span>
                        <span className="font-medium text-slate-200 truncate max-w-[150px]">
                          {currentTeacher.school_name || 'Biotechnology Academy'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-teal-400" />
                          Enrolled Candidates:
                        </span>
                        <span className="font-bold text-teal-300">
                          {students.length} Students
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {currentUser && currentUser.role !== 'student' && <div className="p-2 border-b border-slate-800 space-y-1" aria-label="Switch workspace">
                  <p className="px-3 py-1 text-slate-400">Your workspaces</p>
                  {currentUser.role === 'admin' && <button onClick={() => setRole('admin')} className="block w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800">Admin Portal</button>}
                  <button onClick={() => setRole('teacher')} className="block w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800">Teacher Workspace</button>
                  <button onClick={() => setRole('student')} className="block w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800">Student Preview — Demo Student</button>
                </div>}
                {/* Navigation Shortcuts */}
                <div className="p-2 border-b border-slate-800 space-y-1">
                  {isStudent ? (
                    <>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          setStudentPage('progress');
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-blue-400" />
                        <span>My Progress & Domain Reports</span>
                      </button>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          setStudentPage('bench_simulator');
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left cursor-pointer"
                      >
                        <FlaskConical className="w-4 h-4 text-teal-400" />
                        <span>Bench Simulator & Lab Math</span>
                      </button>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          setStudentPage('learn');
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                        <span>Curriculum Modules & Drills</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          setRole('teacher'); setTeacherPage('classes');
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left cursor-pointer"
                      >
                        <School className="w-4 h-4 text-teal-400" />
                        <span>Manage Class Sections & Join Codes</span>
                      </button>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          setRole('teacher'); setTeacherPage('assignments');
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left cursor-pointer"
                      >
                        <ClipboardList className="w-4 h-4 text-amber-400" />
                        <span>Assignments & Gradebook</span>
                      </button>
                    </>
                  )}
                </div>


                {/* Sign Out & Maintenance Actions */}
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut();
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-xl font-medium transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>

                  {!isStudent && (
                    <button
                      onClick={() => {
                        if (window.confirm('Reset all cached application data and start with clean fresh rosters?')) {
                          resetAllData();
                          setDropdownOpen(false);
                        }
                      }}
                      className="w-full flex items-center justify-center space-x-1.5 py-1 text-[10px] text-slate-500 hover:text-slate-400 hover:bg-slate-800/40 rounded transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Data Cache</span>
                    </button>
                  )}
                </div>
              </div>
            </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

