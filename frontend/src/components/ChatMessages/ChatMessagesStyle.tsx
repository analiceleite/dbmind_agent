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
`;

export const LoadingMessage = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  border-radius: 12px;
  position: relative;
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
  margin-bottom: 0.5rem;
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
`;

export const LoadingIndicator = styled.span`
  color: ${props => props.theme.textAccent};
  animation: ${thinkingPulse} 1.5s infinite;
`;