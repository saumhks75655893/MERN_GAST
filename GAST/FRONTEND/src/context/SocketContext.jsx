import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_BASE_URL}`); // or your backend devtunnel URL
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = (event, data) => {
    if (socket) socket.emit(event, data);
  };

  const receiveMessage = (event, callback) => {
    if (socket) socket.on(event, callback);
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
