import { io } from "socket.io-client";

const socket = io("https://chatboxwhaoo.onrender.com", {
  transports: ["websocket"],
   autoConnect: true,
});

const roomId = socket.id || crypto.randomUUID();



socket.on("connect", () => {
  console.log("Socket conectado con ID:", socket.id);
  socket.emit("join_room", roomId);
});

socket.on("connect_error", (err) => {
  console.error("❌ Error de conexión con Socket.IO:", err);

});

socket.on("receive_message", (data) => {
  console.log("💬 Mensaje recibido del bot:", data);
});

// socket.on("receive_message", (data) => {
//   console.log("Socket conectado con ID:", data);
// });



export default socket;