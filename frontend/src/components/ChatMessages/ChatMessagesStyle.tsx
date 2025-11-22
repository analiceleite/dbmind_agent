import styled, { keyframes } from 'styled-components';

export const thinkingPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

export const MessagesContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  padding-bottom: 6rem;
  background: ${props => props.theme.bgPrimary};
  color: ${props => props.theme.textPrimary};
  box-shadow: 0 4px 8px ${props => props.theme.shadowSecondary};
  transition: all 0.3s ease;
  position: relative;
  --mx: 50%;
  --my: 50%;

  /* spotlight layer (shows only when data-spotlight=true) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    /* construct a spotlight gradient based on theme.textAccent so it matches light/dark themes */
    background: ${props => {
      const hex = (props.theme.textAccent || '#47c9ff').replace('#','');
      const r = parseInt(hex.substring(0,2), 16);
      const g = parseInt(hex.substring(2,4), 16);
      const b = parseInt(hex.substring(4,6), 16);
      const isLight = props.theme.bgPrimary === '#ffffff';
      const stopA = isLight ? 0.18 : 0.14;
      const stopB = isLight ? 0.08 : 0.06;
      const stopC = isLight ? 0.03 : 0.02;
      return `radial-gradient(circle at var(--mx) var(--my), rgba(${r},${g},${b},${stopA}) 0%, rgba(${r},${g},${b},${stopB}) 10%, rgba(${r},${g},${b},${stopC}) 20%, transparent 40%)`;
    }};
    opacity: 0;
    transition: opacity 350ms ease, background-position 120ms linear;
    mix-blend-mode: ${props => (props.theme.bgPrimary === '#ffffff' ? 'normal' : 'screen')};
    z-index: 0;
  }

  &[data-spotlight="true"]::before {
    opacity: 1;
  }
`;

export const LoadingMessage = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  border-radius: 12px;
  position: relative;
  display: flex;
  gap: 12px;
  align-items: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  background: ${props => props.theme.gradients.secondary};
  color: ${props => props.theme.textPrimary};
  margin-right: 20%;
  border-left: 4px solid ${props => props.theme.textAccent};
  box-shadow: 0 2px 8px ${props => props.theme.shadowSecondary};
`;

export const LoadingHeader = styled.strong`
  display: block;
  margin: 0 0 6px 0;
  color: ${props => props.theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const LoadingText = styled.p`
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
  color: ${props => props.theme.textPrimary};
  flex: 1 1 auto;
`;

export const LoadingLeft = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  width: 48px;
`;

export const LoadingIndicator = styled.span`
  color: ${props => props.theme.textAccent};
  animation: ${thinkingPulse} 1.5s infinite;
`;