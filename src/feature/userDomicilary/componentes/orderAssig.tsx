import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Lottie from "lottie-react";

import homeGif from "@/assets/Emptybox.json";
import { FaStopwatch } from "react-icons/fa6";
import scooterAnimation from "@/assets/Manredscooter.json";

interface Pedido {
  id: number;
  cliente: string;
  direccion: string;
  estado: "pendiente" | "en_camino" | "entregado";
}

const pedidosMock: Pedido[] = [
  { id: 1, cliente: "Juan Pérez", direccion: "Calle 123 #45-67", estado: "pendiente" },
  { id: 2, cliente: "Ana López", direccion: "Carrera 10 #12-34", estado: "en_camino" },
  { id: 3, cliente: "Carlos Ruiz", direccion: "Av. Siempre Viva 742", estado: "pendiente" },
];

export const OrderAssig = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMock);
  // 👇 breakpoints
  const isSmall = useMediaQuery({ maxWidth: 640 });
 

  const cambiarEstado = (id: number, nuevoEstado: Pedido["estado"]) => {
    setPedidos(prev =>
      prev.map(p => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
  };

  return (
    <div className="h-auto bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📦 Pedidos Asignados</h1>

      <div className="grid gap-4">
        {pedidos.map(pedido => (
          <div
            key={pedido.id}
            className="bg-white shadow-md rounded-lg p-4 border flex flex-col sm:flex-row justify-between items-start sm:items-center relative"
          >
            <div>
              <p className="font-semibold">Cliente: {pedido.cliente}</p>
              <p className="text-gray-600">Dirección: {pedido.direccion}</p>
              <p className="text-sm mt-1">
                Estado:{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    pedido.estado === "pendiente"
                      ? "bg-yellow-200 text-yellow-800"
                      : pedido.estado === "en_camino"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {pedido.estado}
                </span>
              </p>
            </div>

            {/* Animación según estado */}
            {pedido.estado === "pendiente" && (
              <div className="absolute bottom-4 left-64 w-16 h-16">
                <FaStopwatch className="text-3xl text-primary-500" />
              </div>
            )}

            {pedido.estado === "en_camino" && (
              <motion.div
                className="absolute bottom-4 w-28 h-28"
                animate={{ x: [0, isSmall ? -60 : 100, 0] }} // 👈 depende del tamaño de pantalla
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Lottie animationData={scooterAnimation} loop={true} />
              </motion.div>
            )}

            {pedido.estado === "entregado" && (
              <motion.div
                className="absolute bottom-4 left-60 w-24 h-24 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <Lottie animationData={homeGif} loop={true} />
                <span className="text-green-700 font-semibold mt-20 absolute">
                  ¡Entregado!
                </span>
              </motion.div>
            )}

            <div className="flex gap-2 mt-3 sm:mt-0">
              {pedido.estado === "pendiente" && (
                <button
                  onClick={() => cambiarEstado(pedido.id, "en_camino")}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Iniciar Entrega
                </button>
              )}
              {pedido.estado === "en_camino" && (
                <button
                  onClick={() => cambiarEstado(pedido.id, "entregado")}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Marcar Entregado
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
