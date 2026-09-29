import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Domain,
  Topic,
  Lesson,
  Question,
  Achievement,
  SchoolClass,
  StudentOverview,
  TeacherProfile,
  Assignment,
  UserRole,
  StudentStatus,
  QuizAttempt,
  StudentActivitySession,
  LessonGradeRecord,
  Profile,
  AssignmentProgress,
  AppEnvironment,
} from '../types/database';
import {
  INITIAL_DOMAINS,
  INITIAL_TOPICS,
  INITIAL_LESSONS,
  INITIAL_QUESTIONS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_CLASSES,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS_ROSTER,
  INITIAL_ASSIGNMENTS,
  INITIAL_ACTIVITY_SESSIONS,
  INITIAL_LESSON_GRADES,
} from '../data/initialData';
import { cleanQuestionText } from '../utils/questionUtils';
import { getSupabase } from '../lib/supabase';

export type StudentNavPage =
  | 'dashboard'
  | 'learn'
  | 'domain_detail'
  | 'lesson'
  | 'practice'
  | 'bench_simulator'
  | 'mock_exam'
  | 'mock_exam_runner'
  | 'exam_results'
  | 'progress'
  | 'achievements'
  | 'profile'
  | 'about_program';

export type TeacherNavPage =
  | 'dashboard'
  | 'classes'
  | 'students'
  | 'student_detail'
  | 'assignments'
  | 'question_bank'
  | 'analytics'
  | 'mock_exams'
  | 'settings'
  | 'about_program';

export type AdminNavPage =
  | 'dashboard'
  | 'students'
  | 'teachers'
  | 'classes'
  | 'system';

export interface BenchSimulatorStats {
  pipetteDrillsCompleted: number;
  pipetteAccuracy: number;
  mathProblemsSolved: number;
  mathAccuracy: number;
  auditsCompleted: number;
  auditsPassed: number;
  rubricsSignedOff: Record<string, boolean>;
  lessonsCompleted?: Record<string, boolean>;
  spectroRunsCompleted?: number;
  spectroAccuracy?: number;
  gelSizingsCompleted?: number;
  gelSizingAccuracy?: number;
  centrifugeBalancesCompleted?: number;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role?: UserRole;
}

interface AppContextType {
  // Authentication & Session
  currentUser: Profile | null;
  isAuthenticated: boolean;
  role: UserRole;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  registerStudent: (data: {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    class_join_code?: string;
    target_exam_date?: string;
    school_name?: string;
  }) => Promise<{ success: boolean; error?: string; student?: StudentOverview }>;
  registerTeacher: (data: {
    prefix?: string;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    school_name: string;
    department?: string;
    initial_class_name?: string;
    period?: string;
    access_code?: string;
  }) => Promise<{ success: boolean; error?: string; teacher?: TeacherProfile }>;
  registerAdmin: (data: {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    school_name?: string;
    department?: string;
    access_code?: string;
  }) => Promise<{ success: boolean; error?: string; profile?: Profile }>;
  loginUser: (email: string, password?: string, preferredRole?: UserRole) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;

  // Faculty Access Code Security
  facultyAccessCode: string;
  updateFacultyAccessCode: (newCode: string) => void;
  isFacultyPreviewingStudent: boolean;
  returnToFacultyConsole: () => void;

  // Student navigation
  studentPage: StudentNavPage;
  setStudentPage: (page: StudentNavPage) => void;
  // Teacher navigation
  teacherPage: TeacherNavPage;
  setTeacherPage: (page: TeacherNavPage) => void;
  // Admin navigation
  adminPage: AdminNavPage;
  setAdminPage: (page: AdminNavPage) => void;
  deleteClass: (classId: string) => void;

  // Supabase Google Auth
  googleUser: GoogleUserInfo | null;
  isGoogleAuthLoading: boolean;
  signInWithGoogle: (preferredRole?: UserRole) => Promise<{ success: boolean; error?: string }>;
  oneClickGoogleSignIn: (email: string, name: string, preferredRole: UserRole) => void;
  signOutGoogle: () => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAuthModal: (preferredRole?: UserRole) => void;
  authModalPreferredRole: UserRole;

  // Active selection pointers
  selectedDomainId: string | null;
  setSelectedDomainId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string | null) => void;

  // Data collections
  domains: Domain[];
  topics: Topic[];
  lessons: Lesson[];
  questions: Question[];
  achievements: Achievement[];
  classes: SchoolClass[];
  students: StudentOverview[];
  teachers: TeacherProfile[];
  assignments: Assignment[];
  assignmentProgress: AssignmentProgress[];
  completedLessonIds: string[];
  activitySessions: StudentActivitySession[];
  lessonGrades: LessonGradeRecord[];

  // Active real teacher stats & state
  currentTeacher: TeacherProfile;
  activeTeacherId: string;
  setActiveTeacherId: (id: string) => void;
  createTeacherAccount: (data: {
    prefix?: string;
    first_name: string;
    last_name: string;
    email: string;
    school_name: string;
    department?: string;
    initial_class_name?: string;
  }) => TeacherProfile;
  updateTeacherAccount: (id: string, updates: Partial<TeacherProfile>) => void;
  deleteTeacherAccount: (id: string) => void;

  // Active real student stats & state
  currentStudent: StudentOverview;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  createStudentAccount: (data: {
    first_name: string;
    last_name: string;
    email: string;
    student_number?: string;
    class_id: string;
    school_name?: string;
    target_exam_date?: string;
    readiness?: number;
  }) => StudentOverview;
  updateStudentAccount: (id: string, updates: Partial<StudentOverview>) => void;
  deleteStudentAccount: (id: string) => void;
  createTestStudent: (data: {
    first_name: string;
    last_name: string;
    class_id: string;
    readiness?: number;
  }) => StudentOverview;

  // Account Modal
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  accountModalTab: 'switch' | 'create_teacher' | 'create_student';
  openAccountModal: (tab?: 'switch' | 'create_teacher' | 'create_student') => void;

  overallReadiness: number;
  lastExamAttempt: QuizAttempt | null;
  setLastExamAttempt: (attempt: QuizAttempt | null) => void;

  // Mock Exam active configuration
  activeExamConfig: {
    title: string;
    totalQuestions: number;
    timeLimitMinutes: number;
    quizType: 'mock_quick' | 'mock_half' | 'mock_full';
  } | null;
  setActiveExamConfig: (config: {
    title: string;
    totalQuestions: number;
    timeLimitMinutes: number;
    quizType: 'mock_quick' | 'mock_half' | 'mock_full';
  } | null) => void;

  // Practice active configuration
  activePracticeConfig: {
    mode: string;
    domainId?: string;
    topicId?: string;
    lessonId?: string;
    count: number;
  } | null;
  setActivePracticeConfig: (config: {
    mode: string;
    domainId?: string;
    topicId?: string;
    lessonId?: string;
    count: number;
  } | null) => void;

  // Actions
  recordLessonCompletion: (lessonId: string) => void;
  recordExamSubmission: (attempt: QuizAttempt) => void;
  deleteActivitySession: (sessionId: string) => void;
  updateDomainMastery: (domainId: string, newScore: number) => void;
  addNewQuestion: (question: Omit<Question, 'id' | 'created_at'>) => void;
  createQuestion: (question: Omit<Question, 'id' | 'created_at'>) => void;
  addNewAssignment: (assignment: Omit<Assignment, 'id' | 'created_at'>) => void;
  createAssignment: (assignment: Omit<Assignment, 'id' | 'created_at'>) => void;
  deleteAssignment: (assignmentId: string) => void;
  markAssignmentCompleted: (assignmentId: string, studentId?: string, score?: number) => void;
  createClass: (newClass: Omit<SchoolClass, 'id' | 'created_at'>) => void;
  recordLessonGrade: (grade: Omit<LessonGradeRecord, 'id' | 'submitted_at'>) => void;
  updateLessonGrade: (id: string, updates: Partial<LessonGradeRecord>) => void;
  startLesson: (lessonId: string) => void;
  openDomain: (domainId: string) => void;
  startPractice: (config: { mode: string; domainId?: string; topicId?: string; count: number }) => void;
  startMockExam: (type: 'quick' | 'half' | 'full') => void;
  viewStudentProfile: (studentId: string) => void;
  loginDemoStudent: () => void;
  loginDemoTeacher: () => void;
  loginDemoAdmin: () => void;
  resetAllData: () => void;
  environment: AppEnvironment;
  setEnvironment: (env: AppEnvironment) => void;
  isProduction: boolean;
  isDemo: boolean;
  resetDemoSandbox: () => void;
  demoModeEnabled: boolean;
  setDemoModeEnabled: (enabled: boolean) => void;
  purgeDemoData: () => void;
  transferStudentPeriod: (studentId: string, newClassId: string) => void;
  regenerateClassJoinCode: (classId: string) => string;
  resetStudentAccess: (studentId: string) => { tempPassword: string; studentName: string };

  // Bench Simulator State & Actions
  benchStats: BenchSimulatorStats;
  recordBenchActivity: (
    type: 'pipette' | 'math' | 'audit' | 'rubric' | 'spectro' | 'gel' | 'centrifuge',
    score: number,
    total: number,
    details?: string,
    rubricId?: string
  ) => void;
  markBenchLessonComplete: (lessonId: string, completed?: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'bace_user_role',
  AUTH_USER: 'bace_auth_user',
  USER_CREDENTIALS: 'bace_user_credentials',
  STUDENT_PAGE: 'bace_student_page',
  TEACHER_PAGE: 'bace_teacher_page',
  QUESTIONS: 'bace_questions',
  ASSIGNMENTS: 'bace_assignments',
  ASSIGNMENT_PROGRESS: 'bace_assignment_progress',
  STUDENT_COMPLETED_LESSONS: 'bace_student_completed_lessons',
  STUDENTS: 'bace_students_roster',
  TEACHERS: 'bace_teachers_roster',
  ACTIVE_TEACHER_ID: 'bace_active_teacher_id',
  ACTIVE_STUDENT_ID: 'bace_active_student_id',
  ACTIVITY_SESSIONS: 'bace_activity_sessions',
  LESSON_GRADES: 'bace_lesson_grades',
  CLASSES: 'bace_classes',
  PURGED_LEGACY_TEST_DATA: 'bace_purged_test_identities_v6',
};

