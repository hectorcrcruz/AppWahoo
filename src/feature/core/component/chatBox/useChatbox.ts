import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
   autoConnect: true,
});
socket.on("connect", () => {
  console.log("Socket conectado con ID:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Error de conexión con Socket.IO:", err);
});


// socket.on("receive_message", (data) => {
//   console.log("Socket conectado con ID:", data);
// });



export default socket;