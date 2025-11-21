import React from 'react';
import './ConnectionStatus.css';

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      <span className="connection-status__dot"></span>
      <span className="connection-status__text">
        {isConnected ? 'Conectado' : 'Desconectado'}
      </span>
    </div>
  );
};