// Safe default fallback objects when rosters are clean
const DEFAULT_EMPTY_STUDENT: StudentOverview = {
  profile: {
    id: 'candidate_default',
    first_name: 'Student',
    last_name: 'Candidate',
    email: 'candidate@biotechprep.edu',
    role: 'student',
    school_name: 'Biotechnology & Life Sciences Academy',
    target_exam_date: 'May 12, 2026',
    created_at: new Date().toISOString(),
  },
  class_id: 'cls_biotech_1',
  overall_readiness: 0,
  domain_mastery: {
    d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0, d7: 0, d8: 0,
  },
  last_active: 'Enrolled',
  status: 'Needs Review',
  lessons_completed: 0,
  questions_attempted: 0,
  accuracy: 0,
  mock_exam_scores: [],
  weakest_topics: [],
  strongest_topics: [],
  recent_activities: [],
};

const DEFAULT_EMPTY_TEACHER: TeacherProfile = {
  id: 'instructor_default',
  prefix: 'Dr.',
  first_name: 'Faculty',
  last_name: 'Instructor',
  email: 'instructor@biotechprep.edu',
  school_name: 'Biotechnology & Life Sciences Academy',
  department: 'CTE Biomedical Science',
  created_at: new Date().toISOString(),
};

// ==========================================
// Isolated Environment Seeds & Storage Utils
// ==========================================

export const getEnvStorageKey = (env: AppEnvironment, base: string) => `bace_${env}_${base}`;

