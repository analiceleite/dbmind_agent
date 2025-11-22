import { useRef, useEffect } from 'react';
import type { Message } from '../../hooks/useZypherAgent';
import { MessageItem } from '../MessageItem/MessageItem';
import { WelcomeMessage } from '../WelcomeMessage/WelcomeMessage';
import { MessagesContainer, LoadingMessage, LoadingHeader, LoadingText, LoadingLeft } from './ChatMessagesStyle';
import DotsLoader from '../Loaders/DotsLoader';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onStartChat: (message: string) => void;
  isConnected: boolean;
  isTransitioning: boolean;
}

export const ChatMessages = ({ messages, isLoading, isTransitioning }: ChatMessagesProps) => {
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
      {showWelcome && <WelcomeMessage isTransitioning={isTransitioning} />}
      
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      
      {isLoading && messages.length === 0 && (
        <LoadingMessage>
          <LoadingLeft>
            <DotsLoader />
          </LoadingLeft>
          <div>
            <LoadingHeader>DBMind Agent:</LoadingHeader>
            <LoadingText>Carregando resposta…</LoadingText>
          </div>
        </LoadingMessage>
      )}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
};