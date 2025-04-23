import { useProductContext } from "@/feature/contex/buyNotifications";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Modal } from "../../ui/Modal"
import { Card } from "../../ui";

interface ModalBuyProductProps {
    showModal: boolean;
    onSucces: (values:boolean) => void;
}


export const ModalBuyEarrings:React.FC<ModalBuyProductProps> = ({showModal,onSucces}) => {
    const {  totalProduct, productNotificacion , setProductNotificacion } = useProductContext();
  return (
   <Modal show={showModal} size='sm' className='shadow-2xl w-full rounded-3xl'>
         <Modal.Body>
           <div className="flex flex-row items-center justify-be pt-2">
               <h1 className="text-lg text-primary-700">
               {productNotificacion.length > 0  ? ' Compras pendientes en el carrito de compras' : 'No tienes compras pendientes'}</h1>
               <span onClick={() => onSucces(false)} className="mx-2 text-2xl text-red-700 absolute  top-3 right-3  hover:cursor-pointer font-semibold">
               <IoCloseCircleOutline  height={10} width={10}/>
               </span>
           </div>
           <div className={`grid grid-cols-${productNotificacion.length} space-x-4 `}>
                {productNotificacion.map((item) => (
                  <Card key={item.id} className="    mt-4 rounded-b-none !rounded-t-2xl border-primary-700">
                    
                    <div className="flex justify-center pt-4">
                        <small>No tiene imagen</small>
                        {/* <span>{item.imagenProducto}</span> */}
                    </div>
                    <div className='text-center mt-3'>
                        <h1>{item.descripcionProducto}</h1>
                        <p className='font-medium'>{item.valorProducto}</p>
                        <p className="text-sm">Cantidad de unidades 1</p>
                    </div>
                    <div className="flex justify-center mt-4 mb-4 text-sm">
                        <button onClick={() => onSucces(true)} className="bg-primary-700 text-white  w-20  py-2 rounded-md">Comprar</button>      
                        <button onClick={() => setProductNotificacion((prev) => prev.filter((i) => i.id !== item.id))} className="bg-red-500 w-16 text-center text-white  py-2 rounded-md ml-2">Eliminar</button>
                    </div>  
                    </Card> ))
                }
               
            </div>
            <p className="text-end mt-3  w-full">Valor total compra : <span className="font-semibold">{'$'+totalProduct.toFixed()}</span></p>
           </Modal.Body>
         </Modal>
  )
}

