import type { Message } from '../../hooks/useZypherAgent';
import { MessageContainer, MessageHeader, MessageText, ThinkingIndicator } from './MessageItemStyle';

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