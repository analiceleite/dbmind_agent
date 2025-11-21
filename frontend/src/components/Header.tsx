import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon, TrashIcon, ConnectedIcon, DisconnectedIcon } from './Icons';

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
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: ${props => props.theme.bgSecondary};
    border-color: ${props => props.theme.textAccent};
    color: ${props => props.theme.textAccent};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const StatusIndicator = styled.div<{ $isConnected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${props => props.$isConnected ? '#10b981' : '#ef4444'};
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  background: ${props => props.$isConnected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border-radius: 20px;
  border: 1px solid ${props => props.$isConnected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  transition: all 0.3s ease;
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
          {theme === 'dark' ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
        </ControlButton>
        <ControlButton 
          onClick={onClearMessages}
          title="Clear chat history"
        >
          <TrashIcon width={18} height={18} />
        </ControlButton>
        <StatusIndicator $isConnected={isConnected}>
          {isConnected ? <ConnectedIcon width={14} height={14} /> : <DisconnectedIcon width={14} height={14} />}
          {isConnected ? 'Connected' : 'Disconnected'}
        </StatusIndicator>
      </HeaderControls>
    </HeaderContainer>
  );
};