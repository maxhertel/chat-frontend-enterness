import React, { useState } from "react";

interface MessagesInputProps {
  send: (value: string) => void;
}

const MessagesInput: React.FC<MessagesInputProps> = ({ send }) => {
  const [value, setValue] = useState("");

  const handleMessageSend = () => {
    send(value);
    setValue(""); 
  };

  return (
    <>
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
