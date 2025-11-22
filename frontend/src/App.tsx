import { useState, useRef, type FormEvent } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { useZypherAgent } from './hooks/useZypherAgent';
import { Header } from './components/Header/Header';
import History from './components/History/History';
import { ChatMessages } from './components/ChatMessages/ChatMessages';
import { SendIcon } from './components/LucideIcons/LucideIcons';
import logo from './assets/images/corespeed-logo-new.svg';
import { AppContainer, ResponsiveInputButton, ResponsiveInputContainer, ResponsiveInputField, ResponsiveInputForm, ResponsiveInputWrapper } from './AppStyle';

function AppContent() {
  const { messages, isConnected, isLoading, sendMessage, clearMessages, loadConversation, startNewConversation } = useZypherAgent('ws://localhost:8000/ws');
  const [input, setInput] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isWelcomeMode = messages.length === 0 && !isLoading;

  // History panel
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState<any[]>([]);

  const toggleHistory = async () => {
    if (showHistory) {
      setShowHistory(false);
      return;
    }
    setShowHistory(true);
    await reloadHistory();
  };

  const reloadHistory = async () => {
    try {
      const res = await fetch('http://localhost:8000/history');
      if (res.ok) {
        const items = await res.json();
        setHistoryItems(items);
      } else {
        console.error('Failed to reload history', res.status);
      }
    } catch (err) {
      console.error('Failed to load history', err);
    }
  };

  const selectHistory = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/history/${id}`);
      if (!res.ok) return;
      const row = await res.json();
      // build messages to load into conversation
      const base = Date.now();
      const msgs = [
        { id: `${base}`, role: 'user' as const, text: row.question, isComplete: true },
        { id: `${base + 1}`, role: 'agent' as const, text: row.answer ?? '', isComplete: true },
      ];
      loadConversation(msgs, row.session_id);
      setShowHistory(false);
    } catch (err) {
      console.error(err);
    }
  };

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
        onOpenHistory={toggleHistory}
        showClear={!isWelcomeMode}
        showHistory={!isWelcomeMode}
        onNewConversation={() => startNewConversation('New conversation started — how can I help?')}
      />
      
      <ChatMessages 
        messages={messages}
        isLoading={isLoading}
        onStartChat={handleStartChat}
        isConnected={isConnected}
        isTransitioning={isTransitioning}
      />

      {showHistory && (
        <History items={historyItems} onClose={() => setShowHistory(false)} onSelect={selectHistory} onReload={reloadHistory} />
      )}
      
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
              placeholder={isWelcomeMode ? "What do you want to know about your company data?" : "Type your question..."}
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
