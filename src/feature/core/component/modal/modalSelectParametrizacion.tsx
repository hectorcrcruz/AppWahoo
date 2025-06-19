import React from 'react';
import { Modal } from '../../ui/Modal';
import { IoIosCloseCircle } from "react-icons/io";

interface Props {
  onSelect: (id: number) => void;
  showModal: boolean;
}

export const ModalSelectParametrizacion: React.FC<Props> = ({ onSelect,   showModal }) => {
  const opciones = [
    { id: 1, nombre: 'DomiYa' },
    { id: 2, nombre: 'SuperApp' },
    { id: 3, nombre: 'Tienda X' }
  ];

  return (
   

    <Modal  show={showModal} size='sm' className='shadow-2xl w-full rounded-3xl'>
                   <Modal.Body>
                    <h2 className="text-xl mb-4 font-semibold">Selecciona tu parametrización</h2>
                       <ul className="space-y-2">
          {opciones.map((opcion) => (
            <li key={opcion.id}>
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => onSelect(opcion.id)}
              >
                {opcion.nombre}
              </button>
            </li>
          ))}
        </ul>       
                       
                   </Modal.Body>
               </Modal>
  );
};