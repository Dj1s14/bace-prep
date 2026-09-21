import React from 'react';
import {
  Award,
  ShieldCheck,
  FlaskConical,
  Pipette,
  CheckCircle,
  FileCheck,
  Calculator,
  Flame,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AchievementsView: React.FC = () => {
  const { achievements, completedLessonIds, overallReadiness } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
      case 'ShieldAlert':
        return ShieldCheck;
      case 'FlaskConical':
        return FlaskConical;
      case 'Pipette':
        return Pipette;
      case 'CheckCircle':
        return CheckCircle;
      case 'FileCheck':
        return FileCheck;
      case 'Calculator':
        return Calculator;
      case 'Flame':
        return Flame;
      case 'Award':
      default:
        return Award;
    }
  };

  const isUnlocked = (badgeId: string) => {
    if (badgeId === 'ach_pipette' && completedLessonIds.includes('les_pipette')) return true;
    if (badgeId === 'ach_safety') return true;
    if (badgeId === 'ach_dilution' && overallReadiness >= 70) return true;
    if (badgeId === 'ach_data' && overallReadiness >= 80) return true;
    return false;
  };

  const unlockedCount = achievements.filter((a) => isUnlocked(a.id)).length;

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Badges & Competency Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Earned BACE Badges
          </h1>
          <p className="text-sm text-slate-600">
            Earn credentialing badges by demonstrating mastery in safety, equipment, mathematics, and mock exams.
          </p>
        </div>

        {/* Badge Progress counter */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 text-center min-w-[200px]">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Badges Unlocked
          </div>
          <div className="text-3xl font-extrabold text-blue-700 mt-1">
            {unlockedCount} / {achievements.length}
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / Math.max(1, achievements.length)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map((badge) => {
          const Icon = getIcon(badge.icon);
          const unlocked = isUnlocked(badge.id);

          return (
            <div
              key={badge.id}
              className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                unlocked
                  ? 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                  : 'bg-slate-50/60 border-slate-200/80 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      unlocked
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {unlocked ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Earned</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1">
                  {badge.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {badge.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                {unlocked ? (
                  <span className="text-emerald-700 font-medium">
                    Earned Milestone
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium">
                    In progress towards goal
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
