import { useState, useEffect, useRef } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
  isComplete?: boolean;
}

const getInitialMessageId = () => {
  const savedMessages = localStorage.getItem('chat-messages');
  if (savedMessages) {
    try {
      const parsedMessages = JSON.parse(savedMessages);
      return Array.isArray(parsedMessages) ? parsedMessages.length : 0;
    } catch (error) {
      return 0;
    }
  }
  return 0;
};

export const useZypherAgent = (wsUrl: string) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage on initialization
    const savedMessages = localStorage.getItem('chat-messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        return Array.isArray(parsedMessages) ? parsedMessages : [];
      } catch (error) {
        console.error('Failed to parse saved messages:', error);
        return [];
      }
    }
    return [];
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messageIdRef = useRef(getInitialMessageId());
  const currentMessageIdRef = useRef<string | null>(null);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const connect = () => {

      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('Connected to Zypher Agent');
          setIsConnected(true);
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          
          if (msg.type === 'status') {
            setIsLoading(true);
            const newId = `${++messageIdRef.current}`;
            currentMessageIdRef.current = newId;
            setMessages((prev) => [...prev, { 
              id: newId, 
              role: 'agent', 
              text: '',
              isComplete: false 
            }]);
          }
          
          if (msg.type === 'chunk' && msg.content && currentMessageIdRef.current) {
            setMessages((prev) => prev.map((m) => 
              m.id === currentMessageIdRef.current
                ? { ...m, text: m.text + msg.content }
                : m
            ));
          }
          
          if (msg.type === 'complete') {
            setIsLoading(false);
            if (currentMessageIdRef.current) {
              setMessages((prev) => prev.map((m) => 
                m.id === currentMessageIdRef.current
                  ? { ...m, isComplete: true }
                  : m
              ));
              currentMessageIdRef.current = null;
            }
          }
          
          if (msg.type === 'error') {
            setIsLoading(false);
            setMessages((prev) => [...prev, { 
              id: `${++messageIdRef.current}`, 
              role: 'agent', 
              text: `Erro: ${msg.message}`,
              isComplete: true 
            }]);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setIsConnected(false);
        };
        ws.onclose = () => {
          console.log('WebSocket closed');
          setIsConnected(false);
          setIsLoading(false);
          setTimeout(() => {
            if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
              connect();
            }
          }, 3000);
        };
      } catch {
        setIsConnected(false);
      }
    };

    connect();
    return () => wsRef.current?.close();
  }, [wsUrl]);

  const sendMessage = (text: string) => {
    if (!wsRef.current) return;
    
    setMessages((prev) => [...prev, { id: `${++messageIdRef.current}`, role: 'user', text, isComplete: true }]);
    wsRef.current.send(JSON.stringify({ type: 'task', task: text, model: 'llama3.2' }));
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('chat-messages');
    messageIdRef.current = 0;
  };

  return { messages, isConnected, isLoading, sendMessage, clearMessages };
};
