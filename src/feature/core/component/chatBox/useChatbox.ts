import { io } from "socket.io-client";

const socket = io("https://chatboxwhaoo.onrender.com", {
  transports: ["websocket"], 
  autoConnect: true,
});





socket.on("connect", () => {
  console.log("Socket conectado con ID:", socket.id);
  socket.emit("join_room", "chatroom");
});

socket.on("connect_error", (err) => {
  console.error("❌ Error de conexión con Socket.IO:", err);

});

socket.on("receive_message", (data) => {
  console.log("💬 Mensaje recibido del bot:", data);
});



export default socket;