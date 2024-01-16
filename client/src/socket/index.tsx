import React, { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';

const SocketContext = createContext(null);

interface Props {
  id: string;
  children: React.ReactNode;
}

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ id, children }: Props) {
  const [socket, setSocket] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(():any=> {
     
    const newSocket = io("http://localhost:3001", { query: { id } });
    newSocket.on("connect", () => {
      setSocket(newSocket);
      setLoading(false);
    });
    return () => newSocket.close();
 
  }, [id]);

  if (loading) {
    return null;
  }
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
