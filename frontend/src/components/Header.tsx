interface HeaderProps {
  logo: string;
  isConnected: boolean;
  onClearMessages: () => void;
}

export const Header = ({ logo, isConnected, onClearMessages }: HeaderProps) => {
  return (
    <header className="app__header">
      <img src={logo} alt="Logo" className="app__logo" />
      <h1 className="app__title">React Agent</h1>
      <div className="header-controls">
        <button 
          className="clear-chat-btn" 
          onClick={onClearMessages}
          title="Clear chat history"
        >
          🗑️
        </button>
        <span className={isConnected ? 'status-connected' : 'status-disconnected'}>
          {isConnected ? '● Connected' : '○ Disconnected'}
        </span>
      </div>
    </header>
  );
};