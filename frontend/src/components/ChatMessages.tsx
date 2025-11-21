import { useRef, useEffect } from 'react';
import { Message } from '../hooks/useZypherAgent';
import { MessageItem } from './MessageItem';

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
    <main className="app__messages">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      {isLoading && messages.length === 0 && (
        <div className="message message-agent">
          <strong>React Agent:</strong>
          <p>
            <span className="thinking-indicator">●</span>
          </p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </main>
  );
};