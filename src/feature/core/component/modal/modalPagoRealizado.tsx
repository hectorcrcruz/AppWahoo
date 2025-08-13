import { Modal } from "../../ui/Modal";


interface ModalPagoRealizadoProps {
  show: boolean;
  onClose: () => void;
}

export const ModalPagoRealizado: React.FC<ModalPagoRealizadoProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} size="sm" className="shadow-2xl rounded-3xl w-full max-w-md mx-auto">
      <Modal.Body>
        <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
          <h2 className="text-xl font-bold text-green-600">¡Pago realizado con éxito!</h2>
          <p className="mt-4 text-gray-600">
            Gracias por tu compra. Puedes revisar tu historial en el perfil.
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full bg-gradient-to-tr from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white py-2 rounded-lg transition"
          >
            Cerrar
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
