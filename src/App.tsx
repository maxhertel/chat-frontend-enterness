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

  const changeRoom = (newRoom: string) => {
    socket?.emit('changeRoom', newRoom); // Envia uma mensagem para o servidor informando a mudança de sala
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

  useEffect(() => {
    // Recebe a mensagem quando o usuário entra em uma nova sala
    const roomChangedListener = (room: string) => {
      setMessages([]); // Limpa as mensagens ao mudar de sala
    };

    socket?.on('roomChanged', roomChangedListener);

    return () => {
      socket?.off('roomChanged', roomChangedListener);
    };
  }, [socket]);

  return (
    <div className="app">

      <MessagesInput send={send} changeRoom={changeRoom} /> {/* Passa a função changeRoom para o MessagesInput */}
      <Messages messages={messages} />
    </div>
  );
};

export default App;
