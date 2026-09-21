import React from 'react';
import {
  Pipette,
  Dna,
  ShieldAlert,
  Calculator,
  Atom,
  FileCheck2,
  Wrench,
  BarChart3,
  Award,
  BookOpen,
  FlaskConical,
  Microscope,
  HelpCircle,
} from 'lucide-react';

interface DomainIconProps {
  name: string;
  className?: string;
}

export const DomainIcon: React.FC<DomainIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name.toLowerCase()) {
    case 'pipette':
      return <Pipette className={className} />;
    case 'dna':
      return <Dna className={className} />;
    case 'shieldalert':
    case 'shield':
    case 'safety':
      return <ShieldAlert className={className} />;
    case 'calculator':
    case 'math':
      return <Calculator className={className} />;
    case 'atom':
    case 'biochemistry':
      return <Atom className={className} />;
    case 'filecheck2':
    case 'quality':
    case 'regulation':
      return <FileCheck2 className={className} />;
    case 'wrench':
    case 'equipment':
      return <Wrench className={className} />;
    case 'barchart3':
    case 'chart':
    case 'data':
      return <BarChart3 className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'flask':
      return <FlaskConical className={className} />;
    case 'microscope':
      return <Microscope className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};
