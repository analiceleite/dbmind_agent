import type { Message } from '../../hooks/useZypherAgent';
import { MessageContainer, MessageHeader, MessageText, ThinkingIndicator } from './MessageItemStyle';
import { MarkdownRenderer } from './MarkdownRenderer/MarkdownRenderer';

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <MessageContainer $role={message.role}>
      <MessageHeader>{message.role === 'user' ? 'You' : 'React Agent'}:</MessageHeader>
      <MessageText>
        {message.role === 'agent' ? (
          <MarkdownRenderer 
            content={message.text} 
            showLoadingIndicator={!message.isComplete} 
          />
        ) : (
          <>
            {message.text}
            {!message.isComplete && (
              <ThinkingIndicator>●</ThinkingIndicator>
            )}
          </>
        )}
      </MessageText>
    </MessageContainer>
  );
};