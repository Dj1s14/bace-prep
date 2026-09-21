import React from 'react';
import { CheckCircle2, Award, Clock, AlertTriangle, CircleDashed } from 'lucide-react';
import { getMasteryDetails } from '../../types/database';

interface MasteryBadgeProps {
  percentage: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MasteryBadge: React.FC<MasteryBadgeProps> = ({
  percentage,
  showPercentage = true,
  size = 'md',
  className = '',
}) => {
  const details = getMasteryDetails(percentage);

  const getIcon = () => {
    switch (details.level) {
      case 'Mastered':
        return <Award className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />;
      case 'BACE Ready':
        return <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />;
      case 'Developing':
        return <Clock className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />;
      case 'Needs Review':
        return <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />;
      case 'Not Started':
        return <CircleDashed className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />;
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${details.badgeBg} ${sizeClasses[size]} ${className}`}
      title={`${details.level}: ${percentage}%`}
      aria-label={`Mastery Level: ${details.level}, ${percentage} percent`}
    >
      {getIcon()}
      <span>{details.level}</span>
      {showPercentage && (
        <span className="font-semibold opacity-90">({percentage}%)</span>
      )}
    </span>
  );
};
