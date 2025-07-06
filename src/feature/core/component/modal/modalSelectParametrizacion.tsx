import React, { useEffect, useState } from 'react';
import { Modal } from '../../ui/Modal';
import { getListParametrizacion, ListParams } from '../../services/listParametrizacionService';


interface Props {
  onSelect: (id: number) => void;
  showModal: boolean;
}

export const ModalSelectParametrizacion: React.FC<Props> = ({ onSelect,   showModal }) => {

   const [params, setParams] = useState<ListParams[]>()
 
  
  const getParametros = async () => {
    try {
       const resp = await getListParametrizacion()
       setParams(resp)
    } catch (error) {
       console.log(error)
    }

  }



  useEffect(() => {
    getParametros()
  }, [])
  

  return (
   

    <Modal  show={showModal} size='sm' className='shadow-2xl w-full rounded-3xl'>
                   <Modal.Body>
                    <h2 className="text-xl mb-4 font-semibold">Selecciona tu parametrización</h2>
                       <ul className="space-y-2">
          {params && params.map((opcion) => (
            <li key={opcion.id}>
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => onSelect(opcion.id)}
              >
                {opcion.nombreApp}
              </button>
            </li>
          ))}
        </ul>       
                       
                   </Modal.Body>
               </Modal>
  );
};