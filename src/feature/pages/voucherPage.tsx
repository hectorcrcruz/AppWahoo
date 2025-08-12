import { useState } from 'react';
import { useProductContext } from '../contex/buyNotifications';
import { Button } from '../core';
import { ListComponent } from '../core/component'
import { ModalPayProduct } from '../core/component/modal';
import { BaseLayout } from '../core/ui/base-layout';
import { useLocation } from 'react-router-dom';

interface Table {
  descripcionProducto: string;
  categoriaProductoId: number;
  detalleProducto: string;
  valorProducto: number;
  totalProducto: number;
  id: number;
  cantidad: number;
}

export const VoucherPage = () => {
  const { productNotificacion, totalCantidad } = useProductContext();
  const [showModal, setShowModal] = useState(false)
   const location = useLocation();
   const  validateLocation = location.pathname.includes(':virtual');


  const listaConTotal = productNotificacion.map(item => {
    const cantidad = totalCantidad[item.id] || 0;
    return {
      ...item,
      cantidad,
      totalProducto: item.valorProducto * cantidad
    };
  });

  // Calcular total general sumando todos los totales de producto
  const valorTotalPagar = listaConTotal.reduce((acc, item) => acc + item.totalProducto, 0);

  return (
    <> 
    <BaseLayout header navBar={false}> 
      <div className='mt-10 md:mt-5 w-10/12 mx-auto'>
        <h1 className='text-2xl m-4'>Comprobante de pago</h1>
        <ListComponent<Table> dataList={listaConTotal} module={'Table'} />

        <p className='text-right mt-5 mr-5 font-medium text-lg'>
          Total a pagar: {valorTotalPagar.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
        </p>
        {validateLocation && (
           <Button
        type="button"
         onClick={() => setShowModal(true)}
        className="w-16 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center transition-shadow shadow-sm hover:shadow-lg"
        >
          <span>Pagar</span>
        </Button>
        )}
       
      </div>
    </BaseLayout>
     

     <ModalPayProduct
          showModal={showModal} 
          onSucces={() => setShowModal(false)}  
        />
    </>
  );
};
