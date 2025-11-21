import React, { useState, type FormEvent } from 'react';
import './ChatInput.css';

interface ChatInputProps {
  onSendTask: (task: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendTask, disabled }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (task.trim() && !disabled) {
      onSendTask(task.trim());
      setTask('');
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Digite sua tarefa para o agente..."
        disabled={disabled}
        className="chat-input__field"
      />
      <button
        type="submit"
        disabled={disabled || !task.trim()}
        className="chat-input__button"
      >
        {disabled ? '⏳ Processando...' : '🚀 Enviar'}
      </button>
    </form>
  );
};
