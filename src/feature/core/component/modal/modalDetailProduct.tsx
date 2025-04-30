import { Button } from "../../ui";
import { Modal } from "../../ui/Modal"

import { IoMdClose } from "react-icons/io";



interface ModalDetailProductProps {
    showModal: boolean;
    onSucces: () => void;
    nombre: string;
    icon: React.ReactElement;
    valor:number
    description: string;
    idProducto:number
}
  

export const ModalDetailProduct:React.FC<ModalDetailProductProps> = ({showModal, onSucces, nombre,valor, icon, description})=> {
   
    return (
        <Modal show={showModal} size='xs' className='shadow-2xl w-full rounded-3xl'>
            <Modal.Body>
                <div>
                    <div className="justify-end items-center space-x-5 mt-3 relative">
                        <Button className="absolute mt-0 right-0 h-6 w-5 rounded-full hover:bg-primary-500"
                            onClick={() => onSucces()}>
                            <IoMdClose />
                        </Button>
                        <p className='text-gray-900 text-lg font-semibold text-end pr-10'>{nombre}</p>
                        <p className="text-end pr-11">${valor}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                        <div className="col-span-1 flex justify-center items-center w-full mr-4 h-32">
                            {icon}
                        </div>
                        <div className="col-span-1 flex justify-center items-center h-full w-full mr-4">
                            {description}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}