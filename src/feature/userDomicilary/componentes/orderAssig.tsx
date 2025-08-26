
import { motion } from "framer-motion";

import Lottie from "lottie-react";

import homeGif from "@/assets/Emptybox.json";
import { FaStopwatch } from "react-icons/fa6";
import scooterAnimation from "@/assets/Manredscooter.json";
import foodAccept from '@/assets/FoodOrder.json'
import { FaseDomici } from "@/feature/core/const/domicilio";
import useOrderAssig, { estadoConfig } from "../hooks/useOrderAssig";







export const OrderAssig = () => {
  const { cambiarEstado, isSmall, pedidos } = useOrderAssig()

  return (
    <div className="h-auto bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        📦 Pedidos Asignados
      </h1>

      <div className="grid gap-4">
        {pedidos?.map((pedido) => {
          const estado = estadoConfig[pedido.faseDomicilioId];

          return (
            <div
              key={pedido.id}
              className="bg-white shadow-md rounded-lg p-4 border flex flex-col sm:flex-row justify-between items-start sm:items-center relative"
            >
              <div>
                <p className="font-semibold">
                  Cliente: {pedido.cliente}
                </p>
                <p className="font-semibold">
                  {pedido.descripcionDomicilio}
                </p>
                <p className="text-gray-600 text-sm md:text-base">Dirección: {pedido.direccion}</p>
                <p className="text-sm mt-1">
                  Estado:{" "}
                  <span className={`px-2 py-1 rounded ${estado.color}`}>
                    {estado.label}
                  </span>
                </p>
              </div>

              {/* Animaciones según estado */}
              {pedido.faseDomicilioId === FaseDomici.Domicilio_Pendiente && (
                <div className="absolute bottom-0 left-56 md:left-64 w-16 h-16">
                  <FaStopwatch className="text-3xl text-primary-500" />
                </div>
              )}

              {pedido.faseDomicilioId === FaseDomici.Domicilio_en_camino && (
                <motion.div
                  className="absolute bottom-4 left-44 sm:left-48 md:left-72  h-24 w-24 md:w-28 md:h-28 flex flex-col items-center"
                  animate={{ x: [0, isSmall ? -40 : 80, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Lottie animationData={scooterAnimation} loop={true} />
                </motion.div>
              )}

              {pedido.faseDomicilioId === FaseDomici.Domicilio_Entregado && (
                <motion.div
                  className="absolute top-14 md:top-5  left-2/4 md:left-64 mx-12 md:mx-0 
                             flex flex-col justify-end items-center w-20 h-20 md:w-24 md:h-24"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Lottie animationData={homeGif} loop={true} />
                  <span className="text-green-700 font-semibold text-xs md:text-base mt-10 md:mt-20 absolute">
                    ¡Entregado!
                  </span>
                   </motion.div>
                 )}

               {pedido.faseDomicilioId === FaseDomici.Domicilio_Aceptado && (
                <motion.div
                  className="absolute bottom-4 md:bottom-6 left-40 sm:left-48 md:left-72 w-20 h-20 flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Lottie animationData={foodAccept} loop={true} />
                </motion.div>
              )}

              {/* Botones de acción */}
              <div className="flex gap-2 mt-3 sm:mt-0">
                {pedido.faseDomicilioId === FaseDomici.Domicilio_Creado  && (
                  <button
                    onClick={() =>
                      cambiarEstado(pedido.id, FaseDomici.Domicilio_Aceptado)
                    }
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Aceptar Domicilio
                  </button>
                )}

               {(pedido.faseDomicilioId === FaseDomici.Domicilio_Aceptado || 
                 pedido.faseDomicilioId === FaseDomici.Domicilio_Pendiente) && (
                 <button
                   onClick={() =>
                     cambiarEstado(pedido.id, FaseDomici.Domicilio_en_camino)
                   }
                   className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                 >
                   Iniciar Entrega
                 </button>
                  )}

                {pedido.faseDomicilioId === FaseDomici.Domicilio_en_camino && (
                  <button
                    onClick={() =>
                      cambiarEstado(pedido.id, FaseDomici.Domicilio_Entregado)
                    }
                    className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                  >
                    Marcar Entregado
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
