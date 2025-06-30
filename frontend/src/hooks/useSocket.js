import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5001';

export const useSocket = (pharmacy) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!pharmacy) return;

    if (!socketRef.current) {
      const socket = io(SOCKET_URL, {
        withCredentials: true,
      });

      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
        socket.emit('subscribe', pharmacy);
        console.log('Subscribed to room:', `user_${pharmacy}`);
      });

      socketRef.current = socket;
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [pharmacy]);

  return socketRef.current;
};
