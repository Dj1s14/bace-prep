import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Briefcase,
  School,
  Database,
  Search,
  Filter,
  Trash2,
  UserPlus,
  Plus,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Download,
  Calendar,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  UserCheck,
  KeyRound,
  FileSpreadsheet,
  AlertCircle,
  X,
  Edit2,
  Check,
  ArrowRightLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentOverview, TeacherProfile, SchoolClass } from '../../types/database';
import { testSupabaseConnection, syncQuestionsToSupabase, syncAssignmentsToSupabase } from '../../lib/supabase';
import { CreateStudentModal } from '../common/CreateStudentModal';

export const AdminPortal: React.FC = () => {
  const {
    adminPage,
    setAdminPage,
    students,
    teachers,
    classes,
    questions,
    deleteStudentAccount,
    deleteTeacherAccount,
    deleteClass,
    createStudentAccount,
    createTeacherAccount,
    createClass,
    transferStudentPeriod,
    googleUser,
    openAuthModal,
    resetAllData,
  } = useApp();

  // Local tab override or use adminPage from context
  const activeTab = adminPage || 'dashboard';

  // Search & Filter States
  const [studentSearch, setStudentSearch] = useState('');
  const [studentClassFilter, setStudentClassFilter] = useState('all');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  // Confirmation Modals
  const [studentToDelete, setStudentToDelete] = useState<StudentOverview | null>(null);
  const [studentToTransfer, setStudentToTransfer] = useState<StudentOverview | null>(null);
  const [targetTransferClassId, setTargetTransferClassId] = useState<string>('');
  const [teacherToDelete, setTeacherToDelete] = useState<TeacherProfile | null>(null);
  const [classToDelete, setClassToDelete] = useState<SchoolClass | null>(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  // Creation Modals
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  // New Teacher Form
  const [newPrefix, setNewPrefix] = useState('Dr.');
  const [newTFirstName, setNewTFirstName] = useState('');
  const [newTLastName, setNewTLastName] = useState('');
  const [newTEmail, setNewTEmail] = useState('');
  const [newTSchool, setNewTSchool] = useState('Biotechnology & Life Sciences Academy');
  const [newTDept, setNewTDept] = useState('CTE Biomedical Science');

  // New Class Form
  const [newClassName, setNewClassName] = useState('');
  const [newGradeLevel, setNewGradeLevel] = useState('11th - 12th Grade');
  const [newAssignedTeacher, setNewAssignedTeacher] = useState('');

  // System Sync & Test states
  const [supabaseStatus, setSupabaseStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
  const [supabaseMessage, setSupabaseMessage] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Notifications
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const fullName = `${s.profile.first_name} ${s.profile.last_name}`.toLowerCase();
    const email = (s.profile.email || '').toLowerCase();
    const matchesSearch =
      fullName.includes(studentSearch.toLowerCase()) || email.includes(studentSearch.toLowerCase());
    const matchesClass = studentClassFilter === 'all' || s.class_id === studentClassFilter;
    return matchesSearch && matchesClass;
  });

  // Filtered Teachers
  const filteredTeachers = teachers.filter((t) => {
    const fullName = `${t.first_name} ${t.last_name}`.toLowerCase();
    const email = t.email.toLowerCase();
    const dept = (t.department || '').toLowerCase();
    return (
      fullName.includes(teacherSearch.toLowerCase()) ||
      email.includes(teacherSearch.toLowerCase()) ||
      dept.includes(teacherSearch.toLowerCase())
    );
  });

  // Handle single student removal
  const confirmDeleteStudent = () => {
    if (!studentToDelete) return;
    deleteStudentAccount(studentToDelete.profile.id);
    showNotice(`Successfully removed student ${studentToDelete.profile.first_name} ${studentToDelete.profile.last_name}`);
    setStudentToDelete(null);
    setSelectedStudentIds((prev) => prev.filter((id) => id !== studentToDelete.profile.id));
  };

  // Handle batch student removal
  const confirmBulkDelete = () => {
    selectedStudentIds.forEach((id) => deleteStudentAccount(id));
    showNotice(`Removed ${selectedStudentIds.length} selected students.`);
    setSelectedStudentIds([]);
    setIsBulkDeleteModalOpen(false);
  };

  // Handle teacher removal
  const confirmDeleteTeacher = () => {
    if (!teacherToDelete) return;
    deleteTeacherAccount(teacherToDelete.id);
    showNotice(`Successfully removed teacher ${teacherToDelete.first_name} ${teacherToDelete.last_name}`);
    setTeacherToDelete(null);
  };

  // Handle class removal
  const confirmDeleteClass = () => {
    if (!classToDelete) return;
    deleteClass(classToDelete.id);
    showNotice(`Deleted class ${classToDelete.name}`);
    setClassToDelete(null);
  };

  // Create Teacher handler
  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTFirstName.trim() || !newTLastName.trim() || !newTEmail.trim()) return;

    createTeacherAccount({
      prefix: newPrefix,
      first_name: newTFirstName.trim(),
      last_name: newTLastName.trim(),
      email: newTEmail.trim(),
      school_name: newTSchool.trim(),
      department: newTDept.trim(),
    });

    showNotice(`Created teacher account for ${newPrefix} ${newTFirstName} ${newTLastName}`);
    setNewTFirstName('');
    setNewTLastName('');
    setNewTEmail('');
    setIsAddTeacherOpen(false);
  };

  // Create Class handler
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    createClass({
      name: newClassName.trim(),
      teacher_id: newAssignedTeacher || (teachers[0]?.id || ''),
      period: newGradeLevel || 'Period 1',
      school_year: '2025-2026',
      join_code: `BACE${Math.floor(100 + Math.random() * 900)}`,
    });

    showNotice(`Created class "${newClassName.trim()}"`);
    setNewClassName('');
    setIsAddClassOpen(false);
  };

  // Test Supabase Connection
  const handleTestSupabase = async () => {
    setSupabaseStatus('testing');
    setSupabaseMessage('Pinging Supabase REST API & Database...');
    const result = await testSupabaseConnection();
    if (result.connected) {
      setSupabaseStatus('connected');
      setSupabaseMessage(result.message);
    } else {
      setSupabaseStatus('error');
      setSupabaseMessage(result.message);
    }
  };

  // Sync to Supabase
  const handleSyncSupabase = async () => {
    setIsSyncing(true);
    setSyncStatus('Syncing BACE curriculum questions and assignments to Supabase...');
    try {
      const qRes = await syncQuestionsToSupabase(questions);
      setSyncStatus(`Database synchronization completed: ${qRes.count} questions checked/synced.`);
    } catch (err: any) {
      setSyncStatus(`Sync error: ${err?.message || 'Check database permissions'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Export Roster as CSV
  const exportRosterCSV = () => {
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Class', 'Readiness %', 'Status', 'Lessons Done', 'Questions Attempted', 'Accuracy %'];
    const rows = students.map((s) => {
      const cls = classes.find((c) => c.id === s.class_id)?.name || s.class_id;
      return [
        s.profile.id,
        `"${s.profile.first_name}"`,
        `"${s.profile.last_name}"`,
        `"${s.profile.email}"`,
        `"${cls}"`,
        s.overall_readiness,
        `"${s.status}"`,
        s.lessons_completed,
        s.questions_attempted,
        s.accuracy,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bace_student_roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('Exported Student Roster to CSV');
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Top Banner Notice */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{actionNotice}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-[#0B192C] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-700/60">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Administrative Authority Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              BACE Administration & User Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Full administrator control over all enrolled students, teachers, classes, and Supabase cloud synchronization. Remove or enroll members with complete authority.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openAuthModal('admin')}
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              <KeyRound className="w-4 h-4" />
              <span>{googleUser ? `Connected: ${googleUser.name}` : 'Google Auth Sign-In'}</span>
            </button>
            <button
              onClick={exportRosterCSV}
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Roster (CSV)</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 sm:space-x-4 border-t border-slate-800/80 mt-6 pt-4 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Overview', icon: ShieldCheck },
            { id: 'students', label: `Students & Removal (${students.length})`, icon: Users },
            { id: 'teachers', label: `Teachers & Removal (${teachers.length})`, icon: Briefcase },
            { id: 'classes', label: `Classes (${classes.length})`, icon: School },
            { id: 'system', label: 'Database & Supabase Sync', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminPage(tab.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Students</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{students.length}</div>
              <p className="text-[11px] text-slate-500">
                {students.filter((s) => s.overall_readiness >= 80).length} BACE Exam Ready (80%+)
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Teachers</span>
                <Briefcase className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{teachers.length}</div>
              <p className="text-[11px] text-slate-500">Across {classes.length} active class cohorts</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Class Cohorts</span>
                <School className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{classes.length}</div>
              <p className="text-[11px] text-slate-500">Biotechnology curriculum tracks</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Question Bank</span>
                <BookOpen className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{questions.length}</div>
              <p className="text-[11px] text-slate-500">Biotility BACE exam-aligned items</p>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Administrative Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-left transition-colors flex items-center space-x-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Add Real Student</div>
                  <div className="text-[10px] text-slate-500">Enroll new student into cohort</div>
                </div>
              </button>

              <button
                onClick={() => setIsAddTeacherOpen(true)}
                className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 hover:bg-teal-50 text-left transition-colors flex items-center space-x-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700">Add Real Teacher</div>
                  <div className="text-[10px] text-slate-500">Create verified instructor</div>
                </div>
              </button>

              <button
                onClick={() => setIsAddClassOpen(true)}
                className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-left transition-colors flex items-center space-x-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <School className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">Add New Class</div>
                  <div className="text-[10px] text-slate-500">Create new course section</div>
                </div>
              </button>

              <button
                onClick={() => setAdminPage('system')}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors flex items-center space-x-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-slate-800">Supabase Cloud Sync</div>
                  <div className="text-[10px] text-slate-500">Database health & backup</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Roster Snapshots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Preview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Student Roster Overview</h3>
                  <p className="text-xs text-slate-500">Active students currently enrolled</p>
                </div>
                <button
                  onClick={() => setAdminPage('students')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Manage All ({students.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {students.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-600">No artificial students enrolled</p>
                  <button
                    onClick={() => setIsAddStudentOpen(true)}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    + Add first real student
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {students.slice(0, 4).map((s) => (
                    <div key={s.profile.id} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {s.profile.first_name[0]}{s.profile.last_name[0]}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {s.profile.first_name} {s.profile.last_name}
                          </div>
                          <div className="text-[10px] text-slate-500">{s.profile.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-semibold text-slate-700">{s.overall_readiness}% Readiness</span>
                        <button
                          onClick={() => setStudentToDelete(s)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Teacher Preview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Teacher Directory Overview</h3>
                  <p className="text-xs text-slate-500">Verified instructors</p>
                </div>
                <button
                  onClick={() => setAdminPage('teachers')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Manage All ({teachers.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {teachers.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-600">No teachers registered</p>
                  <button
                    onClick={() => setIsAddTeacherOpen(true)}
                    className="mt-3 text-xs font-semibold text-teal-600 hover:underline"
                  >
                    + Add first real teacher
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {teachers.slice(0, 4).map((t) => (
                    <div key={t.id} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                          {t.first_name[0]}{t.last_name[0]}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {t.prefix ? `${t.prefix} ` : ''}{t.first_name} {t.last_name}
                          </div>
                          <div className="text-[10px] text-slate-500">{t.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-[11px] text-slate-500">{t.department}</span>
                        <button
                          onClick={() => setTeacherToDelete(t)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove Teacher"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENTS & REMOVAL */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Student Directory & Removal Control</h2>
              <p className="text-xs text-slate-500">
                View, filter, add, or permanently delete student accounts and performance records.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {selectedStudentIds.length > 0 && (
                <button
                  onClick={() => setIsBulkDeleteModalOpen(true)}
                  className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-xs"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Selected ({selectedStudentIds.length})</span>
                </button>
              )}
              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Enroll Student</span>
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students by full name or email address..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={studentClassFilter}
              onChange={(e) => setStudentClassFilter(e.target.value)}
              className="text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Classes ({classes.length})</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {filteredStudents.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-800">No Students Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  {students.length === 0
                    ? 'All artificial test students have been eliminated. Click below to enroll a real student.'
                    : 'No students matched your search criteria.'}
                </p>
                <button
                  onClick={() => setIsAddStudentOpen(true)}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
                >
                  + Enroll New Student
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={selectedStudentIds.length === filteredStudents.length && filteredStudents.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStudentIds(filteredStudents.map((s) => s.profile.id));
                            } else {
                              setSelectedStudentIds([]);
                            }
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Class</th>
                      <th className="py-3 px-4">BACE Readiness</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Lessons Done</th>
                      <th className="py-3 px-4 text-right">Removal & Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {filteredStudents.map((s) => {
                      const cls = classes.find((c) => c.id === s.class_id);
                      const isSelected = selectedStudentIds.includes(s.profile.id);
                      return (
                        <tr
                          key={s.profile.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isSelected ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          <td className="py-3 px-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedStudentIds((prev) => [...prev, s.profile.id]);
                                } else {
                                  setSelectedStudentIds((prev) => prev.filter((id) => id !== s.profile.id));
                                }
                              }}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {s.profile.first_name[0]}{s.profile.last_name[0]}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">
                                  {s.profile.first_name} {s.profile.last_name}
                                </div>
                                <div className="text-[11px] text-slate-500">{s.profile.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-slate-800">{cls?.name || 'General Cohort'}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    s.overall_readiness >= 80
                                      ? 'bg-emerald-500'
                                      : s.overall_readiness >= 70
                                      ? 'bg-amber-500'
                                      : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${s.overall_readiness}%` }}
                                />
                              </div>
                              <span className="font-semibold text-slate-900">{s.overall_readiness}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                s.status === 'Ready'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : s.status === 'Developing'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {s.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-slate-800">{s.lessons_completed}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => {
                                  setStudentToTransfer(s);
                                  setTargetTransferClassId(s.class_id || (classes[0]?.id || ''));
                                }}
                                className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 transition-colors font-semibold text-[11px] cursor-pointer"
                                title="Transfer Student to Another Period"
                              >
                                <ArrowRightLeft className="w-3.5 h-3.5" />
                                <span>Transfer</span>
                              </button>
                              <button
                                onClick={() => setStudentToDelete(s)}
                                className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors font-semibold text-[11px] cursor-pointer"
                                title="Remove Student from Application"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: TEACHERS & REMOVAL */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Teacher Management & Removal</h2>
              <p className="text-xs text-slate-500">
                Manage all registered instructors, verify teaching credentials, or remove teacher accounts.
              </p>
            </div>
            <button
              onClick={() => setIsAddTeacherOpen(true)}
              className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Teacher</span>
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search teachers by name, email, or department..."
                value={teacherSearch}
                onChange={(e) => setTeacherSearch(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Teacher Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {filteredTeachers.length === 0 ? (
              <div className="p-12 text-center">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-800">No Teachers Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Add a verified instructor to begin assigning BACE coursework.
                </p>
                <button
                  onClick={() => setIsAddTeacherOpen(true)}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-xs"
                >
                  + Add Teacher Account
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3 px-4">Instructor</th>
                      <th className="py-3 px-4">Department & School</th>
                      <th className="py-3 px-4">Assigned Classes</th>
                      <th className="py-3 px-4">Joined</th>
                      <th className="py-3 px-4 text-right">Removal & Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {filteredTeachers.map((t) => {
                      const teacherClasses = classes.filter((c) => c.teacher_id === t.id);
                      return (
                        <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {t.first_name[0]}{t.last_name[0]}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">
                                  {t.prefix ? `${t.prefix} ` : ''}{t.first_name} {t.last_name}
                                </div>
                                <div className="text-[11px] text-slate-500">{t.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-800">{t.department || 'CTE Science'}</div>
                            <div className="text-[11px] text-slate-500">{t.school_name}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 text-[11px]">
                              {teacherClasses.length} {teacherClasses.length === 1 ? 'Class' : 'Classes'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-[11px]">
                            {t.created_at ? new Date(t.created_at).toLocaleDateString() : 'Active'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setTeacherToDelete(t)}
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors font-semibold text-[11px]"
                              title="Remove Teacher from Application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove Teacher</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CLASSES & COHORTS */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Classes & Cohort Management</h2>
              <p className="text-xs text-slate-500">
                Organize student cohorts, set target exam dates, and assign responsible teachers.
              </p>
            </div>
            <button
              onClick={() => setIsAddClassOpen(true)}
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Class</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {classes.map((cls) => {
              const teacher = teachers.find((t) => t.id === cls.teacher_id);
              const enrolledStudents = students.filter((s) => s.class_id === cls.id);
              const avgReadiness =
                enrolledStudents.length > 0
                  ? Math.round(
                      enrolledStudents.reduce((acc, curr) => acc + curr.overall_readiness, 0) /
                        enrolledStudents.length
                    )
                  : 0;

              return (
                <div
                  key={cls.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                        {cls.period || 'Biotech Section'}
                      </span>
                      <button
                        onClick={() => setClassToDelete(cls)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Class"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{cls.name}</h3>
                    <p className="text-xs text-slate-500">
                      Instructor: <strong className="text-slate-700">{teacher ? `${teacher.prefix || ''} ${teacher.first_name} ${teacher.last_name}` : 'Unassigned'}</strong>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{enrolledStudents.length}</span>{' '}
                      <span className="text-slate-500">Students</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Avg: </span>
                      <strong
                        className={`font-semibold ${
                          avgReadiness >= 80 ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {avgReadiness}% Readiness
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: DATABASE & SUPABASE */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Supabase Cloud Database & Auth Configuration</h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              Verify live connectivity to your Supabase project (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700">gfdbcrfqbsowlbnprqqn</code>), trigger table synchronization, and ensure zero artificial mock data remains in your environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supabase Connectivity Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Live Database Health Check</h3>
                  <p className="text-xs text-slate-500">Test Supabase REST API & permissions</p>
                </div>
              </div>

              {supabaseMessage && (
                <div
                  className={`p-3.5 rounded-xl border text-xs flex items-start space-x-2.5 ${
                    supabaseStatus === 'connected'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : supabaseStatus === 'testing'
                      ? 'bg-blue-50 border-blue-200 text-blue-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  {supabaseStatus === 'connected' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div className="leading-relaxed">{supabaseMessage}</div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleTestSupabase}
                  disabled={supabaseStatus === 'testing'}
                  className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors flex items-center space-x-2 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${supabaseStatus === 'testing' ? 'animate-spin' : ''}`} />
                  <span>Test Supabase Connection</span>
                </button>

                <button
                  onClick={handleSyncSupabase}
                  disabled={isSyncing}
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors flex items-center space-x-2 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Curriculum Questions'}</span>
                </button>
              </div>

              {syncStatus && (
                <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {syncStatus}
                </p>
              )}
            </div>

            {/* Google OAuth Status Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Google OAuth with Supabase</h3>
                  <p className="text-xs text-slate-500">One-click sign in for students & teachers</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span>Current OAuth Status:</span>
                  <span className="font-bold text-slate-900">
                    {googleUser ? `Signed in as ${googleUser.email}` : 'Ready for Sign-in'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span>Authorized Redirect URI:</span>
                  <code className="text-[10px] bg-slate-200 px-1 py-0.5 rounded text-slate-800 truncate max-w-[200px]">
                    {window.location.origin}
                  </code>
                </div>
              </div>

              <button
                onClick={() => openAuthModal('admin')}
                className="w-full py-2.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-xs"
              >
                Open Google Sign-In Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE STUDENT MODAL */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">Remove Student from BACE Prep Lab?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <strong className="text-slate-900">
                  {studentToDelete.profile.first_name} {studentToDelete.profile.last_name}
                </strong>{' '}
                ({studentToDelete.profile.email})? This action removes their exam scores, assignment submissions, and readiness metrics.
              </p>
            </div>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setStudentToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteStudent}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors shadow-xs"
              >
                Yes, Remove Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM BULK DELETE STUDENTS MODAL */}
      {isBulkDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">Remove {selectedStudentIds.length} Students?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This administrative action will permanently delete the {selectedStudentIds.length} selected student accounts and all associated data.
              </p>
            </div>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsBulkDeleteModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmBulkDelete}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors shadow-xs"
              >
                Yes, Remove All {selectedStudentIds.length}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE TEACHER MODAL */}
      {teacherToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">Remove Teacher Account?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to remove{' '}
                <strong className="text-slate-900">
                  {teacherToDelete.prefix ? `${teacherToDelete.prefix} ` : ''}
                  {teacherToDelete.first_name} {teacherToDelete.last_name}
                </strong>{' '}
                ({teacherToDelete.email})? Any assigned classes will remain active but become unassigned.
              </p>
            </div>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setTeacherToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTeacher}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors shadow-xs"
              >
                Yes, Remove Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE CLASS MODAL */}
      {classToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">Delete Class Cohort?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Delete <strong className="text-slate-900">{classToDelete.name}</strong>?
              </p>
            </div>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setClassToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteClass}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors shadow-xs"
              >
                Yes, Delete Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD REAL TEACHER MODAL */}
      {isAddTeacherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="bg-teal-700 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <h3 className="text-sm font-bold">Add Real Verified Teacher</h3>
              </div>
              <button
                onClick={() => setIsAddTeacherOpen(false)}
                className="p-1 rounded-lg hover:bg-teal-800 text-teal-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateTeacher} className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Prefix</label>
                  <select
                    value={newPrefix}
                    onChange={(e) => setNewPrefix(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newTFirstName}
                    onChange={(e) => setNewTFirstName(e.target.value)}
                    placeholder="e.g. Rachel"
                    className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newTLastName}
                    onChange={(e) => setNewTLastName(e.target.value)}
                    placeholder="e.g. Chen"
                    className="w-full text-xs px-2.5 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newTEmail}
                  onChange={(e) => setNewTEmail(e.target.value)}
                  placeholder="teacher@school.edu"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">School / Institution</label>
                <input
                  type="text"
                  value={newTSchool}
                  onChange={(e) => setNewTSchool(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Department</label>
                <input
                  type="text"
                  value={newTDept}
                  onChange={(e) => setNewTDept(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddTeacherOpen(false)}
                  className="px-3 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors shadow-xs"
                >
                  Create Teacher Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CLASS MODAL */}
      {isAddClassOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="bg-indigo-700 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <School className="w-5 h-5" />
                <h3 className="text-sm font-bold">Create New Class Cohort</h3>
              </div>
              <button
                onClick={() => setIsAddClassOpen(false)}
                className="p-1 rounded-lg hover:bg-indigo-800 text-indigo-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateClass} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Class Name *</label>
                <input
                  type="text"
                  required
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. Honors Biotechnology II (Period 3)"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Grade Level</label>
                <input
                  type="text"
                  value={newGradeLevel}
                  onChange={(e) => setNewGradeLevel(e.target.value)}
                  placeholder="e.g. 11th - 12th Grade"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Assign Teacher</label>
                <select
                  value={newAssignedTeacher}
                  onChange={(e) => setNewAssignedTeacher(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="">Select Instructor...</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.prefix ? `${t.prefix} ` : ''}{t.first_name} {t.last_name} ({t.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddClassOpen(false)}
                  className="px-3 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-xs"
                >
                  Create Class Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TRANSFER STUDENT MODAL */}
      {studentToTransfer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ArrowRightLeft className="w-5 h-5" />
                <h3 className="text-sm font-bold">Transfer Student Period</h3>
              </div>
              <button
                onClick={() => setStudentToTransfer(null)}
                className="p-1 rounded-lg hover:bg-blue-700 text-blue-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                <div className="font-bold text-slate-800">
                  {studentToTransfer.profile.first_name} {studentToTransfer.profile.last_name}
                </div>
                <div className="text-slate-500 font-mono text-[11px]">{studentToTransfer.profile.email}</div>
                <div className="text-slate-600 mt-1">
                  Current Class:{' '}
                  <span className="font-semibold text-slate-800">
                    {classes.find((c) => c.id === studentToTransfer.class_id)?.name || 'Unassigned'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Destination Period / Class
                </label>
                <select
                  value={targetTransferClassId}
                  onChange={(e) => setTargetTransferClassId(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.period || 'Class'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStudentToTransfer(null)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (targetTransferClassId) {
                      transferStudentPeriod(studentToTransfer.profile.id, targetTransferClassId);
                      setStudentToTransfer(null);
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Confirm Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE STUDENT MODAL REUSE */}
      <CreateStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
      />
    </div>
  );
};
