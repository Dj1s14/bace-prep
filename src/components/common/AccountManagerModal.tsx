import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Check,
  Building2,
  Mail,
  Calendar,
  School,
  IdCard,
  Sparkles,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AccountManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'switch' | 'create_teacher' | 'create_student';
}

export const AccountManagerModal: React.FC<AccountManagerModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'switch',
}) => {
  const {
    role,
    setRole,
    teachers,
    activeTeacherId,
    setActiveTeacherId,
    createTeacherAccount,
    deleteTeacherAccount,
    students,
    activeStudentId,
    setActiveStudentId,
    createStudentAccount,
    deleteStudentAccount,
    classes,
    setTeacherPage,
    setStudentPage,
    isProduction,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'switch' | 'create_teacher' | 'create_student'>(isProduction ? 'switch' : defaultTab);

  // Teacher Form State
  const [tPrefix, setTPrefix] = useState('Dr.');
  const [tFirstName, setTFirstName] = useState('');
  const [tLastName, setTLastName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tSchool, setTSchool] = useState('Biotechnology & Life Sciences Academy');
  const [tDepartment, setTDepartment] = useState('CTE Biomedical Science');
  const [tInitialClass, setTInitialClass] = useState('Period 1 — Biotechnology I');
  const [teacherSuccessMsg, setTeacherSuccessMsg] = useState<string | null>(null);

  // Student Form State
  const [sFirstName, setSFirstName] = useState('');
  const [sLastName, setSLastName] = useState('');
  const [sEmail, setSEmail] = useState('');
  const [sStudentNumber, setSStudentNumber] = useState('');
  const [sClassId, setSClassId] = useState(classes[0]?.id || '');
  const [sSchool, setSSchool] = useState('');
  const [sExamDate, setSExamDate] = useState('2026-05-12');
  const [studentSuccessMsg, setStudentSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tFirstName.trim() || !tLastName.trim() || !tEmail.trim()) return;

    const newTeacher = createTeacherAccount({
      prefix: tPrefix,
      first_name: tFirstName.trim(),
      last_name: tLastName.trim(),
      email: tEmail.trim(),
      school_name: tSchool.trim(),
      department: tDepartment.trim(),
      initial_class_name: tInitialClass.trim(),
    });

    setRole('teacher');
    setTeacherPage('dashboard');
    setTeacherSuccessMsg(`Teacher account created for ${tPrefix ? `${tPrefix} ` : ''}${newTeacher.last_name}!`);
    
    // Clear form
    setTFirstName('');
    setTLastName('');
    setTEmail('');

    setTimeout(() => {
      setTeacherSuccessMsg(null);
      onClose();
    }, 1200);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sFirstName.trim() || !sLastName.trim() || !sEmail.trim()) return;

    const newStudent = createStudentAccount({
      first_name: sFirstName.trim(),
      last_name: sLastName.trim(),
      email: sEmail.trim(),
      student_number: sStudentNumber.trim() || undefined,
      class_id: sClassId || classes[0]?.id || '',
      school_name: sSchool.trim() || undefined,
      target_exam_date: sExamDate,
    });

    setStudentSuccessMsg(`Student account created for ${newStudent.profile.first_name} ${newStudent.profile.last_name}!`);
    
    // If user is currently in student mode or wants to switch:
    if (role === 'student') {
      setStudentPage('dashboard');
    }

    // Clear form
    setSFirstName('');
    setSLastName('');
    setSEmail('');
    setSStudentNumber('');

    setTimeout(() => {
      setStudentSuccessMsg(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-[#0B192C] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Account & Profile Manager</h2>
              <p className="text-xs text-slate-400">
                Manage and switch between real teacher accounts and student profiles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('switch')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'switch'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Switch Account ({teachers.length + students.length})</span>
          </button>

          {!isProduction && <button
            onClick={() => setActiveTab('create_teacher')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'create_teacher'
                ? 'border-teal-600 text-teal-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4 text-teal-600" />
            <span>+ Create Demo Teacher</span>
          </button>}

          {!isProduction && <button
            onClick={() => setActiveTab('create_student')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'create_student'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>+ Create Demo Student</span>
          </button>}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isProduction && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
              Create student accounts from the student roster. Administrators can create teacher accounts from Teacher Management. Students can also self-register with a class join code.
            </div>
          )}
          {/* TAB 1: SWITCH ACCOUNT */}
          {activeTab === 'switch' && (
            <div className="space-y-6">
              {/* Teacher Accounts Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-teal-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Real Teacher Accounts ({teachers.length})
                    </h3>
                  </div>
                  {!isProduction && (
                    <button
                      onClick={() => setActiveTab('create_teacher')}
                      className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Demo Teacher</span>
                    </button>
                  )}
                </div>

                {teachers.length === 0 ? (
                  <div className="bg-teal-50/60 border border-teal-200 rounded-xl p-4 text-center space-y-2">
                    <p className="text-xs text-teal-900 font-medium">
                      No real teacher accounts created yet.
                    </p>
                    {!isProduction && (
                      <button
                        onClick={() => setActiveTab('create_teacher')}
                        className="inline-flex items-center space-x-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create Demo Teacher</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {teachers.map((t) => {
                      const isActive = role === 'teacher' && activeTeacherId === t.id;
                      const teacherClasses = classes.filter((c) => c.teacher_id === t.id);

                      return (
                        <div
                          key={t.id}
                          className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                            isActive
                              ? 'border-teal-500 bg-teal-50/40 ring-2 ring-teal-500/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                              {t.first_name[0] || 'T'}{t.last_name[0] || ''}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-slate-900 truncate">
                                  {t.prefix ? `${t.prefix} ` : ''}{t.first_name} {t.last_name}
                                </span>
                                {isActive && (
                                  <span className="text-[10px] uppercase font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200">
                                    Active Teacher
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 truncate flex items-center gap-2 mt-0.5">
                                <span>{t.email}</span>
                                <span>•</span>
                                <span>{t.school_name}</span>
                                {teacherClasses.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span>{teacherClasses.length} {teacherClasses.length === 1 ? 'Class' : 'Classes'}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={() => {
                                setActiveTeacherId(t.id);
                                setRole('teacher');
                                setTeacherPage('dashboard');
                                onClose();
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                                isActive
                                  ? 'bg-teal-600 text-white cursor-default'
                                  : 'bg-slate-100 text-slate-700 hover:bg-teal-600 hover:text-white'
                              }`}
                            >
                              {isActive ? <Check className="w-3.5 h-3.5" /> : null}
                              <span>{isActive ? 'Current' : 'Switch To'}</span>
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete teacher account for ${t.first_name} ${t.last_name}?`)) {
                                  deleteTeacherAccount(t.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Teacher Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Student Accounts Section */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Real Student Accounts ({students.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('create_student')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Student</span>
                  </button>
                </div>

                {students.length === 0 ? (
                  <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 text-center space-y-2">
                    <p className="text-xs text-blue-900 font-medium">
                      No real students registered yet.
                    </p>
                    <button
                      onClick={() => setActiveTab('create_student')}
                      className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Student Account</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {students.map((s) => {
                      const isActive = role === 'student' && activeStudentId === s.profile.id;
                      const studentClass = classes.find((c) => c.id === s.class_id);

                      return (
                        <div
                          key={s.profile.id}
                          className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                            isActive
                              ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                              {s.profile.first_name[0] || 'S'}{s.profile.last_name[0] || ''}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-slate-900 truncate">
                                  {s.profile.first_name} {s.profile.last_name}
                                </span>
                                <span className="text-xs font-bold text-blue-600">
                                  {s.overall_readiness}% Readiness
                                </span>
                                {isActive && (
                                  <span className="text-[10px] uppercase font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                                    Active Student
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 truncate flex items-center gap-2 mt-0.5">
                                <span>{s.profile.email}</span>
                                <span>•</span>
                                <span>{studentClass ? studentClass.name : 'Unassigned'}</span>
                                <span>•</span>
                                <span>{s.questions_attempted} Qs Attempted</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={() => {
                                setActiveStudentId(s.profile.id);
                                setRole('student');
                                setStudentPage('dashboard');
                                onClose();
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                                isActive
                                  ? 'bg-blue-600 text-white cursor-default'
                                  : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                              }`}
                            >
                              {isActive ? <Check className="w-3.5 h-3.5" /> : null}
                              <span>{isActive ? 'Current' : 'Switch To'}</span>
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete student profile for ${s.profile.first_name} ${s.profile.last_name}?`)) {
                                  deleteStudentAccount(s.profile.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Student Profile"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CREATE REAL TEACHER ACCOUNT */}
          {activeTab === 'create_teacher' && (
            <form onSubmit={handleCreateTeacher} className="space-y-4">
              {teacherSuccessMsg && (
                <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold rounded-lg flex items-center space-x-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>{teacherSuccessMsg}</span>
                </div>
              )}

              <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-3.5 text-xs text-teal-900">
                Create a real instructor profile for managing classrooms, reviewing student readiness analytics, creating assignments, and grading BACE competencies.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Prefix / Title
                  </label>
                  <select
                    value={tPrefix}
                    onChange={(e) => setTPrefix(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="">None</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David"
                    value={tFirstName}
                    onChange={(e) => setTFirstName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jones"
                    value={tLastName}
                    onChange={(e) => setTLastName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. teacher@school.edu"
                    value={tEmail}
                    onChange={(e) => setTEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    School / Institution *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lincoln Science Academy"
                      value={tSchool}
                      onChange={(e) => setTSchool(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department / Focus
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CTE Biomedical Science"
                    value={tDepartment}
                    onChange={(e) => setTDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Classroom Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Period 1 — Biotechnology I (Honors)"
                  value={tInitialClass}
                  onChange={(e) => setTInitialClass(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  We'll automatically set up this class roster with a join code so students can enroll.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('switch')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1.5 transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Create Teacher Account</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: CREATE REAL STUDENT ACCOUNT */}
          {activeTab === 'create_student' && (
            <form onSubmit={handleCreateStudent} className="space-y-4">
              {studentSuccessMsg && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold rounded-lg flex items-center space-x-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>{studentSuccessMsg}</span>
                </div>
              )}

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-900">
                Enroll a real student with individualized tracking across all 8 BACE domains, practice quizzes, and full-length exam simulations.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan"
                    value={sFirstName}
                    onChange={(e) => setSFirstName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Miller"
                    value={sLastName}
                    onChange={(e) => setSLastName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@school.edu"
                      value={sEmail}
                      onChange={(e) => setSEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student ID / Number (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. BIO-2026-042"
                      value={sStudentNumber}
                      onChange={(e) => setSStudentNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <IdCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enrolled Class *
                  </label>
                  <select
                    value={sClassId}
                    onChange={(e) => setSClassId(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} ({cls.period})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target BACE Exam Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={sExamDate}
                      onChange={(e) => setSExamDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('switch')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1.5 transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Create Real Student</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
