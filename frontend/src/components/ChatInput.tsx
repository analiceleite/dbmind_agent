import { useState, type FormEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isConnected: boolean;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isConnected, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
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
  );
};
