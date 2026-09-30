import { requestPasswordRecovery } from '../../lib/passwordRecovery';
import React, { useState } from 'react';
import {
  School,
  Users,
  Plus,
  ArrowRight,
  TrendingUp,
  Key,
  Calendar,
  X,
  UserPlus,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  ArrowRightLeft,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Sparkles,
  Info,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MasteryBadge } from '../common/MasteryBadge';
import { StudentOverview, SchoolClass } from '../../types/database';
import { CreateStudentModal } from '../common/CreateStudentModal';

export const TeacherClassesView: React.FC = () => {
  const {
    currentTeacher,
    classes,
    students,
    createClass,
    deleteClass,
    setTeacherPage,
    setSelectedStudentId,
    environment,
    setEnvironment,
    isProduction,
    isDemo,
    resetDemoSandbox,
    demoModeEnabled,
    setDemoModeEnabled,
    purgeDemoData,
    transferStudentPeriod,
    regenerateClassJoinCode,
    deleteStudentAccount,
  } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  // Manual student enrollment modal state
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollTargetClassId, setEnrollTargetClassId] = useState<string>('');

  // Transfer Student Modal State
  const [transferringStudent, setTransferringStudent] = useState<StudentOverview | null>(null);
  const [targetClassIdForTransfer, setTargetClassIdForTransfer] = useState<string>('');

  // Remove Student Confirmation State
  const [studentToRemove, setStudentToRemove] = useState<StudentOverview | null>(null);

  // Delete Class Confirmation State
  const [classToDelete, setClassToDelete] = useState<SchoolClass | null>(null);

  // Copy join code feedback map { [code]: boolean }
  const [copiedCodeMap, setCopiedCodeMap] = useState<Record<string, boolean>>({});

  // Notification / Toast
  const [noticeMessage, setNoticeMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showNotification = (text: string, type: 'success' | 'info' = 'success') => {
    setNoticeMessage({ text, type });
    setTimeout(() => setNoticeMessage(null), 3500);
  };

  // Class creation form state
  const [name, setName] = useState('');
  const [period, setPeriod] = useState('Period 1');
  const [examDate, setExamDate] = useState('2026-05-12');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createClass({
      name,
      teacher_id: currentTeacher.id,
      period,
      school_year: '2025-2026',
      join_code: `W-${crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase()}`,
    });

    setName('');
    setShowCreateModal(false);
    showNotification('New class section created successfully.');
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeMap((prev) => ({ ...prev, [code]: true }));
      setTimeout(() => {
        setCopiedCodeMap((prev) => ({ ...prev, [code]: false }));
      }, 2000);
      showNotification(`Join code ${code} copied to clipboard.`);
    } catch {
      // Fallback
    }
  };

  const handleRegenerateCode = (classId: string) => {
    const cls = classes.find((c) => c.id === classId);
    if (!cls) return;
    const newCode = regenerateClassJoinCode(classId);
    showNotification(`Generated new join code: ${newCode} for ${cls.period}`);
  };

  const handleOpenEnrollModal = (classId?: string) => {
    setEnrollTargetClassId(classId || classes[0]?.id || '');
    setEnrollModalOpen(true);
  };

  const handleInitiateTransfer = (student: StudentOverview) => {
    setTransferringStudent(student);
    const otherClasses = classes.filter((c) => c.id !== student.class_id);
    setTargetClassIdForTransfer(otherClasses[0]?.id || '');
  };

  const handleConfirmTransfer = () => {
    if (!transferringStudent || !targetClassIdForTransfer) return;
    const targetClass = classes.find((c) => c.id === targetClassIdForTransfer);
    transferStudentPeriod(transferringStudent.profile.id, targetClassIdForTransfer);
    showNotification(
      `${transferringStudent.profile.first_name} ${transferringStudent.profile.last_name} transferred to ${targetClass?.period || 'new period'}.`
    );
    setTransferringStudent(null);
  };

  const handleInitiateResetAccess = async (student: StudentOverview) => {
    try { await requestPasswordRecovery(student.profile.email); showNotification('Recovery email requested. Ask the student to check their inbox.', 'info'); }
    catch (error: any) { showNotification(error.message, 'info'); }
  };

  const handleConfirmRemoveStudent = () => {
    if (!studentToRemove) return;
    deleteStudentAccount(studentToRemove.profile.id);
    showNotification(
      `${studentToRemove.profile.first_name} ${studentToRemove.profile.last_name} unenrolled from roster.`
    );
    setStudentToRemove(null);
  };

  const handleConfirmDeleteClass = () => {
    if (!classToDelete) return;
    const deletedClassName = classToDelete.name;
    const deletedClassPeriod = classToDelete.period;
    deleteClass(classToDelete.id);
    if (selectedClassId === classToDelete.id) {
      setSelectedClassId(null);
    }
    showNotification(`${deletedClassPeriod} (${deletedClassName}) deleted successfully.`);
    setClassToDelete(null);
  };

  const activeClass = classes.find((c) => c.id === selectedClassId);
  const classStudents = activeClass
    ? students.filter((s) => s.class_id === activeClass.id)
    : [];

  return (
    <div className="space-y-8 pb-16">
      {/* Dynamic Toast Notice */}
      {noticeMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200 ${
            noticeMessage.type === 'success'
              ? 'bg-slate-900 text-teal-300 border border-teal-500/40'
              : 'bg-slate-900 text-blue-300 border border-blue-500/40'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{noticeMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <School className="w-3.5 h-3.5 text-teal-600" />
            <span>Wagner Biomedical CTE • 6 Course Periods</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Manage Class Sections & Join Codes
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Administer all 6 class periods, maintain isolated student candidate rosters, regenerate secure access codes, and perform student transfers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleOpenEnrollModal()}
            className="inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Student Manually</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Section</span>
          </button>
        </div>
      </div>

      {/* Live Faculty Console Environment Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Official Faculty Console • Academic Roster Management
              </h2>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border font-semibold bg-emerald-950/70 text-emerald-300 border-emerald-700/60">
                Live Console
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Managing official Wagner High School Biomedical CTE class sections and rosters. All candidate profiles, drill progress, and scores are tracked directly.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active Academic Rosters</span>
            </span>
          </div>
        </div>
      </div>

      {/* Classes Grid — All 6 Class Sections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Configured Class Periods (1 through 6)</h2>
            <p className="text-xs text-slate-500">Each period possesses its own isolated roster, join code, and analytics.</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            {classes.length} Total Periods Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((cls) => {
            const enrolled = students.filter((s) => s.class_id === cls.id);
            const avgScore = enrolled.length
              ? Math.round(
                  enrolled.reduce((acc, s) => acc + s.overall_readiness, 0) / enrolled.length
                )
              : 0;
            const isCopied = copiedCodeMap[cls.join_code];

            return (
              <div
                key={cls.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-teal-300 transition-colors"
              >
                <div>
                  {/* Period tag & Join code */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                      {cls.period}
                    </span>

                    {/* Join Code Capsule & Actions */}
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center space-x-1 text-xs bg-slate-100 border border-slate-200 px-2 py-1 rounded-lg">
                        <Key className="w-3 h-3 text-slate-400" />
                        <span className="font-mono font-bold text-slate-800">{cls.join_code}</span>
                        <button
                          onClick={() => handleCopyCode(cls.join_code)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                          title="Copy Join Code"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-teal-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={() => handleRegenerateCode(cls.id)}
                          className="p-1 text-slate-400 hover:text-teal-700 rounded transition-colors cursor-pointer"
                          title="Regenerate Join Code"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => setClassToDelete(cls)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title={`Delete ${cls.period}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 min-h-[40px]">{cls.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-1">School Year: {cls.school_year}</p>

                  {/* Class metrics */}
                  <div className="grid grid-cols-2 gap-2 mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Enrolled Roster</div>
                      <div className="text-base font-extrabold text-slate-900 mt-0.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{enrolled.length} Students</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Readiness Avg</div>
                      <div className="text-base font-extrabold text-teal-700 mt-0.5 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                        <span>{avgScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelectedClassId(cls.id);
                      const el = document.getElementById('roster-drawer');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center space-x-1 text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                      selectedClassId === cls.id
                        ? 'bg-teal-700 text-white'
                        : 'text-teal-800 hover:text-teal-900 bg-teal-50 hover:bg-teal-100'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{selectedClassId === cls.id ? 'Viewing Roster' : 'Manage Roster'}</span>
                  </button>

                  <button
                    onClick={() => handleOpenEnrollModal(cls.id)}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
                    title={`Add student directly to ${cls.period}`}
                  >
                    <UserPlus className="w-3 h-3 text-teal-700" />
                    <span>+ Enroll</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class Roster Drawer / Table when a class is selected */}
      {activeClass && (
        <div
          id="roster-drawer"
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  {activeClass.period}
                </span>
                <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                  Join Code: {activeClass.join_code}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {activeClass.name} — Student Roster ({classStudents.length})
              </h2>
              <p className="text-xs text-slate-500">
                Manage enrollment, initiate period transfers, review account-reset guidance, and inspect BACE domain readiness.
              </p>
            </div>

            <div className="flex items-center space-x-2.5 self-start">
              <button
                onClick={() => handleOpenEnrollModal(activeClass.id)}
                className="inline-flex items-center space-x-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Enroll in {activeClass.period}</span>
              </button>

              <button
                onClick={() => setClassToDelete(activeClass)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-3 py-2 rounded-xl cursor-pointer transition-colors"
                title={`Delete ${activeClass.period}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Period</span>
              </button>

              <button
                onClick={() => setSelectedClassId(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl cursor-pointer transition-colors"
              >
                Close Roster
              </button>
            </div>
          </div>

          {classStudents.length === 0 ? (
            <div className="py-12 text-center rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No student candidates enrolled in {activeClass.period}</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Students can join using code <strong className="font-mono text-slate-800">{activeClass.join_code}</strong>, or you can manually enroll them using the button below.
              </p>
              <button
                onClick={() => handleOpenEnrollModal(activeClass.id)}
                className="inline-flex items-center space-x-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Student to {activeClass.period}</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Readiness Score</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Questions</th>
                    <th className="p-3">Mock Exam</th>
                    <th className="p-3 text-right">Roster Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classStudents.map((stu) => (
                    <tr key={stu.profile.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Name & ID */}
                      <td className="p-3 font-semibold text-slate-900">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-bold text-xs shrink-0">
                            {stu.profile.first_name[0]}
                            {stu.profile.last_name[0]}
                          </div>
                          <div>
                            <div className="text-slate-900">
                              {stu.profile.first_name} {stu.profile.last_name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-normal">{stu.profile.email}</div>
                            <button className="text-xs text-blue-700 underline" onClick={async () => {
                              try { await requestPasswordRecovery(stu.profile.email); showNotification('Recovery email requested. The student should check their inbox.', 'info'); }
                              catch (error: any) { showNotification(error.message, 'info'); }
                            }}>Send password recovery</button>
                          </div>
                        </div>
                      </td>

                      {/* Readiness */}
                      <td className="p-3 font-bold text-slate-900 text-sm">
                        <div className="flex items-center space-x-2">
                          <span>{stu.overall_readiness}%</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-3">
                        <MasteryBadge percentage={stu.overall_readiness} size="sm" />
                      </td>

                      {/* Questions */}
                      <td className="p-3 font-medium text-slate-700">
                        {stu.questions_attempted} practiced
                      </td>

                      {/* Mock Exam */}
                      <td className="p-3 font-medium text-slate-700">
                        {stu.mock_exam_scores && stu.mock_exam_scores.length > 0 ? (
                          <span className="font-semibold text-slate-900">{stu.mock_exam_scores[0]}%</span>
                        ) : (
                          <span className="text-slate-400">Pending</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Inspect Detail */}
                          <button
                            onClick={() => {
                              setSelectedStudentId(stu.profile.id);
                              setTeacherPage('student_detail');
                            }}
                            className="text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                            title="Inspect student analytics"
                          >
                            Inspect
                          </button>

                          {/* Transfer Period */}
                          <button
                            onClick={() => handleInitiateTransfer(stu)}
                            className="text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                            title="Transfer student to another period"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                            <span>Transfer</span>
                          </button>

                          {/* Reset Access */}
                          <button
                            onClick={() => handleInitiateResetAccess(stu)}
                            className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                            title="Send an email recovery link"
                          >
                            <Lock className="w-3 h-3" />
                            <span>Recovery email</span>
                          </button>

                          {/* Remove Student */}
                          <button
                            onClick={() => setStudentToRemove(stu)}
                            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove student from roster"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Manual Student Enrollment Modal */}
      <CreateStudentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialClassId={enrollTargetClassId}
        onCreated={(newStudentId) => {
          showNotification('Student candidate successfully enrolled in course period.');
        }}
      />

      {/* Transfer Period Modal */}
      {transferringStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Transfer Student Period</h3>
                  <p className="text-xs text-slate-500">Move candidate to another class period</p>
                </div>
              </div>
              <button
                onClick={() => setTransferringStudent(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 space-y-1">
              <div>
                <strong>Candidate:</strong> {transferringStudent.profile.first_name}{' '}
                {transferringStudent.profile.last_name} ({transferringStudent.profile.email})
              </div>
              <div>
                <strong>Current Period:</strong>{' '}
                {classes.find((c) => c.id === transferringStudent.class_id)?.period || 'Period 1'}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Course Period *
              </label>
              <select
                value={targetClassIdForTransfer}
                onChange={(e) => setTargetClassIdForTransfer(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {classes.map((cls) => (
                  <option
                    key={cls.id}
                    value={cls.id}
                    disabled={cls.id === transferringStudent.class_id}
                  >
                    {cls.period} — {cls.name} {cls.id === transferringStudent.class_id ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTransferringStudent(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmTransfer}
                className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm Transfer</span>
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Remove Student Confirmation Modal */}
      {studentToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-red-600">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Unenroll Student Candidate</h3>
                <p className="text-xs text-slate-500">Remove from official course period</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove{' '}
              <strong>
                {studentToRemove.profile.first_name} {studentToRemove.profile.last_name}
              </strong>{' '}
              ({studentToRemove.profile.email}) from this course period? Their individual practice records and readiness baseline will be cleared.
            </p>

            <div className="flex items-center justify-end space-x-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStudentToRemove(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRemoveStudent}
                className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Unenroll</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Class Section Confirmation Modal */}
      {classToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Delete Class Period Section</h3>
                <p className="text-xs text-slate-500">Remove course period from Wagner CTE</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">{classToDelete.period} — {classToDelete.name}</strong> (Join Code: <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">{classToDelete.join_code}</code>)?
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed bg-amber-50 p-2.5 rounded-xl border border-amber-200/70 text-amber-800">
              Any students currently enrolled in this period will have their class section unassigned so they can re-enroll or be transferred to another period.
            </p>

            <div className="flex items-center justify-end space-x-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setClassToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteClass}
                className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete Section</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Class Section Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <School className="w-5 h-5 text-teal-700" />
                <h2 className="text-base font-bold text-slate-900">Create Course Period Section</h2>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Course Title & Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Period 1 — PLTW Principles of Biomedical Science (PBS)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Class Period Assignment *
                </label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 bg-white text-xs"
                >
                  <option value="Period 1">Period 1</option>
                  <option value="Period 2">Period 2</option>
                  <option value="Period 3">Period 3</option>
                  <option value="Period 4">Period 4</option>
                  <option value="Period 5">Period 5</option>
                  <option value="Period 6">Period 6</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target BACE Exam Date
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-600 text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold shadow-xs cursor-pointer"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