export function loadEnvData<T>(env: AppEnvironment, base: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(getEnvStorageKey(env, base));
    if (raw !== null) {
      return JSON.parse(raw);
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export function saveEnvData<T>(env: AppEnvironment, base: string, data: T): void {
  try {
    localStorage.setItem(getEnvStorageKey(env, base), JSON.stringify(data));
  } catch (e) {
    console.warn(`Error saving ${base} in ${env} environment`, e);
  }
}

export function removeEnvData(env: AppEnvironment, base: string): void {
  try {
    localStorage.removeItem(getEnvStorageKey(env, base));
  } catch (e) {
    console.warn(`Error removing ${base} in ${env} environment`, e);
  }
}

export const DEMO_SEED_STUDENT: StudentOverview = {
  profile: {
    id: 'stu_demo_wagner_jordan',
    first_name: 'Jordan',
    last_name: 'Rivera',
    email: 'jordan.rivera@wagner-cte.org',
    role: 'student',
    school_name: 'Wagner High School',
    class_id: 'cls_biotech_2',
    target_exam_date: 'May 12, 2026',
    created_at: new Date().toISOString(),
  },
  class_id: 'cls_biotech_2',
  overall_readiness: 82,
  domain_mastery: {
    d1: 85,
    d2: 78,
    d3: 92,
    d4: 80,
    d5: 75,
    d6: 88,
    d7: 84,
    d8: 76,
  },
  last_active: 'Just now',
  status: 'Ready',
  lessons_completed: 14,
  questions_attempted: 86,
  accuracy: 84,
  mock_exam_scores: [78, 82],
  weakest_topics: [
    { name: 'PCR Primer Design', percentage: 60 },
    { name: 'Centrifuge RCF Calculations', percentage: 65 },
  ],
  strongest_topics: [
    { name: 'Aseptic Technique', percentage: 95 },
    { name: 'Micropipetting Precision', percentage: 92 },
    { name: 'OSHA Safety Standards', percentage: 90 },
  ],
  recent_activities: [
    {
      type: 'Practice Set',
      description: 'Targeted Practice: Molecular Biology & PCR (15 Q)',
      date: 'Yesterday',
      score: '13/15 (87%)',
    },
    {
      type: 'Lesson',
      description: 'Completed: Standard Operating Procedures & GLP in PLTW MI',
      date: '2 days ago',
    },
  ],
};

export const DEMO_SEED_TEACHER: TeacherProfile = {
  id: 'tch_demo_wagner_martinez',
  prefix: 'Dr.',
  first_name: 'Carlos',
  last_name: 'Martinez',
  email: 'martinez.cte@wagner-cte.org',
  school_name: 'Wagner High School',
  department: 'Wagner CTE Biomedical Science / PLTW Lead',
  created_at: new Date().toISOString(),
};

export const DEFAULT_FACULTY_ACCESS_CODE = 'WAGNER-FACULTY-2026';

export const getValidFacultyAccessCodes = (): string[] => {
  const codes = [DEFAULT_FACULTY_ACCESS_CODE, 'BACE-TEACHER-CTE', 'CTE-FACULTY-PASS', 'WAGNER2026'];
  try {
    const custom = localStorage.getItem('bace_faculty_access_code');
    if (custom && custom.trim()) codes.push(custom.trim().toUpperCase());
  } catch {}
  return codes;
};

export const DEFAULT_ADMIN_ACCESS_CODE = 'WAGNER-ADMIN-2026';

export const getValidAdminAccessCodes = (): string[] => {
  const codes = [DEFAULT_ADMIN_ACCESS_CODE, 'ADMIN2026', 'BACE-ADMIN-MASTER', 'CTE-ADMIN-PASS', 'WAGNER-CTE-ADMIN-2026'];
  try {
    const custom = localStorage.getItem('bace_admin_access_code');
    if (custom && custom.trim()) codes.push(custom.trim().toUpperCase());
  } catch {}
  return codes;
};

const initializeEnvironments = () => {
  try {
    const initialized = localStorage.getItem('bace_env_initialized_v3');
    if (initialized) return;

    // Migrate any real students from legacy storage into production
    const legacyStudentsRaw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    let initialProdStudents: StudentOverview[] = [];
    if (legacyStudentsRaw) {
      try {
        const parsed: StudentOverview[] = JSON.parse(legacyStudentsRaw);
        initialProdStudents = parsed.filter(
          (s) =>
            s.profile.id !== 'stu_demo_wagner_jordan' &&
            s.profile.id !== 'stu_alex' &&
            s.profile.email.toLowerCase() !== 'jordan.rivera@wagner-cte.org'
        );
      } catch {
        initialProdStudents = [];
      }
    }
    saveEnvData('production', 'students', initialProdStudents);

    // Legacy teachers
    const legacyTeachersRaw = localStorage.getItem(STORAGE_KEYS.TEACHERS);
    let initialProdTeachers: TeacherProfile[] = [];
    if (legacyTeachersRaw) {
      try {
        const parsed: TeacherProfile[] = JSON.parse(legacyTeachersRaw);
        initialProdTeachers = parsed.filter(
          (t) =>
            t.id !== 'tch_demo_wagner_martinez' &&
            t.id !== 't_vance' &&
            t.email.toLowerCase() !== 'martinez.cte@wagner-cte.org'
        );
      } catch {
        initialProdTeachers = [];
      }
    }
    saveEnvData('production', 'teachers', initialProdTeachers);

    // Production classes
    const legacyClassesRaw = localStorage.getItem(STORAGE_KEYS.CLASSES);
    let initialProdClasses: SchoolClass[] = INITIAL_CLASSES;
    if (legacyClassesRaw) {
      try {
        initialProdClasses = JSON.parse(legacyClassesRaw);
      } catch {
        initialProdClasses = INITIAL_CLASSES;
      }
    }
    saveEnvData('production', 'classes', initialProdClasses);
    saveEnvData('production', 'assignments', []);
    saveEnvData('production', 'activity_sessions', []);
    saveEnvData('production', 'lesson_grades', []);

    // Demo environment seed
    saveEnvData('demo', 'students', [DEMO_SEED_STUDENT]);
    saveEnvData('demo', 'teachers', [DEMO_SEED_TEACHER]);
    saveEnvData('demo', 'classes', INITIAL_CLASSES);
    saveEnvData('demo', 'assignments', []);
    saveEnvData('demo', 'activity_sessions', []);
    saveEnvData('demo', 'lesson_grades', []);

    // Default environment is 'production'
    if (!localStorage.getItem('bace_app_environment')) {
      localStorage.setItem('bace_app_environment', 'production');
    }

    localStorage.setItem('bace_env_initialized_v3', 'true');
  } catch (err) {
    console.warn('Error initializing environment separation', err);
  }
};

// Purge any legacy test people (Alex Rivera, Dr. Vance, etc.) from localStorage
const purgeLegacyTestData = () => {
  try {
    const isPurged = localStorage.getItem(STORAGE_KEYS.PURGED_LEGACY_TEST_DATA);
    if (isPurged) return;

    const testIds = new Set(['stu_alex', 'stu_sarah', 'stu_marcus', 'stu_emily', 'stu_jordan', 'stu_elena', 't_vance', 'teacher_1']);
    const testNames = new Set(['Alex', 'Helena', 'Sarah', 'Marcus', 'Emily', 'Jordan', 'Elena']);

    // Check students
    const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (savedStudents) {
      try {
        const parsed: StudentOverview[] = JSON.parse(savedStudents);
        const filtered = parsed.filter((s) => !testIds.has(s.profile.id) && !testNames.has(s.profile.first_name));
        localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(filtered));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.STUDENTS);
      }
    }

    // Check teachers
    const savedTeachers = localStorage.getItem(STORAGE_KEYS.TEACHERS);
    if (savedTeachers) {
      try {
        const parsed: TeacherProfile[] = JSON.parse(savedTeachers);
        const filtered = parsed.filter((t) => !testIds.has(t.id) && t.last_name !== 'Vance');
        localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(filtered));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.TEACHERS);
      }
    }

    // Check assignments
    const savedAssignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    if (savedAssignments) {
      try {
        const parsed: Assignment[] = JSON.parse(savedAssignments);
        const filtered = parsed.filter(
          (a) =>
            !a.title.toLowerCase().includes('alex') &&
            !a.title.toLowerCase().includes('vance') &&
            a.teacher_id !== 't_vance' &&
            a.teacher_id !== 'teacher_1'
        );
        localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(filtered));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS);
      }
    }

    // Check lesson grades
    const savedGrades = localStorage.getItem(STORAGE_KEYS.LESSON_GRADES);
    if (savedGrades) {
      try {
        const parsed: LessonGradeRecord[] = JSON.parse(savedGrades);
        const filtered = parsed.filter((g) => !testIds.has(g.student_id));
        localStorage.setItem(STORAGE_KEYS.LESSON_GRADES, JSON.stringify(filtered));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.LESSON_GRADES);
      }
    }

    // Check active student id
    const activeStu = localStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT_ID);
    if (activeStu && testIds.has(activeStu)) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_STUDENT_ID);
    }

    // Check active teacher id
    const activeTeacher = localStorage.getItem(STORAGE_KEYS.ACTIVE_TEACHER_ID);
    if (activeTeacher && testIds.has(activeTeacher)) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_TEACHER_ID);
    }

    localStorage.setItem(STORAGE_KEYS.PURGED_LEGACY_TEST_DATA, 'true');
  } catch (err) {
    console.warn('Error purging legacy test data', err);
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purge test data on initialization
  purgeLegacyTestData();
  initializeEnvironments();

  // Primary Environment State (Strict isolation between 'production' and 'demo')
  const [environment, setEnvironmentState] = useState<AppEnvironment>(() => {
    try {
      const saved = localStorage.getItem('bace_app_environment');
      if (saved === 'demo' || saved === 'production') return saved;
      return 'production';
    } catch {
      return 'production';
    }
  });

  const isProduction = environment === 'production';
  const isDemo = environment === 'demo';
  const demoModeEnabled = environment === 'demo';

  // Primary authenticated user
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  const [role, setRoleState] = useState<UserRole>('student');

  const [studentPage, setStudentPageState] = useState<StudentNavPage>('dashboard');
  const [teacherPage, setTeacherPageState] = useState<TeacherNavPage>('dashboard');
  const [adminPage, setAdminPageState] = useState<AdminNavPage>('dashboard');

  // Remove credentials created by the retired browser-local authentication system.
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_CREDENTIALS);
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    } catch {}
  }, []);

  // Faculty Authorization Key State
  const [facultyAccessCode, setFacultyAccessCodeState] = useState<string>(() => {
    try {
      return localStorage.getItem('bace_faculty_access_code') || DEFAULT_FACULTY_ACCESS_CODE;
    } catch {
      return DEFAULT_FACULTY_ACCESS_CODE;
    }
  });

  const updateFacultyAccessCode = (newCode: string) => {
    const trimmed = newCode.trim().toUpperCase();
    if (!trimmed) return;
    setFacultyAccessCodeState(trimmed);
    try {
      localStorage.setItem('bace_faculty_access_code', trimmed);
    } catch {}
  };

  // Supabase Google Auth State
  const [googleUser, setGoogleUser] = useState<GoogleUserInfo | null>(() => {
    try {
      const saved = localStorage.getItem('bace_google_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalPreferredRole, setAuthModalPreferredRole] = useState<UserRole>('student');

  const openAuthModal = (preferredRole: UserRole = 'student') => {
    setAuthModalPreferredRole(preferredRole);
    setIsAuthModalOpen(true);
  };

  const [selectedDomainId, setSelectedDomainId] = useState<string | null>('d1');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>('les_pipette');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Account Modal
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountModalTab, setAccountModalTab] = useState<'switch' | 'create_teacher' | 'create_student'>('switch');

  const openAccountModal = (tab: 'switch' | 'create_teacher' | 'create_student' = 'switch') => {
    setAccountModalTab(tab);
    setIsAccountModalOpen(true);
  };

  const [domains] = useState<Domain[]>(INITIAL_DOMAINS);
  const [topics] = useState<Topic[]>(INITIAL_TOPICS);
  const [lessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [achievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  const [classes, setClasses] = useState<SchoolClass[]>(() => {
    const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
    return loadEnvData(env, 'classes', INITIAL_CLASSES);
  });

  // Isolated Teachers State
  const [teachers, setTeachers] = useState<TeacherProfile[]>(() => {
    const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
    return loadEnvData(env, 'teachers', env === 'demo' ? [DEMO_SEED_TEACHER] : INITIAL_TEACHERS);
  });

  const [activeTeacherId, setActiveTeacherIdState] = useState<string>(() => {
    try {
      const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
      const saved = localStorage.getItem(getEnvStorageKey(env, 'active_teacher_id'));
      return saved || '';
    } catch {
      return '';
    }
  });

  const setActiveTeacherId = (id: string) => {
    setActiveTeacherIdState(id);
    saveEnvData(environment, 'active_teacher_id', id);
    if (environment === 'production') {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TEACHER_ID, id);
    }
  };

  // Isolated Students State
  const [students, setStudents] = useState<StudentOverview[]>(() => {
    const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
    return loadEnvData(env, 'students', env === 'demo' ? [DEMO_SEED_STUDENT] : INITIAL_STUDENTS_ROSTER);
  });

  const [activeStudentId, setActiveStudentIdState] = useState<string>(() => {
    try {
      const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
      const saved = localStorage.getItem(getEnvStorageKey(env, 'active_student_id'));
      return saved || '';
    } catch {
      return '';
    }
  });

  const setActiveStudentId = (id: string) => {
    setActiveStudentIdState(id);
    saveEnvData(environment, 'active_student_id', id);
    if (environment === 'production') {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT_ID, id);
    }
  };

  // Questions
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (saved) {
        let parsed: Question[] = JSON.parse(saved);
        parsed = parsed.map((q) => ({
          ...q,
          question_text: cleanQuestionText(q.question_text),
          explanation: cleanQuestionText(q.explanation),
        }));
        if (parsed.length < INITIAL_QUESTIONS.length) {
          const existingIds = new Set(parsed.map((q) => q.id));
          const missingQuestions = INITIAL_QUESTIONS.filter((q) => !existingIds.has(q.id));
          const merged = [...parsed, ...missingQuestions];
          localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
      return INITIAL_QUESTIONS;
    } catch {
      return INITIAL_QUESTIONS;
    }
  });

  // Assignments
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
    return loadEnvData(env, 'assignments', INITIAL_ASSIGNMENTS);
  });

  // Assignment Progress per student
  const [assignmentProgress, setAssignmentProgress] = useState<AssignmentProgress[]>(() => {
    try {
      const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
      return loadEnvData(env, 'assignment_progress', []);
    } catch {
      return [];
    }
  });

  // Student Completed Lessons Map (studentId -> lessonId[])
  const [studentCompletedLessonsMap, setStudentCompletedLessonsMap] = useState<Record<string, string[]>>(() => {
    try {
      const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
      return loadEnvData(env, 'student_completed_lessons', {});
    } catch {
      return {};
    }
  });

  // Activity Sessions
  const [activitySessions, setActivitySessions] = useState<StudentActivitySession[]>(() => {
    const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
    return loadEnvData(env, 'activity_sessions', INITIAL_ACTIVITY_SESSIONS);
  });

  // Lesson Grades
  const [lessonGrades, setLessonGrades] = useState<LessonGradeRecord[]>(() => {
    const env = (localStorage.getItem('bace_app_environment') as AppEnvironment) || 'production';
    return loadEnvData(env, 'lesson_grades', INITIAL_LESSON_GRADES);
  });

  // Synchronize isolated storage per active environment
  useEffect(() => {
    saveEnvData(environment, 'students', students);
    if (environment === 'production') {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    }
  }, [students, environment]);

  useEffect(() => {
    saveEnvData(environment, 'teachers', teachers);
    if (environment === 'production') {
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
    }
  }, [teachers, environment]);

  useEffect(() => {
    saveEnvData(environment, 'classes', classes);
    if (environment === 'production') {
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
    }
  }, [classes, environment]);

  useEffect(() => {
    saveEnvData(environment, 'assignments', assignments);
    if (environment === 'production') {
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    }
  }, [assignments, environment]);

  useEffect(() => {
    saveEnvData(environment, 'activity_sessions', activitySessions);
    if (environment === 'production') {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_SESSIONS, JSON.stringify(activitySessions));
    }
  }, [activitySessions, environment]);

  useEffect(() => {
    saveEnvData(environment, 'lesson_grades', lessonGrades);
    if (environment === 'production') {
      localStorage.setItem(STORAGE_KEYS.LESSON_GRADES, JSON.stringify(lessonGrades));
    }
  }, [lessonGrades, environment]);

  // Authenticated identity is restored only from the Supabase session.
  // Do not persist an unsigned app-level user object as an authentication session.
  // Bridge authenticated Supabase identities into the app's progress/roster model
  // so first-time users do not write progress against a generic fallback profile.
  useEffect(() => {
    if (!currentUser || environment !== 'production') return;

    if (currentUser.role === 'student') {
      setStudents((prev) => {
        const exists = prev.some(
          (student) =>
            student.profile.id === currentUser.id ||
            student.profile.email.toLowerCase() === currentUser.email.toLowerCase()
        );
        if (exists) return prev;

        const student: StudentOverview = {
          ...DEFAULT_EMPTY_STUDENT,
          profile: currentUser,
          class_id: currentUser.class_id || '',
          last_active: 'Signed in',
          recent_activities: [],
        };
        return [student, ...prev];
      });
      setActiveStudentIdState(currentUser.id);
    }

    if (currentUser.role === 'teacher') {
      setTeachers((prev) => {
        const exists = prev.some(
          (teacher) =>
            teacher.id === currentUser.id ||
            teacher.email.toLowerCase() === currentUser.email.toLowerCase()
        );
        if (exists) return prev;

        return [
          {
            id: currentUser.id,
            prefix: currentUser.prefix,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,
            school_name: currentUser.school_name || 'Biotechnology & Life Sciences Academy',
            department: currentUser.department || 'CTE Biomedical Science',
            created_at: currentUser.created_at || new Date().toISOString(),
          },
          ...prev,
        ];
      });
      setActiveTeacherIdState(currentUser.id);
    }
  }, [currentUser, environment]);

  // Active student resolver
  const currentStudent: StudentOverview = React.useMemo(() => {
    if (currentUser && currentUser.role === 'student') {
      const match = students.find(
        (s) => s.profile.id === currentUser.id || s.profile.email.toLowerCase() === currentUser.email.toLowerCase()
      );
      if (match) return match;
      return {
        ...DEFAULT_EMPTY_STUDENT,
        profile: currentUser,
        class_id: currentUser.class_id || classes[0]?.id || 'cls_biotech_1',
      };
    }
    if (activeStudentId) {
      const found = students.find((s) => s.profile.id === activeStudentId);
      if (found) return found;
    }
    if (students.length > 0) return students[0];
    return DEFAULT_EMPTY_STUDENT;
  }, [currentUser, activeStudentId, students, classes]);

  // Active teacher resolver
  const currentTeacher: TeacherProfile = React.useMemo(() => {
    if (currentUser && currentUser.role === 'teacher') {
      const match = teachers.find(
        (t) => t.id === currentUser.id || t.email.toLowerCase() === currentUser.email.toLowerCase()
      );
      if (match) return match;
      return {
        id: currentUser.id,
        prefix: currentUser.prefix || 'Dr.',
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        school_name: currentUser.school_name || 'Biotechnology & Life Sciences Academy',
        department: currentUser.department || 'CTE Biomedical Science',
        created_at: currentUser.created_at || new Date().toISOString(),
      };
    }
    if (activeTeacherId) {
      const found = teachers.find((t) => t.id === activeTeacherId);
      if (found) return found;
    }
    if (teachers.length > 0) return teachers[0];
    return DEFAULT_EMPTY_TEACHER;
  }, [currentUser, activeTeacherId, teachers]);

  // Completed lessons for the currently active student only
  const completedLessonIds = React.useMemo(() => {
    const studentId = currentStudent.profile.id;
    return studentCompletedLessonsMap[studentId] || [];
  }, [currentStudent.profile.id, studentCompletedLessonsMap]);

  const overallReadiness = currentStudent.overall_readiness;
  const [lastExamAttempt, setLastExamAttempt] = useState<QuizAttempt | null>(null);

  // Active mock exam configuration
  const [activeExamConfig, setActiveExamConfig] = useState<{
    title: string;
    totalQuestions: number;
    timeLimitMinutes: number;
    quizType: 'mock_quick' | 'mock_half' | 'mock_full';
  } | null>(null);

  // Active practice configuration
  const [activePracticeConfig, setActivePracticeConfig] = useState<{
    mode: string;
    domainId?: string;
    topicId?: string;
    lessonId?: string;
    count: number;
  } | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENT_PROGRESS, JSON.stringify(assignmentProgress));
  }, [assignmentProgress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENT_COMPLETED_LESSONS, JSON.stringify(studentCompletedLessonsMap));
  }, [studentCompletedLessonsMap]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_SESSIONS, JSON.stringify(activitySessions));
  }, [activitySessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LESSON_GRADES, JSON.stringify(lessonGrades));
  }, [lessonGrades]);

  const setRole = (newRole: UserRole) => {
    // RBAC Security: Enforce that logged in student candidates cannot switch to teacher or admin consoles
    if (currentUser?.role === 'student' && (newRole === 'teacher' || newRole === 'admin')) {
      console.warn('Unauthorized role access blocked: Student accounts cannot enter faculty or admin consoles.');
      return;
    }

    setRoleState(newRole);
    if (newRole === 'student') {
      setStudentPageState('dashboard');
    } else if (newRole === 'teacher') {
      setTeacherPageState('dashboard');
    } else if (newRole === 'admin') {
      setAdminPageState('dashboard');
    }
  };

  const isFacultyPreviewingStudent = Boolean(
    currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin') && role === 'student'
  );

  const returnToFacultyConsole = () => {
    if (currentUser?.role === 'admin') {
      setRole('admin');
      setAdminPage('dashboard');
    } else {
      setRole('teacher');
      setTeacherPage('dashboard');
    }
  };

  const setStudentPage = (page: StudentNavPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStudentPageState(page);
  };

  const setTeacherPage = (page: TeacherNavPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTeacherPageState(page);
  };

  const setAdminPage = (page: AdminNavPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAdminPageState(page);
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    // Clear class_id for any students enrolled in this deleted class
    setStudents((prev) => {
      const updated = prev.map((s) => {
        if (s.class_id === id) {
          return {
            ...s,
            class_id: '',
            profile: {
              ...s.profile,
              class_id: '',
            },
          };
        }
        return s;
      });
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
      return updated;
    });
  };

  // Supabase Auth is the single source of truth for production identity.
  // Privileged roles must already exist in public.profiles; new authenticated
  // users are provisioned as students only.
  const hydrateSupabaseUser = async (user: any) => {
    const sb = getSupabase();
    if (!sb || !user) return;

    const email = (user.email || '').trim().toLowerCase();
    const metadata = user.user_metadata || {};
    const fullName = metadata.full_name || metadata.name || email.split('@')[0] || 'Student User';
    const nameParts = fullName.trim().split(/\s+/);
    const fallbackProfile: Profile = {
      id: user.id,
      email,
      first_name: metadata.first_name || nameParts[0] || 'Student',
      last_name: metadata.last_name || nameParts.slice(1).join(' ') || 'User',
      role: 'student',
      school_name: metadata.school_name || 'Biotechnology & Life Sciences Academy',
      target_exam_date: metadata.target_exam_date,
      class_id: metadata.class_id,
      created_at: user.created_at || new Date().toISOString(),
    };

    let profile: Profile = fallbackProfile;
    try {
      const { data: existingProfile, error: selectError } = await sb
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (selectError) throw selectError;

      if (existingProfile) {
        profile = {
          ...fallbackProfile,
          ...existingProfile,
          id: user.id,
          email: existingProfile.email || email,
          role: (existingProfile.role || 'student') as UserRole,
        };
      } else {
        // Never self-provision teacher/admin from browser input or OAuth metadata.
        const studentProfile = { ...fallbackProfile, role: 'student' as UserRole };
        const { error: insertError } = await sb.from('profiles').insert(studentProfile);
        if (insertError) console.warn('Unable to create Supabase profile:', insertError.message);
        profile = studentProfile;
      }
    } catch (err) {
      console.warn('Profile hydration failed; using authenticated student fallback.', err);
      profile = fallbackProfile;
    }

    const googleInfo: GoogleUserInfo = {
      id: user.id,
      email: profile.email,
      name: `${profile.first_name} ${profile.last_name}`.trim(),
      avatar_url: metadata.avatar_url,
      role: profile.role,
    };

    setGoogleUser(googleInfo);
    setCurrentUser(profile);
    setRole(profile.role);

    if (profile.role === 'student') {
      setActiveStudentId(profile.id);
      setStudentPage('dashboard');
    } else if (profile.role === 'teacher') {
      setActiveTeacherId(profile.id);
      setTeacherPage('dashboard');
    } else {
      setAdminPage('dashboard');
    }
  };

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;

    let mounted = true;

    sb.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        void hydrateSupabaseUser(session.user);
      } else {
        setCurrentUser(null);
        setGoogleUser(null);
      }
    });

    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        void hydrateSupabaseUser(session.user);
      } else {
        setCurrentUser(null);
        setGoogleUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async (_preferredRole: UserRole = 'student'): Promise<{ success: boolean; error?: string }> => {
    const sb = getSupabase();
    if (!sb) {
      return { success: false, error: 'Supabase authentication is not configured.' };
    }

    try {
      setIsGoogleAuthLoading(true);
      const { error } = await sb.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Google OAuth failed' };
    } finally {
      setIsGoogleAuthLoading(false);
    }
  };

  const oneClickGoogleSignIn = (email: string, name: string, preferredRole: UserRole) => {
    if (environment !== 'demo') {
      console.warn('Instant Google login is disabled outside the demo environment.');
      return;
    }

    const parts = name.trim().split(/\s+/);
    const profile: Profile = {
      id: `demo_google_${Date.now().toString(36)}`,
      email: email.trim().toLowerCase(),
      first_name: parts[0] || 'Demo',
      last_name: parts.slice(1).join(' ') || 'User',
      role: preferredRole,
      created_at: new Date().toISOString(),
    };
    setGoogleUser({ id: profile.id, email: profile.email, name, role: preferredRole });
    setCurrentUser(profile);
    setRole(preferredRole);
  };

  const signOutGoogle = async () => {
    const sb = getSupabase();
    if (sb) {
      try {
        await sb.auth.signOut();
      } catch (e) {
        console.warn('Supabase signout failed', e);
      }
    }
    setGoogleUser(null);
    localStorage.removeItem('bace_google_user');
  };

  // Student registration is handled by Supabase Auth. Passwords never enter localStorage.
  const registerStudent = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    class_id?: string;
    class_join_code?: string;
    target_exam_date?: string;
    school_name?: string;
  }): Promise<{ success: boolean; error?: string; student?: StudentOverview }> => {
    const sb = getSupabase();
    if (!sb) return { success: false, error: 'Supabase authentication is not configured.' };
    if (!data.password || data.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const matchedClass = data.class_id
      ? classes.find((c) => c.id === data.class_id)
      : classes.find((c) => c.join_code?.toUpperCase() === data.class_join_code?.trim().toUpperCase());

    const { data: authData, error } = await sb.auth.signUp({
      email: cleanEmail,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name.trim(),
          last_name: data.last_name.trim(),
          role: 'student',
          class_id: matchedClass?.id || data.class_id || undefined,
          school_name: data.school_name || matchedClass?.name || undefined,
          target_exam_date: data.target_exam_date || undefined,
        },
      },
    });

    if (error) return { success: false, error: error.message };

    // When email confirmation is enabled, the authenticated session will be
    // established after confirmation and hydrateSupabaseUser will create the profile.
    if (authData.user && authData.session) {
      await hydrateSupabaseUser(authData.user);
    }

    return { success: true };
  };

  // Faculty Registration
  const registerTeacher = async (_data: {
    prefix?: string;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    school_name: string;
    department?: string;
    initial_class_name?: string;
    period?: string;
    access_code?: string;
  }): Promise<{ success: boolean; error?: string; teacher?: TeacherProfile }> => {
    return {
      success: false,
      error: 'Teacher accounts must be provisioned by an administrator in Supabase. Client-side faculty access codes are no longer accepted.',
    };
  };

  // Administrator Registration
  const registerAdmin = async (_data: {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    school_name?: string;
    department?: string;
    access_code?: string;
  }): Promise<{ success: boolean; error?: string; profile?: Profile }> => {
    return {
      success: false,
      error: 'Administrator accounts must be provisioned directly in Supabase. Client-side admin master keys are no longer accepted.',
    };
  };

  // Unified sign-in delegates credential verification to Supabase Auth.
  const loginUser = async (
    email: string,
    password?: string,
    _preferredRole?: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    const sb = getSupabase();
    if (!sb) return { success: false, error: 'Supabase authentication is not configured.' };

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    const { data, error } = await sb.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) return { success: false, error: error.message };
    if (!data.user) return { success: false, error: 'Supabase did not return an authenticated user.' };

    await hydrateSupabaseUser(data.user);
    return { success: true };
  };

  // Sign Out
  const signOut = () => {
    signOutGoogle();
    setCurrentUser(null);
    setActiveStudentId('');
    setActiveTeacherId('');
    removeEnvData(environment, 'auth_user');
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_STUDENT_ID);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_TEACHER_ID);
  };

  // One-Click Demo Access for Wagner CTE Student
  const loginDemoStudent = () => {
    if (environment !== 'demo') {
      setEnvironmentState('demo');
      localStorage.setItem('bace_app_environment', 'demo');
    }

    const demoEmail = 'jordan.rivera@wagner-cte.org';
    const existing = students.find((s) => s.profile.email.toLowerCase() === demoEmail) || DEMO_SEED_STUDENT;

    if (!students.some((s) => s.profile.id === existing.profile.id)) {
      const updated = [existing, ...students];
      setStudents(updated);
    }

    setActiveStudentId(existing.profile.id);
    setCurrentUser(existing.profile);
    setRole('student');
    setStudentPage('dashboard');
  };

  // One-Click Demo Access for Wagner CTE Faculty
  const loginDemoTeacher = () => {
    if (environment !== 'demo') {
      setEnvironmentState('demo');
      localStorage.setItem('bace_app_environment', 'demo');
    }

    const demoEmail = 'martinez.cte@wagner-cte.org';
    const existing = teachers.find((t) => t.email.toLowerCase() === demoEmail) || DEMO_SEED_TEACHER;

    if (!teachers.some((t) => t.id === existing.id)) {
      const updated = [existing, ...teachers];
      setTeachers(updated);
    }

    const demoProfile: Profile = {
      id: existing.id,
      first_name: existing.first_name,
      last_name: existing.last_name,
      email: existing.email,
      role: 'teacher',
      prefix: existing.prefix,
      school_name: existing.school_name,
      department: existing.department,
      created_at: existing.created_at,
    };

    setActiveTeacherId(existing.id);
    setCurrentUser(demoProfile);
    setRole('teacher');
    setTeacherPage('dashboard');
  };

  // One-Click Demo Access for District/Site CTE Administrator
  const loginDemoAdmin = () => {
    if (environment !== 'demo') {
      setEnvironmentState('demo');
      localStorage.setItem('bace_app_environment', 'demo');
    }

    const adminProfile: Profile = {
      id: 'adm_demo_wagner_admin',
      first_name: 'District CTE',
      last_name: 'Administrator',
      email: 'admin.cte@wagner-cte.org',
      role: 'admin',
      school_name: 'Wagner High School',
      department: 'Biomedical CTE Administration',
      created_at: new Date().toISOString(),
    };

    setCurrentUser(adminProfile);
    setRole('admin');
    setAdminPage('dashboard');
  };

  // Teacher Account Management Methods
  const createTeacherAccount = (data: {
    prefix?: string;
    first_name: string;
    last_name: string;
    email: string;
    school_name: string;
    department?: string;
    initial_class_name?: string;
  }): TeacherProfile => {
    const id = `roster_teacher_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const teacher: TeacherProfile = {
      id,
      prefix: data.prefix?.trim() || undefined,
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      email: data.email.trim().toLowerCase(),
      school_name: data.school_name.trim(),
      department: data.department?.trim() || 'CTE Biomedical Science',
      created_at: new Date().toISOString(),
    };

    setTeachers((prev) => {
      const updated = [teacher, ...prev];
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(updated));
      return updated;
    });

    if (data.initial_class_name?.trim()) {
      const newClass: SchoolClass = {
        id: `cls_${Date.now().toString(36)}`,
        name: data.initial_class_name.trim(),
        teacher_id: id,
        school_year: '2025-2026',
        period: 'Period 1',
        join_code: `BACE${Math.floor(1000 + Math.random() * 9000)}`,
        created_at: new Date().toISOString(),
      };
      setClasses((prev) => {
        const updated = [newClass, ...prev];
        localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(updated));
        return updated;
      });
    }

    return teacher;
  };

  const updateTeacherAccount = (id: string, updates: Partial<TeacherProfile>) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTeacherAccount = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    if (activeTeacherId === id) {
      setActiveTeacherId('');
    }
  };

  // Student Account Management Methods
  const createStudentAccount = (data: {
    first_name: string;
    last_name: string;
    email: string;
    student_number?: string;
    class_id: string;
    school_name?: string;
    target_exam_date?: string;
    readiness?: number;
  }): StudentOverview => {
    const id = `roster_student_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const readiness = data.readiness ?? 0;
    const student: StudentOverview = {
      profile: {
        id,
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        email: data.email.trim().toLowerCase(),
        role: 'student',
        class_id: data.class_id,
        school_name: data.school_name,
        target_exam_date: data.target_exam_date,
        created_at: new Date().toISOString(),
      },
      class_id: data.class_id,
      overall_readiness: readiness,
      domain_mastery: {},
      last_active: new Date().toISOString(),
      status: readiness >= 80 ? 'Ready' : readiness >= 70 ? 'Developing' : 'Needs Review',
      lessons_completed: 0,
      questions_attempted: 0,
      accuracy: 0,
      mock_exam_scores: [],
      weakest_topics: [],
      strongest_topics: [],
      recent_activities: [],
    };

    setStudents((prev) => {
      const updated = [student, ...prev];
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
      return updated;
    });

    return student;
  };

  const updateStudentAccount = (id: string, updates: Partial<StudentOverview>) => {
    setStudents((prev) => {
      const updated = prev.map((s) => (s.profile.id === id ? { ...s, ...updates } : s));
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteStudentAccount = (id: string) => {
    setStudents((prev) => {
      const filtered = prev.filter((s) => s.profile.id !== id);
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(filtered));
      return filtered;
    });
    if (activeStudentId === id) {
      setActiveStudentId('');
    }
    setActivitySessions((prev) => {
      const filtered = prev.filter((a) => a.student_id !== id);
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_SESSIONS, JSON.stringify(filtered));
      return filtered;
    });
    setLessonGrades((prev) => {
      const filtered = prev.filter((g) => g.student_id !== id);
      localStorage.setItem(STORAGE_KEYS.LESSON_GRADES, JSON.stringify(filtered));
      return filtered;
    });
  };

  const transferStudentPeriod = (studentId: string, newClassId: string) => {
    setStudents((prev) => {
      const updated = prev.map((s) => {
        if (s.profile.id === studentId) {
          return {
            ...s,
            class_id: newClassId,
            profile: {
              ...s.profile,
              class_id: newClassId,
            },
          };
        }
        return s;
      });
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
      return updated;
    });

    if (currentUser?.id === studentId) {
      const updatedUser = { ...currentUser, class_id: newClassId };
      setCurrentUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(updatedUser));
    }
  };

  const regenerateClassJoinCode = (classId: string): string => {
    const cls = classes.find((c) => c.id === classId);
    const periodNum = cls?.period ? cls.period.replace(/\D/g, '') : '1';
    const randDigits = Math.floor(10 + Math.random() * 90);
    const newCode = `WAGNER${periodNum || '1'}0${randDigits}`;

    setClasses((prev) => {
      const updated = prev.map((c) => (c.id === classId ? { ...c, join_code: newCode } : c));
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(updated));
      return updated;
    });

    return newCode;
  };

  const resetStudentAccess = (studentId: string): { tempPassword: string; studentName: string } => {
    const stu = students.find((s) => s.profile.id === studentId);
    const randDigits = Math.floor(100 + Math.random() * 900);
    const tempPassword = `WagnerPrep2026!${randDigits}`;

    setStudents((prev) => {
      const updated = prev.map((s) => {
        if (s.profile.id === studentId) {
          return {
            ...s,
            last_active: 'Password Reset Issued',
          };
        }
        return s;
      });
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
      return updated;
    });

    return {
      tempPassword,
      studentName: stu ? `${stu.profile.first_name} ${stu.profile.last_name}` : 'Student Candidate',
    };
  };

  // Domain & Lesson Mastery Actions
  const recordLessonCompletion = (lessonId: string) => {
    const targetStudentId = currentStudent.profile.id;
    const existing = studentCompletedLessonsMap[targetStudentId] || [];

    if (!existing.includes(lessonId)) {
      const updated = [...existing, lessonId];
      const newMap = { ...studentCompletedLessonsMap, [targetStudentId]: updated };
      setStudentCompletedLessonsMap(newMap);

      // Auto-complete any active assignment for this lesson
      const matchingAssignment = assignments.find(
        (a) => a.assignment_type === 'Lesson' && a.reference_id === lessonId
      );
      if (matchingAssignment) {
        markAssignmentCompleted(matchingAssignment.id, targetStudentId, 100);
      }

      setStudents((prev) =>
        prev.map((s) =>
          s.profile.id === targetStudentId
            ? {
                ...s,
                lessons_completed: s.lessons_completed + 1,
                last_active: 'Just now',
                recent_activities: [
                  {
                    type: 'Lesson',
                    description: `Mastered competency lesson module`,
                    date: 'Just now',
                    score: '100% Mastery',
                  },
                  ...s.recent_activities.slice(0, 4),
                ],
              }
            : s
        )
      );
    }
  };

  const markAssignmentCompleted = (assignmentId: string, studentId?: string, score?: number) => {
    const targetStudentId = studentId || currentStudent.profile.id;
    const progressId = `prog_${assignmentId}_${targetStudentId}`;
    const newRecord: AssignmentProgress = {
      id: progressId,
      assignment_id: assignmentId,
      student_id: targetStudentId,
      status: 'Completed',
      score: score || 100,
      completed_at: new Date().toISOString(),
    };

    setAssignmentProgress((prev) => {
      const filtered = prev.filter((p) => !(p.assignment_id === assignmentId && p.student_id === targetStudentId));
      return [newRecord, ...filtered];
    });
  };

  const deleteAssignment = (assignmentId: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
    setAssignmentProgress((prev) => prev.filter((p) => p.assignment_id !== assignmentId));
  };

  const recordExamSubmission = (attempt: QuizAttempt) => {
    setLastExamAttempt(attempt);

    const targetStudentId = attempt.student_id || currentStudent.profile.id;
    const newSession: StudentActivitySession = {
      student_id: targetStudentId,
      id: `sess_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      formattedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sessionNumber: activitySessions.length + 1,
      label: attempt.quiz_type.startsWith('mock')
        ? `Session ${activitySessions.length + 1}: ${attempt.quiz_type === 'mock_full' ? 'Full Mock Exam' : 'Targeted Mock'}`
        : `Session ${activitySessions.length + 1}: Practice Drill`,
      type: attempt.quiz_type.startsWith('mock') ? 'Mock Exam' : 'Practice Drill',
      domainId: attempt.domain_id,
      domainName: attempt.domain_id ? domains.find((d) => d.id === attempt.domain_id)?.name : undefined,
      score: attempt.score,
      totalQuestions: attempt.total_questions,
      accuracy: attempt.percentage,
      timeSpentMinutes: Math.max(1, Math.round(attempt.time_spent_seconds / 60)),
    };

    setActivitySessions((prev) => [...prev, newSession]);

    setStudents((prev) =>
      prev.map((s) => {
        if (s.profile.id === targetStudentId) {
          const newAttempted = s.questions_attempted + attempt.total_questions;
          const prevCorrect = Math.round((s.accuracy / 100) * s.questions_attempted);
          const newAccuracy = Math.round(((prevCorrect + attempt.score) / Math.max(1, newAttempted)) * 100);
          const newExamScores = attempt.quiz_type.startsWith('mock')
            ? [...s.mock_exam_scores, attempt.percentage]
            : s.mock_exam_scores;

          const updatedMastery = { ...s.domain_mastery };
          if (attempt.domain_breakdown) {
            Object.entries(attempt.domain_breakdown).forEach(([dId, stats]) => {
              const prevDomainScore = updatedMastery[dId] ?? 0;
              updatedMastery[dId] = prevDomainScore > 0
                ? Math.min(100, Math.max(0, Math.round(prevDomainScore * 0.7 + stats.percentage * 0.3)))
                : stats.percentage;
            });
          } else if (attempt.domain_id) {
            const prevDomainScore = updatedMastery[attempt.domain_id] ?? 0;
            updatedMastery[attempt.domain_id] = prevDomainScore > 0
              ? Math.min(100, Math.max(0, Math.round(prevDomainScore * 0.7 + attempt.percentage * 0.3)))
              : attempt.percentage;
          }

          let totalScore = 0;
          domains.forEach((d) => {
            const val = updatedMastery[d.id] ?? 0;
            totalScore += val * (d.exam_weight / 100);
          });
          const newReadiness = Math.round(totalScore);

          return {
            ...s,
            questions_attempted: newAttempted,
            accuracy: newAccuracy,
            mock_exam_scores: newExamScores,
            domain_mastery: updatedMastery,
            overall_readiness: newReadiness,
            status: newReadiness >= 80 ? 'Ready' : newReadiness >= 70 ? 'Developing' : newReadiness >= 60 ? 'Needs Review' : 'At Risk',
            recent_activities: [
              {
                type: attempt.quiz_type.startsWith('mock') ? 'Mock Exam' : 'Practice Set',
                description: attempt.quiz_type.startsWith('mock')
                  ? `Simulated BACE Exam (${attempt.total_questions} Q)`
                  : `Targeted Practice Set (${attempt.total_questions} Q)`,
                date: 'Just now',
                score: `${attempt.score}/${attempt.total_questions} (${attempt.percentage}%)`,
              },
              ...s.recent_activities.slice(0, 4),
            ],
          };
        }
        return s;
      })
    );

    setStudentPage('exam_results');
  };

  const deleteActivitySession = (sessionId: string) => {
    const sessionToDelete = activitySessions.find((s) => s.id === sessionId);
    if (!sessionToDelete) return;

    setActivitySessions((prev) => prev.filter((s) => s.id !== sessionId));

    setStudents((prev) =>
      prev.map((s) => {
        if (s.profile.id === currentStudent.profile.id) {
          const remainingAttempted = Math.max(0, s.questions_attempted - sessionToDelete.totalQuestions);
          const totalCorrectPreviously = Math.round((s.accuracy / 100) * s.questions_attempted);
          const remainingCorrect = Math.max(0, totalCorrectPreviously - sessionToDelete.score);
          const newAccuracy = remainingAttempted > 0 ? Math.round((remainingCorrect / remainingAttempted) * 100) : 0;

          let newMockScores = s.mock_exam_scores;
          if (sessionToDelete.type === 'Mock Exam') {
            const idx = newMockScores.lastIndexOf(sessionToDelete.accuracy);
            if (idx !== -1) {
              newMockScores = [...newMockScores.slice(0, idx), ...newMockScores.slice(idx + 1)];
            }
          }

          return {
            ...s,
            questions_attempted: remainingAttempted,
            accuracy: newAccuracy,
            mock_exam_scores: newMockScores,
          };
        }
        return s;
      })
    );
  };

  const updateDomainMastery = (domainId: string, newScore: number) => {
    const targetStudentId = currentStudent.profile.id;
    setStudents((prev) =>
      prev.map((s) => {
        if (s.profile.id === targetStudentId) {
          const updatedMastery = { ...s.domain_mastery, [domainId]: newScore };
          let totalScore = 0;
          domains.forEach((d) => {
            const val = updatedMastery[d.id] ?? 0;
            totalScore += val * (d.exam_weight / 100);
          });
          const newReadiness = Math.round(totalScore);
          return {
            ...s,
            domain_mastery: updatedMastery,
            overall_readiness: newReadiness,
            status: newReadiness >= 80 ? 'Ready' : newReadiness >= 70 ? 'Developing' : newReadiness >= 60 ? 'Needs Review' : 'At Risk',
          };
        }
        return s;
      })
    );
  };

  const addNewQuestion = (q: Omit<Question, 'id' | 'created_at'>) => {
    const newQ: Question = {
      ...q,
      id: `q_custom_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setQuestions((prev) => [newQ, ...prev]);
  };

  const addNewAssignment = (a: Omit<Assignment, 'id' | 'created_at'>) => {
    const newA: Assignment = {
      ...a,
      id: `asg_${Date.now()}`,
      teacher_id: a.teacher_id || currentTeacher.id,
      created_at: new Date().toISOString(),
    };
    setAssignments((prev) => [newA, ...prev]);
  };

  const createClass = (c: Omit<SchoolClass, 'id' | 'created_at'>) => {
    const newClass: SchoolClass = {
      ...c,
      id: `cls_${Date.now()}`,
      teacher_id: c.teacher_id || currentTeacher.id,
      created_at: new Date().toISOString(),
    };
    setClasses((prev) => [...prev, newClass]);
  };

  const recordLessonGrade = (gradeData: Omit<LessonGradeRecord, 'id' | 'submitted_at'>) => {
    const lesson = lessons.find((l) => l.id === gradeData.lesson_id);
    const domain = domains.find((d) => d.id === lesson?.domain_id);
    const pct = gradeData.percentage ?? Math.round((gradeData.score / Math.max(1, gradeData.total_questions)) * 100);
    const calculatedLetter: 'A' | 'B' | 'C' | 'D' | 'F' =
      pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';

    const newRecord: LessonGradeRecord = {
      lesson_title: lesson?.title || 'Lesson Assessment',
      domain_id: lesson?.domain_id || 'd1',
      domain_name: domain?.name || 'Biotechnology Skills',
      letter_grade: gradeData.letter_grade || calculatedLetter,
      ...gradeData,
      id: `lg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      submitted_at: new Date().toISOString(),
    };
    setLessonGrades((prev) => [newRecord, ...prev]);
    if (gradeData.lesson_id) {
      recordLessonCompletion(gradeData.lesson_id);
    }
  };

  const updateLessonGrade = (id: string, updates: Partial<LessonGradeRecord>) => {
    setLessonGrades((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const startLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setStudentPage('lesson');
  };

  const openDomain = (domainId: string) => {
    setSelectedDomainId(domainId);
    setStudentPage('domain_detail');
  };

  const startPractice = (config: {
    mode: string;
    domainId?: string;
    topicId?: string;
    lessonId?: string;
    count: number;
  }) => {
    setActivePracticeConfig(config);
    setStudentPage('practice');
  };

  const startMockExam = (type: 'quick' | 'half' | 'full') => {
    if (type === 'quick') {
      setActiveExamConfig({
        title: 'Quick Mock Exam — 25 Questions',
        totalQuestions: 25,
        timeLimitMinutes: 30,
        quizType: 'mock_quick',
      });
    } else if (type === 'half') {
      setActiveExamConfig({
        title: 'Half Mock Exam — 50 Questions',
        totalQuestions: 50,
        timeLimitMinutes: 60,
        quizType: 'mock_half',
      });
    } else {
      setActiveExamConfig({
        title: 'Full BACE Simulation — 124 Questions',
        totalQuestions: 124,
        timeLimitMinutes: 240,
        quizType: 'mock_full',
      });
    }
    setStudentPage('mock_exam_runner');
  };

  const viewStudentProfile = (studentId: string) => {
    setSelectedStudentId(studentId);
    setTeacherPage('student_detail');
  };

  const setEnvironment = (newEnv: AppEnvironment) => {
    if (newEnv === environment) return;

    // Persist current memory into old environment first
    saveEnvData(environment, 'students', students);
    saveEnvData(environment, 'teachers', teachers);
    saveEnvData(environment, 'classes', classes);
    saveEnvData(environment, 'assignments', assignments);
    saveEnvData(environment, 'activity_sessions', activitySessions);
    saveEnvData(environment, 'lesson_grades', lessonGrades);

    // Switch environment
    setEnvironmentState(newEnv);
    localStorage.setItem('bace_app_environment', newEnv);
    localStorage.setItem('bace_demo_mode_enabled', newEnv === 'demo' ? 'true' : 'false');

    // Load target environment's data
    let nextStudents = loadEnvData<StudentOverview[]>(newEnv, 'students', newEnv === 'demo' ? [DEMO_SEED_STUDENT] : []);
    let nextTeachers = loadEnvData<TeacherProfile[]>(newEnv, 'teachers', newEnv === 'demo' ? [DEMO_SEED_TEACHER] : []);
    let nextClasses = loadEnvData<SchoolClass[]>(newEnv, 'classes', INITIAL_CLASSES);
    let nextAssignments = loadEnvData<Assignment[]>(newEnv, 'assignments', []);
    let nextActivities = loadEnvData<StudentActivitySession[]>(newEnv, 'activity_sessions', []);
    let nextGrades = loadEnvData<LessonGradeRecord[]>(newEnv, 'lesson_grades', []);

    if (newEnv === 'production') {
      nextStudents = nextStudents.filter(
        (s) =>
          s.profile.id !== 'stu_demo_wagner_jordan' &&
          s.profile.id !== 'stu_alex' &&
          s.profile.email.toLowerCase() !== 'jordan.rivera@wagner-cte.org'
      );
      nextTeachers = nextTeachers.filter(
        (t) =>
          t.id !== 'tch_demo_wagner_martinez' &&
          t.id !== 't_vance' &&
          t.email.toLowerCase() !== 'martinez.cte@wagner-cte.org'
      );
    }

    setStudents(nextStudents);
    setTeachers(nextTeachers);
    setClasses(nextClasses);
    setAssignments(nextAssignments);
    setActivitySessions(nextActivities);
    setLessonGrades(nextGrades);

    // User switch
    const nextUserRaw = localStorage.getItem(getEnvStorageKey(newEnv, 'auth_user'));
    if (nextUserRaw) {
      try {
        const nextUser: Profile = JSON.parse(nextUserRaw);
        if (
          newEnv === 'production' &&
          (nextUser.id === 'stu_demo_wagner_jordan' ||
            nextUser.id === 'tch_demo_wagner_martinez' ||
            nextUser.email.toLowerCase() === 'jordan.rivera@wagner-cte.org' ||
            nextUser.email.toLowerCase() === 'martinez.cte@wagner-cte.org')
        ) {
          signOut();
        } else {
          setCurrentUser(nextUser);
          setRole(nextUser.role);
        }
      } catch {
        signOut();
      }
    } else {
      signOut();
    }
  };

  const setDemoModeEnabled = (enabled: boolean) => {
    setEnvironment(enabled ? 'demo' : 'production');
  };

  const purgeDemoData = () => {
    const demoStudentIds = new Set(['stu_demo_wagner_jordan', 'stu_jordan', 'stu_alex']);
    const demoTeacherIds = new Set(['tch_demo_wagner_martinez', 't_vance']);
    const demoEmails = new Set(['jordan.rivera@wagner-cte.org', 'martinez.cte@wagner-cte.org']);

    // Production clean
    const currentProdStudents = loadEnvData<StudentOverview[]>('production', 'students', []).filter(
      (s) => !demoStudentIds.has(s.profile.id) && !demoEmails.has(s.profile.email.toLowerCase())
    );
    saveEnvData('production', 'students', currentProdStudents);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(currentProdStudents));

    const currentProdTeachers = loadEnvData<TeacherProfile[]>('production', 'teachers', []).filter(
      (t) => !demoTeacherIds.has(t.id) && !demoEmails.has(t.email.toLowerCase())
    );
    saveEnvData('production', 'teachers', currentProdTeachers);
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(currentProdTeachers));

    // Reset demo storage to default clean demo seed
    saveEnvData('demo', 'students', [DEMO_SEED_STUDENT]);
    saveEnvData('demo', 'teachers', [DEMO_SEED_TEACHER]);

    if (environment === 'production') {
      setStudents(currentProdStudents);
      setTeachers(currentProdTeachers);
      if (
        currentUser &&
        (demoStudentIds.has(currentUser.id) ||
          demoTeacherIds.has(currentUser.id) ||
          demoEmails.has(currentUser.email.toLowerCase()))
      ) {
        signOut();
      }
    } else {
      setStudents([DEMO_SEED_STUDENT]);
      setTeachers([DEMO_SEED_TEACHER]);
    }
  };

  const resetDemoSandbox = () => {
    saveEnvData('demo', 'students', [DEMO_SEED_STUDENT]);
    saveEnvData('demo', 'teachers', [DEMO_SEED_TEACHER]);
    saveEnvData('demo', 'classes', INITIAL_CLASSES);
    saveEnvData('demo', 'assignments', []);
    saveEnvData('demo', 'activity_sessions', []);
    saveEnvData('demo', 'lesson_grades', []);
    removeEnvData('demo', 'auth_user');

    if (environment === 'demo') {
      setStudents([DEMO_SEED_STUDENT]);
      setTeachers([DEMO_SEED_TEACHER]);
      setClasses(INITIAL_CLASSES);
      setAssignments([]);
      setActivitySessions([]);
      setLessonGrades([]);
      signOut();
    }
  };

  const resetAllData = () => {
    localStorage.clear();
    setCurrentUser(null);
    setQuestions(INITIAL_QUESTIONS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setAssignmentProgress([]);
    setStudentCompletedLessonsMap({});
    setActivitySessions(INITIAL_ACTIVITY_SESSIONS);
    setStudents(INITIAL_STUDENTS_ROSTER);
    setTeachers(INITIAL_TEACHERS);
    setClasses(INITIAL_CLASSES);
    setLessonGrades(INITIAL_LESSON_GRADES);
    setActiveStudentIdState('');
    setActiveTeacherIdState('');
    setStudentPageState('dashboard');
    setTeacherPageState('dashboard');
    setBenchStats({
      pipetteDrillsCompleted: 0,
      pipetteAccuracy: 100,
      mathProblemsSolved: 0,
      mathAccuracy: 100,
      auditsCompleted: 0,
      auditsPassed: 0,
      rubricsSignedOff: {},
    });
    localStorage.removeItem('bace_bench_stats');
  };

  const [benchStats, setBenchStats] = useState<BenchSimulatorStats>(() => {
    try {
      const raw = localStorage.getItem('bace_bench_stats');
      if (raw) return JSON.parse(raw);
    } catch {}
    return {
      pipetteDrillsCompleted: 0,
      pipetteAccuracy: 100,
      mathProblemsSolved: 0,
      mathAccuracy: 100,
      auditsCompleted: 0,
      auditsPassed: 0,
      rubricsSignedOff: {},
    };
  });

  const recordBenchActivity = (
    type: 'pipette' | 'math' | 'audit' | 'rubric' | 'spectro' | 'gel' | 'centrifuge',
    score: number,
    total: number,
    details?: string,
    rubricId?: string
  ) => {
    setBenchStats((prev) => {
      const next: BenchSimulatorStats = {
        ...prev,
        rubricsSignedOff: { ...prev.rubricsSignedOff },
      };
      if (type === 'pipette') {
        const prevCorrect = Math.round((prev.pipetteAccuracy / 100) * prev.pipetteDrillsCompleted);
        next.pipetteDrillsCompleted += total;
        next.pipetteAccuracy = Math.round(((prevCorrect + score) / Math.max(1, next.pipetteDrillsCompleted)) * 100);
      } else if (type === 'math') {
        const prevCorrect = Math.round((prev.mathAccuracy / 100) * prev.mathProblemsSolved);
        next.mathProblemsSolved += total;
        next.mathAccuracy = Math.round(((prevCorrect + score) / Math.max(1, next.mathProblemsSolved)) * 100);
      } else if (type === 'audit') {
        next.auditsCompleted += 1;
        if (score >= total * 0.75) next.auditsPassed += 1;
      } else if (type === 'rubric' && rubricId) {
        next.rubricsSignedOff[rubricId] = true;
      } else if (type === 'spectro') {
        const runs = (prev.spectroRunsCompleted || 0) + total;
        const prevAcc = prev.spectroAccuracy ?? 100;
        const prevCorrect = Math.round((prevAcc / 100) * (prev.spectroRunsCompleted || 0));
        next.spectroRunsCompleted = runs;
        next.spectroAccuracy = Math.round(((prevCorrect + score) / Math.max(1, runs)) * 100);
      } else if (type === 'gel') {
        const sizings = (prev.gelSizingsCompleted || 0) + total;
        const prevAcc = prev.gelSizingAccuracy ?? 100;
        const prevCorrect = Math.round((prevAcc / 100) * (prev.gelSizingsCompleted || 0));
        next.gelSizingsCompleted = sizings;
        next.gelSizingAccuracy = Math.round(((prevCorrect + score) / Math.max(1, sizings)) * 100);
      } else if (type === 'centrifuge') {
        next.centrifugeBalancesCompleted = (prev.centrifugeBalancesCompleted || 0) + 1;
      }
      try {
        localStorage.setItem('bace_bench_stats', JSON.stringify(next));
      } catch {}
      return next;
    });

    // Update current student recent activities and domain mastery
    setStudents((prev) =>
      prev.map((s) => {
        if (s.profile.id === currentStudent.profile.id) {
          const updatedMastery = { ...s.domain_mastery };
          const targetDomain =
            type === 'pipette' || type === 'rubric'
              ? 'd1'
              : type === 'math'
              ? 'd4'
              : type === 'spectro'
              ? 'd7'
              : type === 'gel'
              ? 'd8'
              : 'd7'; // centrifuge is d7

          const prevScore = updatedMastery[targetDomain] ?? 60;
          const boost = score > 0 ? 3 : 1;
          updatedMastery[targetDomain] = Math.min(100, prevScore + boost);

          // Additional multi-domain cross-mastery boost
          if (type === 'spectro') {
            const d8Score = updatedMastery['d8'] ?? 60;
            updatedMastery['d8'] = Math.min(100, d8Score + (score > 0 ? 2 : 1));
          } else if (type === 'gel') {
            const d1Score = updatedMastery['d1'] ?? 60;
            updatedMastery['d1'] = Math.min(100, d1Score + (score > 0 ? 2 : 1));
          } else if (type === 'centrifuge') {
            const d1Score = updatedMastery['d1'] ?? 60;
            updatedMastery['d1'] = Math.min(100, d1Score + (score > 0 ? 2 : 1));
          }

          let totalScore = 0;
          domains.forEach((d) => {
            const val = updatedMastery[d.id] ?? 0;
            totalScore += val * (d.exam_weight / 100);
          });
          const newReadiness = Math.round(totalScore);

          const activityLabel =
            type === 'pipette'
              ? 'Micropipette Trainer'
              : type === 'math'
              ? 'Bench Math Generator'
              : type === 'audit'
              ? 'GLP/GMP Notebook Audit'
              : type === 'spectro'
              ? 'Spectrophotometry & Standard Curve'
              : type === 'gel'
              ? 'Agarose Gel Band Sizing'
              : type === 'centrifuge'
              ? 'Centrifuge Balancing & Metrology'
              : 'Station Rubric Sign-Off';

          return {
            ...s,
            domain_mastery: updatedMastery,
            overall_readiness: Math.max(s.overall_readiness, newReadiness),
            recent_activities: [
              {
                type: activityLabel,
                description: details || `${activityLabel} practice`,
                date: 'Just now',
                score: `${score}/${total}`,
              },
              ...s.recent_activities.slice(0, 4),
            ],
          };
        }
        return s;
      })
    );
  };

  const markBenchLessonComplete = (lessonId: string, completed = true) => {
    setBenchStats((prev) => {
      const next: BenchSimulatorStats = {
        ...prev,
        lessonsCompleted: {
          ...(prev.lessonsCompleted || {}),
          [lessonId]: completed,
        },
      };
      try {
        localStorage.setItem('bace_bench_stats', JSON.stringify(next));
      } catch {}
      return next;
    });

    if (completed) {
      setStudents((prev) =>
        prev.map((s) => {
          if (s.profile.id === currentStudent.profile.id) {
            const updatedMastery = { ...s.domain_mastery };
            const targetDomain =
              lessonId.includes('pipette')
                ? 'd1'
                : lessonId.includes('math')
                ? 'd4'
                : lessonId.includes('audit')
                ? 'd8'
                : 'd6';

            const prevScore = updatedMastery[targetDomain] ?? 65;
            updatedMastery[targetDomain] = Math.min(100, prevScore + 3);

            let totalScore = 0;
            domains.forEach((d) => {
              const val = updatedMastery[d.id] ?? 0;
              totalScore += val * (d.exam_weight / 100);
            });
            const newReadiness = Math.round(totalScore);

            const titleMap: Record<string, string> = {
              lesson_pipette: 'Micropipette Theory & Two-Stop Plunger',
              lesson_math: 'Algorithmic Bench Math & Dimensional Analysis',
              lesson_audit: 'GLP / GMP & ALCOA+ Documentation',
              lesson_rubrics: 'BACE Practical Station Rubrics',
            };

            return {
              ...s,
              domain_mastery: updatedMastery,
              overall_readiness: Math.max(s.overall_readiness, newReadiness),
              recent_activities: [
                {
                  type: 'Bench Theory Lesson',
                  description: `Completed Guided Lesson: ${titleMap[lessonId] || lessonId}`,
                  date: 'Just now',
                  score: 'Certified Complete',
                },
                ...s.recent_activities.slice(0, 4),
              ],
            };
          }
          return s;
        })
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        environment,
        isProduction,
        isDemo,
        setEnvironment,
        resetDemoSandbox,
        currentUser,
        isAuthenticated: Boolean(currentUser),
        role,
        currentRole: role,
        setRole,
        registerStudent,
        registerTeacher,
        registerAdmin,
        loginUser,
        signOut,
        studentPage,
        setStudentPage,
        teacherPage,
        setTeacherPage,
        adminPage,
        setAdminPage,
        deleteClass,
        googleUser,
        isGoogleAuthLoading,
        signInWithGoogle,
        oneClickGoogleSignIn,
        signOutGoogle,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAuthModal,
        authModalPreferredRole,
        selectedDomainId,
        setSelectedDomainId,
        selectedLessonId,
        setSelectedLessonId,
        selectedStudentId,
        setSelectedStudentId,
        domains,
        topics,
        lessons,
        questions,
        achievements,
        classes,
        students,
        teachers,
        assignments,
        assignmentProgress,
        completedLessonIds,
        activitySessions,
        lessonGrades,
        currentTeacher,
        activeTeacherId,
        setActiveTeacherId,
        createTeacherAccount,
        updateTeacherAccount,
        deleteTeacherAccount,
        currentStudent,
        activeStudentId,
        setActiveStudentId,
        createStudentAccount,
        updateStudentAccount,
        deleteStudentAccount,
        createTestStudent,
        isAccountModalOpen,
        setIsAccountModalOpen,
        accountModalTab,
        openAccountModal,
        overallReadiness,
        lastExamAttempt,
        setLastExamAttempt,
        activeExamConfig,
        setActiveExamConfig,
        activePracticeConfig,
        setActivePracticeConfig,
        recordLessonCompletion,
        recordLessonGrade,
        updateLessonGrade,
        recordExamSubmission,
        deleteActivitySession,
        updateDomainMastery,
        addNewQuestion,
        createQuestion: addNewQuestion,
        addNewAssignment,
        createAssignment: addNewAssignment,
        deleteAssignment,
        markAssignmentCompleted,
        createClass,
        startLesson,
        openDomain,
        startPractice,
        startMockExam,
        viewStudentProfile,
        loginDemoStudent,
        loginDemoTeacher,
        loginDemoAdmin,
        facultyAccessCode,
        updateFacultyAccessCode,
        isFacultyPreviewingStudent,
        returnToFacultyConsole,
        resetAllData,
        demoModeEnabled,
        setDemoModeEnabled,
        purgeDemoData,
        transferStudentPeriod,
        regenerateClassJoinCode,
        resetStudentAccess,
        benchStats,
        recordBenchActivity,
        markBenchLessonComplete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
