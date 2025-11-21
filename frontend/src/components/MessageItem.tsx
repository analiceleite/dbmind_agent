import { Message } from '../hooks/useZypherAgent';

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div className={`message message-${message.role}`}>
      <strong>{message.role === 'user' ? 'You' : 'React Agent'}:</strong>
      <p>
        {message.text}
        {!message.isComplete && message.role === 'agent' && (
          <span className="thinking-indicator">●</span>
        )}
      </p>
    </div>
  );
};