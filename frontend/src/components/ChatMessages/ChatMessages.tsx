import { useRef, useEffect } from 'react';
import type { Message } from '../../hooks/useZypherAgent';
import { MessageItem } from '../MessageItem/MessageItem';
import { WelcomeMessage } from '../WelcomeMessage/WelcomeMessage';
import { MessagesContainer, LoadingMessage, LoadingHeader, LoadingText, LoadingIndicator } from './ChatMessagesStyle';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onStartChat: () => void;
}

export const ChatMessages = ({ messages, isLoading, onStartChat }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <MessagesContainer>
      {showWelcome && <WelcomeMessage onStartChat={onStartChat} />}
      
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