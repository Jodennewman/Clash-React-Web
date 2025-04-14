import React from 'react';
import { 
  X, ChevronRight, Check, Info, Calendar, CheckCircle, Moon, Sun,
  Users, Compass, Clock, BarChart4, Mail, Award, Briefcase
} from 'lucide-react';

interface StageIconProps {
  stage: string;
  className?: string;
  size?: number;
}

const StageIcon: React.FC<StageIconProps> = ({ stage, className = '', size = 24 }) => {
  switch (stage) {
    case 'intro':
      return <Compass className={className} size={size} />;
    case 'teamSize':
      return <Users className={className} size={size} />;
    case 'implementationSupport':
      return <Briefcase className={className} size={size} />;
    case 'timeline':
      return <Clock className={className} size={size} />;
    case 'contentVolume':
      return <BarChart4 className={className} size={size} />;
    case 'contact':
      return <Mail className={className} size={size} />;
    case 'analysis':
      return <BarChart4 className={className} size={size} />;
    case 'breakdown':
      return <CheckCircle className={className} size={size} />;
    case 'recommendation':
      return <Award className={className} size={size} />;
    default:
      return <Info className={className} size={size} />;
  }
};

export default StageIcon;