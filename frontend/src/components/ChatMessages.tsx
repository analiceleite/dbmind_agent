import { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import type { Message } from '../hooks/useZypherAgent';
import { MessageItem } from './MessageItem';

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

const MessagesContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: ${props => props.theme.bgPrimary};
  color: ${props => props.theme.textPrimary};
  box-shadow: 0 4px 8px ${props => props.theme.shadowSecondary};
  transition: all 0.3s ease;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.scrollbarTrack};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.scrollbarThumb};
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.scrollbarThumbHover};
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.textSecondary} ${props => props.theme.scrollbarTrack};
`;

const LoadingMessage = styled.div`
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

const LoadingHeader = styled.strong`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LoadingText = styled.p`
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
  color: ${props => props.theme.textPrimary};
`;

const LoadingIndicator = styled.span`
  color: ${props => props.theme.textAccent};
  animation: ${thinkingPulse} 1.5s infinite;
`;

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <MessagesContainer>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      {isLoading && messages.length === 0 && (
        <LoadingMessage>
          <LoadingHeader>React Agent:</LoadingHeader>
          <LoadingText>
            <LoadingIndicator>●</LoadingIndicator>
          </LoadingText>
        </LoadingMessage>
      )}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
};