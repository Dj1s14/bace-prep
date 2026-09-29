import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  ListChecks,
  RotateCcw,
  Sparkles,
  Target,
} from 'lucide-react';
import { Lesson } from '../../types/database';

interface LessonStudyToolkitProps {
  lesson: Lesson;
}

export const LessonStudyToolkit: React.FC<LessonStudyToolkitProps> = ({ lesson }) => {
  const [revealedCards, setRevealedCards] = useState<Record<number, boolean>>({});
  const [revealedPrompts, setRevealedPrompts] = useState<Record<number, boolean>>({});

  const studyTargets = useMemo(
    () =>
      lesson.important_concepts?.length
        ? lesson.important_concepts.slice(0, 8)
        : [lesson.description],
    [lesson]
  );

  const examTraps = useMemo(
    () =>
      lesson.common_mistakes?.length
        ? lesson.common_mistakes.slice(0, 6)
        : [
            'Skipping required verification steps.',
            'Using the wrong unit, control, setting, or sequence.',
            'Accepting a result without confirming validity.',
          ],
    [lesson]
  );

  const teachBackPrompts = useMemo(
    () =>
      studyTargets.slice(0, 5).map((concept, index) => ({
        prompt:
          index === 0
            ? `Explain ${concept} in your own words without looking at your notes.`
            : `How would you recognize, apply, or troubleshoot this idea at the bench: ${concept}`,
        answer: concept,
      })),
    [studyTargets]
  );

  const resetRecall = () => {
    setRevealedCards({});
    setRevealedPrompts({});
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-50 via-blue-50 to-teal-50 rounded-2xl border border-violet-200 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-800">
              <Brain className="w-4 h-4" />
              <span>High-Yield BACE Study Sheet</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2">Know it, explain it, apply it, troubleshoot it.</h2>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed max-w-3xl">
              Use this page for active recall before reading the full lesson again. The goal is to move beyond recognition and prove that you can explain the concept, identify the correct bench action, and avoid common exam traps.
            </p>
          </div>
          <button
            type="button"
            onClick={resetRecall}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Recall
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">What You Must Be Able to Do</h3>
          </div>
          <ul className="space-y-3">
            {studyTargets.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Exam Traps & Common Mistakes</h3>
          </div>
          <div className="space-y-2.5">
            {examTraps.map((item, index) => (
              <div key={index} className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-sm text-amber-950 leading-relaxed">
                <span className="font-bold mr-2">Trap {index + 1}:</span>{item}
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              BACE focus
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{lesson.bace_exam_tip}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <h3 className="text-base font-bold text-slate-900">Rapid-Recall Vocabulary</h3>
          </div>
          <span className="text-[11px] text-slate-500">Try to define each term before revealing it.</span>
        </div>

        {lesson.key_vocabulary?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.key_vocabulary.map((item, index) => {
              const revealed = !!revealedCards[index];
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setRevealedCards((prev) => ({ ...prev, [index]: !prev[index] }))}
                  className="text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors min-h-[105px]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-blue-800">{item.term}</span>
                    {revealed ? <Eye className="w-4 h-4 text-blue-500" /> : <Brain className="w-4 h-4 text-slate-400" />}
                  </div>
                  <div className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {revealed ? item.definition : 'Say the definition out loud, then click to check yourself.'}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Vocabulary review is integrated into the lesson concepts.</p>
        )}
      </div>

      {lesson.worked_examples && lesson.worked_examples.length > 0 && (
        <div className="bg-white rounded-2xl border border-teal-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">Worked Examples</h3>
          </div>
          <div className="space-y-4">
            {lesson.worked_examples.map((example, index) => (
              <div key={index} className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                <div className="text-sm font-bold text-slate-900">{example.title}</div>
                <div className="text-xs text-slate-600 mt-2 leading-relaxed">{example.scenario}</div>
                {example.calculation && (
                  <div className="mt-3 p-3 rounded-lg bg-white border border-teal-100 font-mono text-xs text-slate-800">
                    {example.calculation}
                  </div>
                )}
                <div className="mt-3 text-xs text-teal-900 leading-relaxed">
                  <span className="font-bold">Solution:</span> {example.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">Teach-It-Back Challenge</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          If you can explain these without notes, you are much closer to exam-ready recall.
        </p>
        <div className="space-y-3">
          {teachBackPrompts.map((item, index) => {
            const revealed = !!revealedPrompts[index];
            return (
              <div key={index} className="rounded-xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setRevealedPrompts((prev) => ({ ...prev, [index]: !prev[index] }))}
                  className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-700">Recall Prompt {index + 1}</div>
                    <div className="text-sm font-medium text-slate-800 mt-1">{item.prompt}</div>
                  </div>
                  {revealed ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>
                {revealed && (
                  <div className="p-4 border-t border-slate-200 text-xs text-slate-700 leading-relaxed bg-white">
                    <span className="font-bold text-emerald-800">Key idea to include:</span> {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-950 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <ListChecks className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold">Recommended Study Path</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            ['1', 'Preview', 'Read the targets and BACE exam tip first.'],
            ['2', 'Recall', 'Define vocabulary before revealing the answers.'],
            ['3', 'Learn', 'Work through the full theory sections and examples.'],
            ['4', 'Apply', 'Use the Bench Guide and troubleshooting scenarios.'],
            ['5', 'Test', 'Complete the question drill without notes.'],
            ['6', 'Master', 'Repeat missed concepts until you can explain them at 100%.'],
          ].map(([number, title, text]) => (
            <div key={number} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-800 flex items-center justify-center text-xs font-bold">
                  {number}
                </span>
                <span className="text-sm font-bold text-white">{title}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-emerald-950">Ready-to-test rule</div>
            <p className="text-xs text-emerald-900/80 leading-relaxed mt-1">
              Move to the drill when you can define the vocabulary, explain the key concepts without notes, identify the common mistakes, and describe what a valid result should look like.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
