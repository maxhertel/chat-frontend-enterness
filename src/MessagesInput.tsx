import React, { useState } from "react";

interface MessagesInputProps {
  send: (value: string) => void;
  changeRoom: (room: string) => void; // Função para mudar de sala
}

const MessagesInput: React.FC<MessagesInputProps> = ({ send, changeRoom }) => {
  const [value, setValue] = useState("");
  const [room, setRoom] = useState("Nest.js"); // Estado para armazenar a sala selecionada

  const handleMessageSend = () => {
    send(value);
    setValue(""); 
  };

  const handleRoomChange = (newRoom: string) => {
    setRoom(newRoom);
    changeRoom(newRoom); // Chama a função changeRoom passando a nova sala
  };

  return (
    <>
      {/* Adiciona um seletor de sala */}
      <select value={room} onChange={(e) => handleRoomChange(e.target.value)}>
        <option value="Nest.js">Nest.js</option>
        <option value="React">React</option>
        <option value="PHP">PHP</option>
      </select>
      <input
        placeholder="Escreva a mensagem"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleMessageSend}>Enviar</button>
    </>
  );
};

export default MessagesInput;
