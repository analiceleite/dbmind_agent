import styled, { keyframes, css } from 'styled-components';

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const FooterContainer = styled.footer<{ hasMessages?: boolean }>`
  padding: 1rem 2rem;
  background: ${props => props.theme.bgPrimary};
  border-top: 1px solid ${props => props.theme.borderPrimary};
  transition: all 0.3s ease;
  
  ${props => props.hasMessages && css`
    animation: ${slideUp} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `}
`;

export const FormContainer = styled.form`
  position: relative;
  width: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const InputField = styled.input`
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

export const InputBorder = styled.span`
  position: absolute;
  background: ${props => props.theme.gradients.tertiary};
  width: 0%;
  height: 3px;
  bottom: 0;
  left: 0;
  transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1.00);
`;

export const SendButton = styled.button`
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
