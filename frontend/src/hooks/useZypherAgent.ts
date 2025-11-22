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
  const chunkBufferRef = useRef<string>('');
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUnmountingRef = useRef(false);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const connect = () => {
      // Prevent multiple connections in React Strict Mode
      if (wsRef.current && wsRef.current.readyState === WebSocket.CONNECTING) {
        return;
      }
      
      // Close existing connection if it exists
      if (wsRef.current) {
        wsRef.current.close();
      }

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
            // Buffer chunks for smoother streaming
            chunkBufferRef.current += msg.content;
            
            // Clear existing timeout
            if (updateTimeoutRef.current) {
              clearTimeout(updateTimeoutRef.current);
            }
            
            // Update UI with buffered content after short delay for batching
            updateTimeoutRef.current = setTimeout(() => {
              const bufferedContent = chunkBufferRef.current;
              chunkBufferRef.current = '';
              
              setMessages((prev) => prev.map((m) => 
                m.id === currentMessageIdRef.current
                  ? { ...m, text: m.text + bufferedContent }
                  : m
              ));
            }, 16); // ~60fps for smooth streaming
          }
          
          if (msg.type === 'complete') {
            setIsLoading(false);
            
            // Clear any pending timeout and flush remaining buffer
            if (updateTimeoutRef.current) {
              clearTimeout(updateTimeoutRef.current);
              updateTimeoutRef.current = null;
            }
            
            if (currentMessageIdRef.current) {
              const remainingBuffer = chunkBufferRef.current;
              const messageId = currentMessageIdRef.current; // Store ID before clearing
              chunkBufferRef.current = '';
              

              setMessages((prev) => prev.map((m) => 
                m.id === messageId
                  ? { ...m, text: m.text + remainingBuffer, isComplete: true }
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
        ws.onclose = (event) => {
          console.log('WebSocket closed', event.code, event.reason);
          setIsConnected(false);
          setIsLoading(false);
          
          // Only reconnect if it wasn't a clean closure and component is still mounted
          if (event.code !== 1000 && wsRef.current === ws && !isUnmountingRef.current) {
            reconnectTimeoutRef.current = setTimeout(() => {
              if (!isUnmountingRef.current && (wsRef.current === ws || wsRef.current?.readyState === WebSocket.CLOSED)) {
                connect();
              }
            }, 3000);
          }
        };
      } catch (error) {
        console.error('Failed to create WebSocket:', error);
        setIsConnected(false);
      }
    };

    connect();
    return () => {
      // Mark as unmounting to prevent reconnections
      isUnmountingRef.current = true;
      
      // Clean closure to prevent reconnection
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounting');
        wsRef.current = null;
      }
      
      // Clear all timeouts
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [wsUrl]);

  const sendMessage = (text: string) => {
    if (!wsRef.current) return;
    
    setMessages((prev) => [...prev, { id: `${++messageIdRef.current}`, role: 'user', text, isComplete: true }]);
    wsRef.current.send(JSON.stringify({ type: 'task', task: text }));
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('chat-messages');
    messageIdRef.current = 0;
  };

  const loadConversation = (msgs: Message[]) => {
    // replace messages with loaded conversation
    setMessages(msgs);
    // persist
    localStorage.setItem('chat-messages', JSON.stringify(msgs));
    // reset id ref so next messages continue the sequence
    messageIdRef.current = msgs.length ? parseInt(msgs[msgs.length - 1].id, 10) || messageIdRef.current : messageIdRef.current;
  };

  return { messages, isConnected, isLoading, sendMessage, clearMessages, loadConversation };
};
