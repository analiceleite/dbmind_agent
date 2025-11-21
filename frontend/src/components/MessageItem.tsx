import styled, { keyframes } from 'styled-components';
import type { Message } from '../hooks/useZypherAgent';

const thinkingPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const MessageContainer = styled.div<{ $role: 'user' | 'agent' }>`
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  border-radius: 12px;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  ${props => props.$role === 'user' ? `
    background: ${props.theme.gradients.primary};
    color: ${props.theme.textPrimary};
    margin-left: 20%;
    border-left: 4px solid ${props.theme.textSecondary};
    box-shadow: 0 2px 8px ${props.theme.shadowPrimary};
  ` : `
    background: ${props.theme.gradients.secondary};
    color: ${props.theme.textPrimary};
    margin-right: 20%;
    border-left: 4px solid ${props.theme.textAccent};
    box-shadow: 0 2px 8px ${props.theme.shadowSecondary};
  `}
`;

const MessageHeader = styled.strong`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MessageText = styled.p`
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
  color: ${props => props.theme.textPrimary};
`;

const ThinkingIndicator = styled.span`
  color: ${props => props.theme.textAccent};
  animation: ${thinkingPulse} 1.5s infinite;
  margin-left: 0.25rem;
`;

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <MessageContainer $role={message.role}>
      <MessageHeader>{message.role === 'user' ? 'You' : 'React Agent'}:</MessageHeader>
      <MessageText>
        {message.text}
        {!message.isComplete && message.role === 'agent' && (
          <ThinkingIndicator>●</ThinkingIndicator>
        )}
      </MessageText>
    </MessageContainer>
  );
};