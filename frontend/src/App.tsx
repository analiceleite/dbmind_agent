import { useRef } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { useZypherAgent } from './hooks/useZypherAgent';
import { Header } from './components/Header/Header';
import { ChatMessages } from './components/ChatMessages/ChatMessages';
import { ChatInput } from './components/ChatInput/ChatInput';
import logo from './assets/images/corespeed-logo-new.svg';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: system-ui, sans-serif;
  background: ${props => props.theme.bgPrimary};
  transition: all 0.3s ease;
`;

function AppContent() {
  const { messages, isConnected, isLoading, sendMessage, clearMessages } = useZypherAgent('ws://localhost:8000/ws');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartChat = () => {
    inputRef.current?.focus();
  };

  return (
    <AppContainer>
      <Header 
        logo={logo}
        isConnected={isConnected}
        onClearMessages={clearMessages}
      />
      
      <ChatMessages 
        messages={messages}
        isLoading={isLoading}
        onStartChat={handleStartChat}
      />
      
      <ChatInput 
        ref={inputRef}
        onSendMessage={sendMessage}
        isConnected={isConnected}
        isLoading={isLoading}
      />
    </AppContainer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
