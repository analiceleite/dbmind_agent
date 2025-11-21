import { useState, useEffect, useRef } from 'react';
import { useZypherAgent } from './hooks/useZypherAgent';
import logo from './assets/images/corespeed-logo-new.svg';
import './App.css';

function App() {
  const { messages, isConnected, isLoading, sendMessage, clearMessages } = useZypherAgent('ws://localhost:8000/ws');
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} alt="Logo" className="app__logo" />
        <h1 className="app__title">React Agent</h1>
        <div className="header-controls">
          <button 
            className="clear-chat-btn" 
            onClick={clearMessages}
            title="Clear chat history"
          >
            🗑️
          </button>
          <span className={isConnected ? 'status-connected' : 'status-disconnected'}>
            {isConnected ? '● Connected' : '○ Disconnected'}
          </span>
        </div>
      </header>

      <main className="app__messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message message-${msg.role}`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'React Agent'}:</strong>
            <p>
              {msg.text}
              {!msg.isComplete && msg.role === 'agent' && (
                <span className="thinking-indicator">●</span>
              )}
            </p>
          </div>
        ))}
        {isLoading && messages.length === 0 && (
          <div className="message message-agent">
            <strong>React Agent:</strong>
            <p>
              <span className="thinking-indicator">●</span>
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="app__footer">
        <form className="form-control" onSubmit={handleSend}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              className="chat-input__field input input-alt"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What React task do you have?"
              disabled={!isConnected || isLoading}
            />
            <span className="chat-input__border input-border input-border-alt"></span>
          </div>
          <button
            className="chat-input__button"
            type="submit"
            disabled={!isConnected || !input.trim() || isLoading}
          >
            <svg width="42" height="42" viewBox="0 0 752 752" xmlns="http://www.w3.org/2000/svg">
              <path d="m573.18 198.62v0l-396.09 63.719c-7.75 0.85938-9.4727 11.195-3.4453 15.5l97.301 68.883-15.5 112.8c-0.85938 7.75 7.75 12.914 13.777 7.75l55.109-44.773 26.691 124.85c1.7227 7.75 11.195 9.4727 15.5 2.582l215.27-338.39c3.4414-6.0273-1.7266-13.777-8.6133-12.914zm-372.84 76.633 313.42-49.941-233.34 107.63zm74.051 165.32 12.914-92.133c80.938-37.027 139.49-64.578 229.04-105.91-1.7188 1.7227-0.85937 0.85938-241.95 198.04zm88.688 82.66-24.109-112.8 199.77-162.74z" fill="currentColor"/>
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
