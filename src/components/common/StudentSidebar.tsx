import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Timer,
  TrendingUp,
  Award,
  UserRound,
  FlaskConical,
  Sparkles,
  School,
} from 'lucide-react';
import { useApp, StudentNavPage } from '../../context/AppContext';

interface StudentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({ isOpen, onClose }) => {
  const {
    studentPage,
    setStudentPage,
    overallReadiness,
    currentStudent,
    classes,
    isFacultyPreviewingStudent,
    returnToFacultyConsole,
  } = useApp();

  const currentClass = classes.find((c) => c.id === currentStudent?.class_id);
  const studentName = currentStudent?.profile?.first_name
    ? `${currentStudent.profile.first_name} ${currentStudent.profile.last_name}`
    : 'No Student Selected';
  const studentSubtext = currentClass
    ? `${currentClass.name} • ${currentClass.period}`
    : currentStudent?.profile?.school_name || 'Enrolled Student';

  const navItems: Array<{
    id: StudentNavPage;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learn', label: 'Learn', icon: BookOpen, badge: '8 Domains' },
    { id: 'practice', label: 'Practice', icon: Target },
    { id: 'bench_simulator', label: 'Bench Simulator', icon: FlaskConical, badge: 'Lab Math' },
    { id: 'mock_exam', label: 'Mock Exam', icon: Timer, badge: 'BACE Sim' },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: UserRound },
    { id: 'about_program', label: 'Wagner CTE & PLTW', icon: School, badge: 'Info' },
  ];

  const handleNav = (page: StudentNavPage) => {
    setStudentPage(page);
    onClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 w-64 border-r border-slate-800">
      {/* Student Profile snippet */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between text-xs uppercase font-semibold text-slate-400 tracking-wider mb-1">
          <span>Candidate Portal</span>
          {isFacultyPreviewingStudent && (
            <button
              onClick={returnToFacultyConsole}
              className="text-[10px] text-teal-400 hover:text-teal-300 font-semibold lowercase cursor-pointer"
              title="Return to your Teacher Dashboard"
            >
              ← faculty
            </button>
          )}
        </div>
        <div className="text-sm font-semibold text-white truncate">{studentName}</div>
        <div className="text-xs text-slate-400 truncate">{studentSubtext}</div>

        {/* Mini overall readiness pill */}
        <div className="mt-3 bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium">BACE Readiness</span>
            <span className="text-blue-400 font-bold">{overallReadiness}%</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, overallReadiness)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            studentPage === item.id ||
            (item.id === 'learn' && (studentPage === 'domain_detail' || studentPage === 'lesson')) ||
            (item.id === 'mock_exam' && (studentPage === 'mock_exam_runner' || studentPage === 'exam_results'));

          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
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
                      ? 'bg-blue-700 text-blue-100'
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

      {/* Bottom info footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center space-x-2 text-slate-300">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span className="font-semibold text-white">Biotility BACE Benchmark</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Official passing goal is 80% composite accuracy across all 8 domains.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0 w-64 h-full">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
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
