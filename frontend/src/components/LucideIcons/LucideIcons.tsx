import { 
  Sun, 
  Moon, 
  Trash2, 
  Send, 
  Zap, 
  Lightbulb, 
  BookOpen, 
  Target,
  Wifi,
  WifiOff
} from 'lucide-react';
import { IconWrapper } from './LucideIconsStyle';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

// Theme Toggle Icons
export const SunIcon = ({ size = 18, strokeWidth = 1.5, className }: IconProps) => (
  <IconWrapper className={className}>
    <Sun size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);

export const MoonIcon = ({ size = 18, strokeWidth = 1.5, className }: IconProps) => (
  <IconWrapper className={className}>
    <Moon size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);

// Action Icons
export const TrashIcon = ({ size = 18, strokeWidth = 1.5, className }: IconProps) => (
  <IconWrapper className={className}>
    <Trash2 size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);

export const SendIcon = ({ size = 20, strokeWidth = 1.5, className }: IconProps) => (
  <IconWrapper className={className}>
    <Send size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);

// Connection Status Icons
export const ConnectedIcon = ({ size = 14, strokeWidth = 2, className }: IconProps) => (
  <IconWrapper className={className}>
    <Wifi size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);

export const DisconnectedIcon = ({ size = 14, strokeWidth = 2, className }: IconProps) => (
  <IconWrapper className={className}>
    <WifiOff size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);

// Feature Icons for Welcome Message
export const RocketIcon = ({ size = 16, strokeWidth = 1.5, className }: IconProps) => (
  <IconWrapper className={className}>
    <Zap size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);

export const BulbIcon = ({ size = 16, strokeWidth = 1.5, className }: IconProps) => (
  <IconWrapper className={className}>
    <Lightbulb size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);

export const BookIcon = ({ size = 16, strokeWidth = 1.5, className }: IconProps) => (
  <IconWrapper className={className}>
    <BookOpen size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);

export const TargetIcon = ({ size = 16, strokeWidth = 1.5, className }: IconProps) => (
  <IconWrapper className={className}>
    <Target size={size} strokeWidth={strokeWidth} />
  </IconWrapper>
);