import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon, TrashIcon, ConnectedIcon, DisconnectedIcon } from '../LucideIcons/LucideIcons';
import { HeaderContainer, Logo, Title, HeaderControls, ControlButton, StatusIndicator } from './HeaderStyle';

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
          {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </ControlButton>
        <ControlButton 
          onClick={onClearMessages}
          title="Clear chat history"
        >
          <TrashIcon size={18} />
        </ControlButton>
        <StatusIndicator $isConnected={isConnected}>
          {isConnected ? <ConnectedIcon size={14} /> : <DisconnectedIcon size={14} />}
          {isConnected ? 'Connected' : 'Disconnected'}
        </StatusIndicator>
      </HeaderControls>
    </HeaderContainer>
  );
};