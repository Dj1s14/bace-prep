import React, { useState } from 'react';
import { LabActivityScenario } from '../../types/database';
import {
  FlaskConical,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface LessonLabActivitiesProps {
  activities: LabActivityScenario[];
  lessonTitle: string;
}

export const LessonLabActivities: React.FC<LessonLabActivitiesProps> = ({
  activities,
  lessonTitle
}) => {
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
        <FlaskConical className="w-8 h-8 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">Laboratory Troubleshooting Scenarios</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Laboratory decision challenges for this lesson are woven directly into the comprehensive question drills.
        </p>
      </div>
    );
  }

  const handleSelectOption = (actId: string, optId: string) => {
    if (submitted[actId]) return;
    setSelectedChoices((prev) => ({ ...prev, [actId]: optId }));
  };

  const handleSubmitScenario = (actId: string) => {
    if (!selectedChoices[actId]) return;
    setSubmitted((prev) => ({ ...prev, [actId]: true }));
  };

  const handleResetAll = () => {
    setSelectedChoices({});
    setSubmitted({});
  };

  const totalSubmitted = Object.keys(submitted).length;
  const totalCorrect = activities.reduce((acc, act) => {
    if (!submitted[act.id]) return acc;
    const chosen = act.options.find((o) => o.id === selectedChoices[act.id]);
    return chosen?.is_correct ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl p-6 border border-blue-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-800">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            <span>Interactive Bench Decision Challenges</span>
          </div>
          {totalSubmitted > 0 && (
            <div className="text-xs font-bold text-blue-700 bg-white px-3 py-1 rounded-full border border-blue-200 shadow-2xs">
              {totalCorrect} / {activities.length} Completed Correctly
            </div>
          )}
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Test your technician judgment in real-world situations: analyze out-of-specification controls, deviation events, equipment anomalies, and select compliant actions.
        </p>
      </div>

      {/* Activity List */}
      <div className="space-y-6">
        {activities.map((act, idx) => {
          const isSubmitted = submitted[act.id];
          const selectedOptId = selectedChoices[act.id];
          const selectedOption = act.options.find((o) => o.id === selectedOptId);
          const isCorrect = selectedOption?.is_correct ?? false;

          return (
            <div
              key={act.id}
              className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 shadow-xs'
                    : 'border-rose-300 shadow-xs'
                  : 'border-slate-200 shadow-2xs'
              }`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{act.title}</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  {act.bace_competency}
                </span>
              </div>

              {/* Scenario Description */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 leading-relaxed font-medium mb-5">
                {act.scenario}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5 mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Choose the Correct Technician Action:
                </div>
                {act.options.map((opt) => {
                  const isSelected = selectedOptId === opt.id;
                  let optStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/70';

                  if (isSubmitted) {
                    if (opt.is_correct) {
                      optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium';
                    } else if (isSelected && !opt.is_correct) {
                      optStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                    } else {
                      optStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-blue-50 border-blue-500 text-blue-900 shadow-2xs font-medium';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(act.id, opt.id)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all flex items-start space-x-3 ${optStyle}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isSubmitted ? (
                          opt.is_correct ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isSelected ? (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-300" />
                          )
                        ) : (
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">{opt.text}</div>
                    </button>
                  );
                })}
              </div>

              {/* Action Bar / Submit Button */}
              {!isSubmitted ? (
                <button
                  onClick={() => handleSubmitScenario(act.id)}
                  disabled={!selectedOptId}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center space-x-2 ${
                    selectedOptId
                      ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  <span>Submit Action & Verify Rationale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                /* Post-Submission Feedback & Explanation */
                <div className="space-y-3 pt-2">
                  <div
                    className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center space-x-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Technician Decision Approved</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Incorrect Action Under Regulatory Guidelines</span>
                        </>
                      )}
                    </div>
                    <div>{selectedOption?.feedback}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs leading-relaxed space-y-1">
                    <div className="font-bold text-teal-300 uppercase tracking-wider text-[11px]">
                      BACE Compliance Rationale:
                    </div>
                    <div className="text-slate-300">{act.explanation}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalSubmitted === activities.length && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
          <Award className="w-8 h-8 text-blue-600 mx-auto" />
          <h4 className="text-base font-bold text-slate-900">
            All Laboratory Scenarios Completed!
          </h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            You achieved {totalCorrect} out of {activities.length} correct on your first attempt.
          </p>
          <button
            onClick={handleResetAll}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Troubleshooting Scenarios</span>
          </button>
        </div>
      )}
    </div>
  );
};
