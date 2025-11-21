import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.5rem;
  background: ${props => props.theme.bgPrimary};
  border-bottom: 1px solid ${props => props.theme.borderPrimary};
  transition: all 0.3s ease;
`;

const Logo = styled.img<{ $isDark: boolean }>`
  height: 30px;
  width: 200px;
  filter: ${props => props.$isDark ? 'none' : 'brightness(0) saturate(100%)'};
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 1.3rem;
  color: ${props => props.theme.textPrimary};
  font-family: "Nebula", sans-serif;
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.borderPrimary};
  color: ${props => props.theme.textSecondary};
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.bgSecondary};
    border-color: ${props => props.theme.textSecondary};
    transform: scale(1.05);
  }
`;

const StatusIndicator = styled.span<{ $isConnected: boolean }>`
  color: ${props => props.$isConnected ? '#10b981' : '#ef4444'};
`;

interface HeaderProps {
  logo: string;
  isConnected: boolean;
  onClearMessages: () => void;
}

export const Header = ({ logo, isConnected, onClearMessages }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Logo src={logo} alt="Logo" $isDark={theme === 'dark'} />
      <Title>React Agent</Title>
      <HeaderControls>
        <ControlButton 
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </ControlButton>
        <ControlButton 
          onClick={onClearMessages}
          title="Clear chat history"
        >
          🗑️
        </ControlButton>
        <StatusIndicator $isConnected={isConnected}>
          {isConnected ? '● Connected' : '○ Disconnected'}
        </StatusIndicator>
      </HeaderControls>
    </HeaderContainer>
  );
};