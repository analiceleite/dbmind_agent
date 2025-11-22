import { useState, useRef, type FormEvent } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { useZypherAgent } from './hooks/useZypherAgent';
import { Header } from './components/Header/Header';
import { ChatMessages } from './components/ChatMessages/ChatMessages';
import { SendIcon } from './components/LucideIcons/LucideIcons';
import logo from './assets/images/corespeed-logo-new.svg';
import { AppContainer, ResponsiveInputButton, ResponsiveInputContainer, ResponsiveInputField, ResponsiveInputForm, ResponsiveInputWrapper } from './AppStyle';

function AppContent() {
  const { messages, isConnected, isLoading, sendMessage, clearMessages } = useZypherAgent('ws://localhost:8000/ws');
  const [input, setInput] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isWelcomeMode = messages.length === 0 && !isLoading;

  const handleStartChat = (message: string) => {
    sendMessage(message);
    setInput(''); 
  };
  
  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      if (isWelcomeMode) {
        setIsTransitioning(true);
        // Wait for transition to complete before sending
        setTimeout(() => {
          handleStartChat(input.trim());
          setIsTransitioning(false);
        }, 800);
      } else {
        sendMessage(input.trim());
        setInput('');
      }
    }
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
        isConnected={isConnected}
        isTransitioning={isTransitioning}
      />
      
      <ResponsiveInputContainer 
        $isWelcome={isWelcomeMode}
        $isTransitioning={isTransitioning}
      >
        <ResponsiveInputForm onSubmit={handleInputSubmit}>
          <ResponsiveInputWrapper $isWelcome={isWelcomeMode}>
            <ResponsiveInputField
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isWelcomeMode ? "What would you like to learn about React?" : "Type your question..."}
              disabled={!isConnected || (isWelcomeMode && isTransitioning)}
              autoFocus={isWelcomeMode}
            />
            <ResponsiveInputButton
              type="submit"
              disabled={!isConnected || !input.trim() || (isWelcomeMode && isTransitioning) || isLoading}
            >
              <SendIcon size={20} />
            </ResponsiveInputButton>
          </ResponsiveInputWrapper>
        </ResponsiveInputForm>
      </ResponsiveInputContainer>
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
