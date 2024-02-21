import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import MessagesInput from './MessagesInput';
import Messages from './Messages';

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [messages, setMessages] = useState<string[]>([]);

  const send = (value: string) => {
    socket?.emit('message', value);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:8001');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Desconecta o socket ao desmontar o componente
    };
  }, []);

  useEffect(() => {
    const messageListener = (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket?.on('message', messageListener);

    return () => {
      socket?.off('message', messageListener); // Remove o ouvinte de eventos ao desmontar o componente
    };
  }, [socket]);

  return (
    <div className="app">
      <MessagesInput send={send} />
      <Messages messages={messages} />
    </div>
  );
};

export default App;
