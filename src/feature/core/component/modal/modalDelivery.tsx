import { useProductContext } from "@/feature/contex/buyNotifications";
import { Modal } from "../../ui/Modal";
import { useNavigate } from "react-router-dom";

interface ModalDeliveryProps {
  showModal: boolean;
  onClose: () => void;
  numeroEntrega: string | number;
}

export const ModalDelivery: React.FC<ModalDeliveryProps> = ({
  showModal,
  onClose,
  numeroEntrega,
}) => {
  const navigate = useNavigate();

  const {  setProductNotificacion} = useProductContext();

  const handleAceptar = () => {
    onClose(); 
    navigate("/");
    setProductNotificacion([])
  };

  return (
    <Modal show={showModal} size="sm" className="shadow-2xl rounded-2xl">
      <Modal.Body>
        <div className="flex flex-col items-center text-center p-6">
          <h2 className="text-xl font-bold text-gray-800">
            ¡Pedido confirmado!
          </h2>
          <p className="mt-4 text-gray-600">
            Tu número de entrega es:
          </p>
          <p className="mt-2 text-2xl font-bold text-indigo-600">
            {numeroEntrega}
          </p>
          <button
            onClick={handleAceptar}
            className="mt-6 w-full  bg-gradient-to-tr  from-primary-600  to-primary-400 hover:bg-primary-700 text-white py-2 rounded-lg transition"
          >
            Aceptar
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
