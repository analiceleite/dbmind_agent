import { useState, forwardRef, type FormEvent } from 'react';
import { FooterContainer, FormContainer, InputContainer, InputField, InputBorder, SendButton } from './CHatInputStyle';
import { SendIcon } from '../LucideIcons/LucideIcons';

interface ChatInputProps {  
  onSendMessage: (message: string) => void;
  isConnected: boolean;
  isLoading: boolean;
  hasMessages?: boolean;
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  ({ onSendMessage, isConnected, isLoading, hasMessages }, ref) => {
    const [input, setInput] = useState('');

    const handleSend = (e: FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        onSendMessage(input);
        setInput('');
      }
    };

    return (
      <FooterContainer hasMessages={hasMessages}>
        <FormContainer onSubmit={handleSend}>
          <InputContainer>
            <InputField
              ref={ref}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What React task do you have?"
              disabled={!isConnected || isLoading}
            />
            <InputBorder />
          </InputContainer>
          <SendButton
            type="submit"
            disabled={!isConnected || !input.trim() || isLoading}
          >
            <SendIcon size={20} />
          </SendButton>
        </FormContainer>
      </FooterContainer>
    );
  }
);

ChatInput.displayName = 'ChatInput';
