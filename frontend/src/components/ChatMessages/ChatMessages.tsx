import { useRef, useEffect, useState } from 'react';
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
  const containerRef = useRef<HTMLElement | null>(null);
  const [pointerVisible, setPointerVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showWelcome = messages.length === 0 && !isLoading;

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);

    // show spotlight while the pointer is active and debounce hide
    setPointerVisible(true);
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }
    // hide after 700ms of no movement for a gradual disappear
    hideTimerRef.current = window.setTimeout(() => {
      setPointerVisible(false);
      hideTimerRef.current = null;
    }, 700);
  };

  const handleMouseLeave = () => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    // fade out immediately but honor CSS transition
    setPointerVisible(false);
  };

  return (
    <MessagesContainer
      ref={containerRef as any}
      data-spotlight={showWelcome && pointerVisible ? 'true' : 'false'}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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