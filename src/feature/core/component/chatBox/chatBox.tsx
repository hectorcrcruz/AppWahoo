import { useState, useEffect } from 'react';
import socket from './useChatbox';
import { FaUserLarge } from "react-icons/fa6";
import { InputField } from '../../ui/InputField';


type Mensaje = {
  mensaje: string;
  usuario: string;
  fecha: string;
};

export const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Mensaje[]>([]);
  const [mySocketId, setMySocketId] = useState<string | null>(null);

   
   

  useEffect(() => {
    socket.on("connect", () => {
      setMySocketId(socket.id as any);
      socket.emit("join_room", socket.id);
    });

    socket.on(
      "receive_message",
      (data: { message: string; sender: string; timestamp: string }) => {

        if(data.sender !== 'bot') return 
         const nuevo = {
          mensaje: data.message,
          usuario:
            data.sender === "bot"
              ? "Asesor"
              : data.sender === mySocketId
              ? "Tú"
              : "Otro usuario",
          fecha: data.timestamp,
        };
        setChat((prev) => [...prev, nuevo]);
      }
    );

    return () => {
      socket.off("receive_message");
      socket.off("connect");
    };
  }, []);

 const sendMessage = () => {
  if (message.trim()) {
    const nuevoMensaje = {
      mensaje: message,
      usuario: "Tú",
      fecha: new Date().toISOString(),
    };

    setChat((prev) => [...prev, nuevoMensaje]); 

    socket.emit("send_message", {
      room: "chatroom",
      message: message,
    });

    setMessage("");
  }
};

  return (
    <div className='  w-full h-full rounded-3xl'>
      <div className='border-2 border-primary-500 rounded-full w-24 h-24 flex justify-center items-center mx-auto mt-5'> 
      <FaUserLarge  className='text-center w-full text-6xl text-primary-300 '/>
      </div>
      <h1 className='text-center text-xl'>Chat con el Asesor</h1>
     <div className="chat-messages space-y-2 p-4">
  {chat.map((msg, index) => (
    <div
      key={index}
      className={`p-2 rounded-lg ${
        msg.usuario === "Tú" ? "bg-blue-200 text-right ml-auto" : "bg-gray-200 text-left mr-auto"
      } w-fit max-w-xs`}
    >
      <div className="text-sm">{msg.mensaje}</div>
      <div className="text-xs text-gray-500">
        {msg.usuario} • {new Date(msg.fecha).toLocaleTimeString()}
      </div>
    </div>
  ))}
</div>
      <InputField
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

