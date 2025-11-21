import { useZypherAgent } from './hooks/useZypherAgent';
import { Header } from './components/Header';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import logo from './assets/images/corespeed-logo-new.svg';
import './App.css';

function App() {
  const { messages, isConnected, isLoading, sendMessage, clearMessages } = useZypherAgent('ws://localhost:8000/ws');

  return (
    <div className="app">
      <Header 
        logo={logo}
        isConnected={isConnected}
        onClearMessages={clearMessages}
      />
      
      <ChatMessages 
        messages={messages}
        isLoading={isLoading}
      />
      
      <ChatInput 
        onSendMessage={sendMessage}
        isConnected={isConnected}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
