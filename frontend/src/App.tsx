import { useState } from 'react';
import { useZypherAgent } from './hooks/useZypherAgent';
import './App.css';

function App() {
  const { messages, isConnected, isLoading, sendMessage } = useZypherAgent('ws://localhost:8000/ws');
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>🎓 Professor de React</h1>
        <span className={isConnected ? 'status-connected' : 'status-disconnected'}>
          {isConnected ? '● Conectado' : '○ Desconectado'}
        </span>
      </header>

      <main className="app__messages">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message message-${msg.role} ${!msg.isComplete && msg.role === 'agent' ? 'streaming' : ''}`}
          >
            <strong>{msg.role === 'user' ? 'Você' : 'Professor React'}:</strong>
            <p>{msg.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className="message message-agent loading">
            <strong>Professor React:</strong>
            <p>Pensando...</p>
          </div>
        )}
      </main>

      <footer className="app__footer">
        <form onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Como funciona o useState? O que são hooks?"
            disabled={!isConnected || isLoading}
          />
          <button type="submit" disabled={!isConnected || !input.trim() || isLoading}>
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
