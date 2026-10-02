import { PasswordRecovery } from './components/auth/PasswordRecovery';
import { SaveStatus } from './components/common/SaveStatus';
import React, { useEffect, useRef, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { StudentSidebar } from './components/common/StudentSidebar';
import { TeacherSidebar } from './components/common/TeacherSidebar';
import { AdminSidebar } from './components/common/AdminSidebar';
import { GoogleAuthModal } from './components/common/GoogleAuthModal';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { LearnView } from './components/student/LearnView';
import { LessonView } from './components/student/LessonView';
import { PracticeView } from './components/student/PracticeView';
import { MockExamIntro } from './components/student/MockExamIntro';
import { MockExamRunner } from './components/student/MockExamRunner';
import { ExamResultsView } from './components/student/ExamResultsView';
import { StudentProgressView } from './components/student/StudentProgressView';
import { AchievementsView } from './components/student/AchievementsView';
import { BenchSimulatorView } from './components/bench/BenchSimulatorView';

// Teacher Views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherClassesView } from './components/teacher/TeacherClassesView';
import { TeacherStudentsView } from './components/teacher/TeacherStudentsView';
import { TeacherAssignmentsView } from './components/teacher/TeacherAssignmentsView';
import { TeacherQuestionBankView } from './components/teacher/TeacherQuestionBankView';
import { TeacherAnalyticsView } from './components/teacher/TeacherAnalyticsView';
import { TeacherMockExamsView } from './components/teacher/TeacherMockExamsView';
import { TeacherSettingsView } from './components/teacher/TeacherSettingsView';

// Admin Views
import { AdminPortal } from './components/admin/AdminPortal';
import { LandingPage } from './components/landing/LandingPage';

const MainContent: React.FC<{ sidebarOpen: boolean; setSidebarOpen: (o: boolean) => void }> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const {
    role,
    currentRole: cr,
    currentUser,
    isFacultyPreviewingStudent,
    returnToFacultyConsole,
    studentPage,
    teacherPage,
    selectedLessonId,
  } = useApp();

  // Strict RBAC Enforcement:
  // If the logged-in user is a student candidate, they are locked to 'student' role.
  const currentRole = currentUser?.role === 'student' ? 'student' : (role || cr || 'student');

  const renderStudentPage = () => {
    switch (studentPage) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'learn':
      case 'domain_detail':
        return <LearnView />;
      case 'lesson':
        return <LessonView />;
      case 'practice':
        return <PracticeView />;
      case 'bench_simulator':
        return <BenchSimulatorView />;
      case 'mock_exam':
        return <MockExamIntro />;
      case 'mock_exam_runner':
        return <MockExamRunner />;
      case 'exam_results':
        return <ExamResultsView />;
      case 'progress':
      case 'profile':
        return <StudentProgressView />;
      case 'achievements':
        return <AchievementsView />;
      case 'about_program':
        return <LandingPage />;
      default:
        return <StudentDashboard />;
    }
  };

  const renderTeacherPage = () => {
    switch (teacherPage) {
      case 'dashboard':
        return <TeacherDashboard />;
      case 'classes':
        return <TeacherClassesView />;
      case 'students':
      case 'student_detail':
        return <TeacherStudentsView />;
      case 'assignments':
        return <TeacherAssignmentsView />;
      case 'question_bank':
        return <TeacherQuestionBankView />;
      case 'analytics':
        return <TeacherAnalyticsView />;
      case 'mock_exams':
        return <TeacherMockExamsView />;
      case 'settings':
        return <TeacherSettingsView />;
      case 'about_program':
        return <LandingPage />;
      default:
        return <TeacherDashboard />;
    }
  };

  const mainScrollRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (currentRole === 'student' && studentPage === 'lesson') {
      mainScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [currentRole, studentPage, selectedLessonId]);

  // When taking a mock exam, give full focus without distracting sidebar
  const isTakingExam = currentRole === 'student' && studentPage === 'mock_exam_runner';

  return (
    <div className="h-screen bg-slate-50 flex flex-col antialiased text-slate-800 overflow-hidden">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isMobileMenuOpen={sidebarOpen}
      />

      <SaveStatus />
      {/* Faculty Previewing Student Mode Alert Banner */}
      {isFacultyPreviewingStudent && (
        <div className="bg-indigo-950 text-indigo-100 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-indigo-800 shadow-sm z-30">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              <strong>Faculty Preview Mode Active:</strong> You are using the generic preview account:{' '}
              <span className="font-semibold text-white">Demo Student</span>. Preview work does not change student records.
            </span>
          </div>
          <button
            type="button"
            onClick={returnToFacultyConsole}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1 rounded-lg text-[11px] transition-colors shadow-sm cursor-pointer"
          >
            ← Return to Faculty Console
          </button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {!isTakingExam && currentRole === 'student' && (
          <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {!isTakingExam && currentRole === 'teacher' && (
          <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {!isTakingExam && currentRole === 'admin' && (
          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <main ref={mainScrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 w-full relative">
          <div className="max-w-7xl mx-auto">
            {currentRole === 'student'
              ? renderStudentPage()
              : currentRole === 'teacher'
              ? renderTeacherPage()
              : <AdminPortal />}
          </div>
        </main>
      </div>
    </div>
  );
};

const AppRoot: React.FC = () => {
  const { isAuthenticated, currentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated || !currentUser) {
    return <LandingPage />;
  }

  return (
    <>
      <MainContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <GoogleAuthModal />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <PasswordRecovery />
      <AppRoot />
    </AppProvider>
  );
}
