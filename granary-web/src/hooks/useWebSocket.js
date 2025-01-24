import { useState, useEffect, useCallback, useRef } from 'react';

export function useWebSocket(url, options = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        if (options.onConnect) options.onConnect();
      };

      ws.onclose = () => {
        setIsConnected(false);
        if (options.onDisconnect) options.onDisconnect();
        
        // Attempt to reconnect after delay
        if (options.autoReconnect !== false) {
          setTimeout(connect, options.reconnectDelay || 5000);
        }
      };

      ws.onerror = (event) => {
        setError('WebSocket error occurred');
        if (options.onError) options.onError(event);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(data);
          if (options.onMessage) options.onMessage(data);
        } catch (err) {
          setError('Failed to parse message');
          if (options.onError) options.onError(err);
        }
      };

      wsRef.current = ws;
    } catch (err) {
      setError(err.message);
      if (options.onError) options.onError(err);
    }
  }, [url, options]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
  }, []);

  const sendMessage = useCallback((message) => {
    if (wsRef.current && isConnected) {
      wsRef.current.send(typeof message === 'string' ? message : JSON.stringify(message));
    }
  }, [isConnected]);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return {
    isConnected,
    lastMessage,
    error,
    sendMessage,
    connect,
    disconnect
  };
}