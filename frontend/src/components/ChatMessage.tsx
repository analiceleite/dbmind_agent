import React from 'react';
import './ChatMessage.css';

export interface AgentMessage {
  type: 'user' | 'agent' | 'status' | 'error';
  content: string;
  timestamp: Date;
  data?: any;
}

interface ChatMessageProps {
  message: AgentMessage;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`chat-message chat-message--${message.type}`}>
      <div className="chat-message__header">
        <span className="chat-message__type">
          {message.type === 'user' ? '👤 Você' : 
           message.type === 'agent' ? '🤖 Agente' :
           message.type === 'status' ? 'ℹ️ Status' : '❌ Erro'}
        </span>
        <span className="chat-message__time">{formatTime(message.timestamp)}</span>
      </div>
      <div className="chat-message__content">
        {message.type === 'agent' && message.data ? (
          <pre>{message.content}</pre>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
};
