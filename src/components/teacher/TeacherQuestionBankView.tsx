import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  HelpCircle,
  X,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';

export const TeacherQuestionBankView: React.FC = () => {
  const { questions, domains, topics, lessons, createQuestion } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<string>('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 25;
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Question Form state
  const [formDomainId, setFormDomainId] = useState(domains[0]?.id || 'd1');
  const [formTopicId, setFormTopicId] = useState('t1_1');
  const [formDifficulty, setFormDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [formQuestionText, setFormQuestionText] = useState('');
  const [choiceA, setChoiceA] = useState('');
  const [choiceB, setChoiceB] = useState('');
  const [choiceC, setChoiceC] = useState('');
  const [choiceD, setChoiceD] = useState('');
  const [correctChoiceIndex, setCorrectChoiceIndex] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState('');

  // Filtered list
  const filteredQuestions = questions.filter((q) => {
    if (selectedDomainFilter !== 'all' && q.domain_id !== selectedDomainFilter) return false;
    if (selectedLessonFilter !== 'all') {
      if (selectedLessonFilter === 'general_domain') {
        if (q.lesson_id) return false;
      } else if (q.lesson_id !== selectedLessonFilter) {
        return false;
      }
    }
    if (selectedDifficultyFilter !== 'all') {
      if (selectedDifficultyFilter === 'Medium' || selectedDifficultyFilter === 'Moderate') {
        if (q.difficulty !== 'Medium' && q.difficulty !== 'Moderate') return false;
      } else if (selectedDifficultyFilter === 'Hard' || selectedDifficultyFilter === 'Difficult') {
        if (q.difficulty !== 'Hard' && q.difficulty !== 'Difficult') return false;
      } else if (q.difficulty !== selectedDifficultyFilter) {
        return false;
      }
    }
    if (searchQuery) {
      const qText = q.question_text.toLowerCase();
      const exp = q.explanation.toLowerCase();
      const s = searchQuery.toLowerCase();
      if (!qText.includes(s) && !exp.includes(s)) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestionText.trim() || !choiceA.trim() || !choiceB.trim() || !choiceC.trim() || !choiceD.trim()) {
      return;
    }

    const choices = [
      { id: `ch_${Date.now()}_a`, choice_text: choiceA, is_correct: correctChoiceIndex === 0 },
      { id: `ch_${Date.now()}_b`, choice_text: choiceB, is_correct: correctChoiceIndex === 1 },
      { id: `ch_${Date.now()}_c`, choice_text: choiceC, is_correct: correctChoiceIndex === 2 },
      { id: `ch_${Date.now()}_d`, choice_text: choiceD, is_correct: correctChoiceIndex === 3 },
    ];

    createQuestion({
      domain_id: formDomainId,
      topic_id: formTopicId,
      question_text: formQuestionText,
      difficulty: formDifficulty,
      choices,
      explanation: formExplanation || 'Verified against standard BACE credentialing specifications.',
    });

    // Reset
    setFormQuestionText('');
    setChoiceA('');
    setChoiceB('');
    setChoiceC('');
    setChoiceD('');
    setFormExplanation('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <Database className="w-3.5 h-3.5 text-teal-600" />
            <span>Curricular Assessment Item Bank</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            BACE Question Repository
          </h1>
          <p className="text-sm text-slate-600">
            Search, review, filter, and author credentialing exam items across all eight core competency domains.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Author New Question</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search keywords, calculations, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
          />
        </div>

        {/* Dropdowns for Domain, Lesson & Difficulty */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <select
            value={selectedDomainFilter}
            onChange={(e) => {
              setSelectedDomainFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600"
          >
            <option value="all">All Eight Domains</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            value={selectedLessonFilter}
            onChange={(e) => {
              setSelectedLessonFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600"
          >
            <option value="all">All Lesson Question Banks</option>
            {lessons.map((l) => {
              const lCount = questions.filter((q) => q.lesson_id === l.id).length;
              return (
                <option key={l.id} value={l.id}>
                  Lesson: {l.title.split(':')[0]} ({lCount} Qs)
                </option>
              );
            })}
            <option value="general_domain">General Domain Items Only</option>
          </select>

          <select
            value={selectedDifficultyFilter}
            onChange={(e) => {
              setSelectedDifficultyFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>

          <span className="text-xs text-slate-700 ml-auto lg:ml-2 font-bold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {filteredQuestions.length} Total Items Available
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {paginatedQuestions.map((q, qIndex) => {
          const domain = domains.find((d) => d.id === q.domain_id);
          const topic = topics.find((t) => t.id === q.topic_id);
          const lesson = lessons.find((l) => l.id === q.lesson_id);
          const itemNumber = (currentPage - 1) * pageSize + qIndex + 1;

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              {/* Question Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                    Item #{itemNumber}
                  </span>
                  <span className="font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-100">
                    {domain?.name || 'Biotechnology'}
                  </span>
                  {lesson && (
                    <span className="font-semibold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                      Lesson: {lesson.title.split(':')[0]}
                    </span>
                  )}
                  {topic && (
                    <span className="text-slate-500 hidden sm:inline-block">
                      • {topic.name}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    q.difficulty === 'Hard' || q.difficulty === 'Difficult'
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : q.difficulty === 'Medium' || q.difficulty === 'Moderate'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {q.difficulty}
                </span>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                {q.question_text}
              </div>

              {/* Choices Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.choices.map((choice, cIndex) => {
                  const letter = String.fromCharCode(65 + cIndex);
                  return (
                    <div
                      key={choice.id}
                      className={`p-3 rounded-xl border text-xs flex items-center space-x-2.5 ${
                        choice.is_correct
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 ${
                          choice.is_correct ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 leading-snug">{choice.choice_text}</span>
                      {choice.is_correct && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block">Explanation & Rubric:</span>
                <p className="leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No questions match your current search and filter criteria.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-600">
            Showing <span className="font-bold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-bold text-slate-900">
              {Math.min(currentPage * pageSize, filteredQuestions.length)}
            </span>{' '}
            of <span className="font-bold text-slate-900">{filteredQuestions.length}</span> questions
          </div>

          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-700 font-semibold"
            >
              Previous
            </button>
            <span className="text-slate-700 font-semibold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-700 font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Create Question Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-teal-700" />
                <h2 className="text-lg font-bold text-slate-900">Author New BACE Question</h2>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Domain */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    BACE Domain
                  </label>
                  <select
                    value={formDomainId}
                    onChange={(e) => setFormDomainId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {domains.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Topic / Sub-unit
                  </label>
                  <select
                    value={formTopicId}
                    onChange={(e) => setFormTopicId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {topics
                      .filter((t) => t.domain_id === formDomainId)
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) =>
                      setFormDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Question Stem / Scenario
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter the complete question text or clinical laboratory scenario..."
                  value={formQuestionText}
                  onChange={(e) => setFormQuestionText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              {/* Answer Choices & Radio for Correct Answer */}
              <div className="space-y-2.5">
                <label className="block font-semibold text-slate-700">
                  Answer Choices (Select radio button for the single correct answer)
                </label>

                {[
                  { label: 'A', value: choiceA, setter: setChoiceA, index: 0 },
                  { label: 'B', value: choiceB, setter: setChoiceB, index: 1 },
                  { label: 'C', value: choiceC, setter: setChoiceC, index: 2 },
                  { label: 'D', value: choiceD, setter: setChoiceD, index: 3 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={correctChoiceIndex === item.index}
                      onChange={() => setCorrectChoiceIndex(item.index)}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="w-5 font-bold text-slate-700">{item.label}.</span>
                    <input
                      type="text"
                      required
                      placeholder={`Choice ${item.label} text...`}
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                ))}
              </div>

              {/* Explanation */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Correct Answer Explanation & Laboratory Rationale
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explain why the correct choice is accurate and common misconceptions with distractor choices..."
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold shadow-xs"
                >
                  Save to Question Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
