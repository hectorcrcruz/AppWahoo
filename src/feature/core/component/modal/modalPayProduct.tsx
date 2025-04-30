import { RegisterUserForm } from "@/feature/auth/login"
import { Modal } from "../../ui/Modal"
import { useLocation } from "react-router-dom"


interface ModalBuyProductProps {
    showModal: boolean;
    onSucces: (values:boolean) => void;
}

export const ModalPayProduct:React.FC<ModalBuyProductProps> = ({showModal, onSucces}) => {
const location = useLocation()
const isLocation = location.pathname.includes('/home')
    

  return (
    <Modal show={showModal} size='xs' className='shadow-2xl w-full rounded-3xl'>
      <Modal.Body>
        <div className="flex flex-col items-center justify-center pt-2">
            <h1 className="text-lg text-primary-700">Información personal para realizar el pago</h1>
        </div>
         <RegisterUserForm  onSucces={onSucces} isLocation={isLocation} className='mx-auto w-11/12 justify-center 2xl:w-[394px] mt-5' onSuccess={() => console.log('success')} />
        </Modal.Body>
      </Modal>
  )
}

