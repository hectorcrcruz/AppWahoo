import { Button } from "../../ui";
import { Modal } from "../../ui/Modal";
import { IoMdClose } from "react-icons/io";

interface PaymentMethodModalProps {
  showModal: boolean;
  onClose: () => void;
  onSelect: (method: 'virtual' | 'efectivo') => void;
}

export const ModalTypePay: React.FC<PaymentMethodModalProps> = ({
  showModal,
  onClose,
  onSelect,
}) => {
  return (
    <Modal show={showModal} size="sm" className="shadow-2xl rounded-2xl">
      <Modal.Body>
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <IoMdClose size={20} />
        </button>

        {/* Título */}
        <h2 className="text-xl font-semibold text-gray-900">
          Selecciona Método de Pago
        </h2>

        {/* Opciones de pago */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button
            onClick={() => onSelect('virtual')}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg hover:from-blue-500 hover:to-blue-700 transform hover:scale-105 transition"
          >
            Pago Virtual
          </Button>
          <Button
            onClick={() => onSelect('efectivo')}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition"
          >
            Pago en Efectivo
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
