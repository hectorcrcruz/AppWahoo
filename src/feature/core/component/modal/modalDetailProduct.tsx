import { Button } from "../../ui";
import { Modal } from "../../ui/Modal"

import { IoMdClose } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { FaShopify } from "react-icons/fa6";
import { useState } from "react";

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
    const [cantidad, setCantidad] = useState(1);

    const incrementar = () => setCantidad(prev => prev + 1);
    const decrementar = () => setCantidad(prev => prev > 1 ? prev - 1 : 1);

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

                    <div className="flex justify-between items-center space-x-4 mt-4">

                        <Button
                            className='w-48 flex bg-gradient-to-b from-[#d7d886] to-[#d2d532] text-white transition-all hover:brightness-110 duration-500'
                        >
                            <GiShoppingCart /> Añadir al carrito 
                        </Button> <span className="my-1 text-lg font-semibold">{cantidad}</span>

                        {/* Contador de cantidad */}
                        <div className="flex flex-col items-center h-10 justify-center border rounded-sm p-2 bg-gray-100">
                            <button
                                onClick={incrementar}
                                className="text-lg font-bold text-gray-700 hover:text-green-600 pt-5 leading-5"
                            >
                                +
                            </button>

                            <button
                                onClick={decrementar}
                                className="text-lg font-bold text-gray-700 hover:text-red-600    pb-9 items-start flex leading-3"
                            >
                                _
                            </button>

                           
                        </div>

                        <Button
                            className="flex bg-gradient-to-b from-[#a20f5c] to-[#d53287]"
                            onClick={() => onSucces()}
                        >
                            <FaShopify /> Comprar
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}