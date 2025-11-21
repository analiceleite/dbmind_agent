import { useState, type FormEvent } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 1rem 2rem;
  background: ${props => props.theme.bgPrimary};
  border-top: 1px solid ${props => props.theme.borderPrimary};
  transition: all 0.3s ease;
`;

const FormContainer = styled.form`
  position: relative;
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  flex: 1;
  color: ${props => props.theme.textPrimary};
  font-size: 1.2rem;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  padding: 0.8em 3.5rem 0.8em 1em;
  border: none;
  border-bottom: 3px solid ${props => props.theme.borderPrimary};
  box-shadow: 0 4px 8px ${props => props.theme.shadowSecondary};
  
  &:focus {
    outline: none;
  }

  &:focus + span {
    width: 100%;
  }

  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.7;
  }
`;

const InputBorder = styled.span`
  position: absolute;
  background: ${props => props.theme.gradients.tertiary};
  width: 0%;
  height: 3px;
  bottom: 0;
  left: 0;
  transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1.00);
`;

const SendButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  color: ${props => props.theme.textSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  transition: all .3s ease-in-out;
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${props => props.theme.textAccent};
    transform: translateY(-50%) scale(1.2);
  }

  &:hover:not(:disabled) svg {
    transform: rotate(15deg);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    transition: all .3s ease-in-out;
  }
`;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isConnected: boolean;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isConnected, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <FooterContainer>
      <FormContainer onSubmit={handleSend}>
        <InputContainer>
          <InputField
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
          <svg width="42" height="42" viewBox="0 0 752 752" xmlns="http://www.w3.org/2000/svg">
            <path d="m573.18 198.62v0l-396.09 63.719c-7.75 0.85938-9.4727 11.195-3.4453 15.5l97.301 68.883-15.5 112.8c-0.85938 7.75 7.75 12.914 13.777 7.75l55.109-44.773 26.691 124.85c1.7227 7.75 11.195 9.4727 15.5 2.582l215.27-338.39c3.4414-6.0273-1.7266-13.777-8.6133-12.914zm-372.84 76.633 313.42-49.941-233.34 107.63zm74.051 165.32 12.914-92.133c80.938-37.027 139.49-64.578 229.04-105.91-1.7188 1.7227-0.85937 0.85938-241.95 198.04zm88.688 82.66-24.109-112.8 199.77-162.74z" fill="currentColor"/>
          </svg>
        </SendButton>
      </FormContainer>
    </FooterContainer>
  );
};
