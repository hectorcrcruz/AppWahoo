import { FaseDomici } from '@/feature/core/const/domicilio';
import { useMediaQuery } from "react-responsive";
import { UpdateDomicilioDTO, upDomiciliosList } from '../services/servicesUserDomi';
import { useDomicilioContext } from '../contex/useContexDomicilio';

export const estadoConfig: Record<
  FaseDomici,
  { label: string; color: string }
> = {
  [FaseDomici.Domicilio_Creado]: {
    label: "Creado",
    color: "bg-gray-200 text-gray-800",
  },
  [FaseDomici.Domicilio_en_Proceso]: {
    label: "En Proceso",
    color: "bg-purple-200 text-purple-800",
  },
  [FaseDomici.Domicilio_Cancelado]: {
    label: "Cancelado",
    color: "bg-red-200 text-red-800",
  },
  [FaseDomici.Domicilio_en_camino]: {
    label: "En Camino",
    color: "bg-blue-200 text-blue-800",
  },
  [FaseDomici.Domicilio_Pendiente]: {
    label: "Pendiente",
    color: "bg-yellow-200 text-yellow-800",
  },
  [FaseDomici.Domicilio_Aceptado]: {
    label: "Aceptado",
    color: "bg-indigo-200 text-indigo-800",
  },
  [FaseDomici.Domicilio_Entregado]: {
    label: "Entregado",
    color: "bg-green-200 text-green-800",
  },
};

export const useOrderAssig = () => {
  const isSmall = useMediaQuery({ maxWidth: 640 });

  const { domicilioList, setDomicilioList } = useDomicilioContext();



  const cambiarEstado = async (id: number, nuevoEstado: FaseDomici) => {
    setDomicilioList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, faseDomicilioId: nuevoEstado } : p))
    );

    const pedido = domicilioList.find((p) => p.id === id);
    if (!pedido) return;

    const dto: UpdateDomicilioDTO = {
      id: pedido.id,
      descripcionDomicilio: pedido.descripcionDomicilio,
      usuarioId: pedido.usuarioId,
      faseDomicilioId: nuevoEstado,
      direccion: pedido.direccion,
      estado: pedido.estado,
      usuarioUp: "Sistema",
      fechaUp: new Date().toISOString(),
    };

    try {
      await upDomiciliosList(dto);
    } catch (error) {
      console.error("Error al actualizar domicilio", error);

      // si falla, se revierte al estado anterior
      setDomicilioList((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, faseDomicilioId: pedido.faseDomicilioId } : p
        )
      );
    }
  };

  return {
    pedidos: domicilioList,  // antes era `pedidos`, ahora sale del contexto
    cambiarEstado,
    isSmall,
  };
};

export default useOrderAssig;
