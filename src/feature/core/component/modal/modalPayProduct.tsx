import { RegisterUserForm } from "@/feature/auth/login";
import { Modal } from "../../ui/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalPagoRealizado } from "./modalPagoRealizado";
import { useProductContext } from "@/feature/contex/buyNotifications";


interface ModalBuyProductProps {
  showModal: boolean;
  onSucces: (values: boolean) => void;
}

export const ModalPayProduct: React.FC<ModalBuyProductProps> = ({ showModal, onSucces }) => {
  const location = useLocation();
  const isLocation = location.pathname.includes('/home');
  const { setProductNotificacion } = useProductContext();

  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigations = useNavigate()

  const handleFormSuccess = () => {
     
    setShowSuccessModal(true);
  };



  return (
    <>
      <Modal show={showModal} size="xs" className="shadow-2xl w-full rounded-3xl">
        <Modal.Body>
          <div className="flex flex-col items-center justify-center pt-2">
            <h1 className="text-lg text-primary-700">
              Información personal para realizar el pago
            </h1>
          </div>

          <RegisterUserForm
            onSucces={onSucces}
            isLocation={isLocation}
            className="mx-auto w-11/12 justify-center 2xl:w-[394px] mt-5"
            onSuccess={handleFormSuccess}
          />
        </Modal.Body>
      </Modal>

     
      <ModalPagoRealizado
        show={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onSucces(true); 
          setProductNotificacion([])
          navigations('/home')
        }}
      />
    </>
  );
};
