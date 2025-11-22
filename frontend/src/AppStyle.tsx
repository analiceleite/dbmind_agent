import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: system-ui, sans-serif;
  background: ${props => props.theme.bgPrimary};
  transition: all 0.3s ease;
`;

export const ResponsiveInputContainer = styled.div<{ $isWelcome: boolean; $isTransitioning: boolean }>`
  ${props => props.$isWelcome ? `
    /* Welcome mode: input follows the natural content flow */
    position: absolute;
    top: 60vh;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 8rem; /* Responsive spacing after content */
    max-width: 500px;
    width: 90vw;
    z-index: 15;
  ` : `
    /* Chat mode: input stays fixed at bottom */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 2rem;
    background: ${props.theme.bgPrimary};
    border-top: 1px solid ${props.theme.borderPrimary};
    z-index: 1000;
  `}
  
  ${props => props.$isTransitioning && `
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `}
`;

export const ResponsiveInputForm = styled.form`
  position: relative;
  width: 100%;
`;

export const ResponsiveInputWrapper = styled.div<{ isWelcome: boolean }>`
  display: flex;
  align-items: center;
  background: ${props => props.theme.bgSecondary};
  border: 2px solid ${props => props.theme.textAccent};
  border-radius: ${props => props.isWelcome ? '8px' : '0'};
  padding: 0.5rem;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: ${props => props.theme.textAccent};
    box-shadow: 0 0 0 3px rgba(95, 174, 255, 0.1);
  }
`;

export const ResponsiveInputField = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${props => props.theme.textPrimary};
  font-size: 1rem;
  padding: 0.75rem 1rem;
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.7;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ResponsiveInputButton = styled.button`
  background: ${props => props.theme.textAccent};
  border: none;
  border-radius: 6px;
  color: ${props => props.theme.bgPrimary};
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.textAccent};
    opacity: 0.9;
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;
