import styled from 'styled-components';

const IconWrapper = styled.svg`
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
`;

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const SunIcon = ({ width = 20, height = 20, className }: IconProps) => (
  <IconWrapper 
    width={width} 
    height={height} 
    viewBox="0 0 752 752" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="currentColor">
      <circle cx="376" cy="376" r="120" />
      <rect x="360" y="60" width="32" height="80" rx="16" />
      <rect x="360" y="612" width="32" height="80" rx="16" />
      <rect x="612" y="360" width="80" height="32" rx="16" />
      <rect x="60" y="360" width="80" height="32" rx="16" />
      <rect x="554.5" y="143" width="32" height="80" rx="16" transform="rotate(45 570.5 183)" />
      <rect x="165.5" y="529" width="32" height="80" rx="16" transform="rotate(45 181.5 569)" />
      <rect x="529" y="554.5" width="80" height="32" rx="16" transform="rotate(45 569 570.5)" />
      <rect x="143" y="165.5" width="80" height="32" rx="16" transform="rotate(45 183 181.5)" />
    </g>
  </IconWrapper>
);

export const MoonIcon = ({ width = 20, height = 20, className }: IconProps) => (
  <IconWrapper 
    width={width} 
    height={height} 
    viewBox="0 0 752 752" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M376 150c-20 0-40 2.5-58.5 7.2-15 3.8-20.5 24.2-8.5 35C350 230 376 284 376 344c0 60-26 114-67 151.8-12 11-6.5 31.2 8.5 35C335.5 535.5 355.5 538 376 538c124.7 0 226-101.3 226-226S500.7 150 376 150z" 
      fill="currentColor"
    />
  </IconWrapper>
);

export const TrashIcon = ({ width = 20, height = 20, className }: IconProps) => (
  <IconWrapper 
    width={width} 
    height={height} 
    viewBox="0 0 752 752" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="currentColor">
      <path d="M280 220v-30c0-33.1 26.9-60 60-60h72c33.1 0 60 26.9 60 60v30h100c11 0 20 9 20 20s-9 20-20 20h-20v340c0 33.1-26.9 60-60 60H260c-33.1 0-60-26.9-60-60V260h-20c-11 0-20-9-20-20s9-20 20-20h100zm40 0h112v-30c0-11-9-20-20-20h-72c-11 0-20 9-20 20v30zm-80 40v340c0 11 9 20 20 20h232c11 0 20-9 20-20V260H240z"/>
      <rect x="320" y="320" width="32" height="200" rx="16" />
      <rect x="400" y="320" width="32" height="200" rx="16" />
    </g>
  </IconWrapper>
);

export const SendIcon = ({ width = 20, height = 20, className }: IconProps) => (
  <IconWrapper 
    width={width} 
    height={height} 
    viewBox="0 0 752 752" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="m573.18 198.62v0l-396.09 63.719c-7.75 0.85938-9.4727 11.195-3.4453 15.5l97.301 68.883-15.5 112.8c-0.85938 7.75 7.75 12.914 13.777 7.75l55.109-44.773 26.691 124.85c1.7227 7.75 11.195 9.4727 15.5 2.582l215.27-338.39c3.4414-6.0273-1.7266-13.777-8.6133-12.914zm-372.84 76.633 313.42-49.941-233.34 107.63zm74.051 165.32 12.914-92.133c80.938-37.027 139.49-64.578 229.04-105.91-1.7188 1.7227-0.85937 0.85938-241.95 198.04zm88.688 82.66-24.109-112.8 199.77-162.74z" 
      fill="currentColor"
    />
  </IconWrapper>
);

export const ConnectedIcon = ({ width = 16, height = 16, className }: IconProps) => (
  <IconWrapper 
    width={width} 
    height={height} 
    viewBox="0 0 752 752" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="currentColor">
      <circle cx="376" cy="376" r="40" />
      <circle cx="376" cy="376" r="80" fill="none" stroke="currentColor" strokeWidth="20" opacity="0.6" />
      <circle cx="376" cy="376" r="120" fill="none" stroke="currentColor" strokeWidth="16" opacity="0.3" />
    </g>
  </IconWrapper>
);

export const DisconnectedIcon = ({ width = 16, height = 16, className }: IconProps) => (
  <IconWrapper 
    width={width} 
    height={height} 
    viewBox="0 0 752 752" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="currentColor">
      <circle cx="376" cy="376" r="40" opacity="0.3" />
      <circle cx="376" cy="376" r="80" fill="none" stroke="currentColor" strokeWidth="20" opacity="0.2" />
      <circle cx="376" cy="376" r="120" fill="none" stroke="currentColor" strokeWidth="16" opacity="0.1" />
      <path d="m600 152-448 448" stroke="currentColor" strokeWidth="40" strokeLinecap="round" />
    </g>
  </IconWrapper>
);