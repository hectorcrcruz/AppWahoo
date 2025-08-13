import { useState } from 'react';
import { useProductContext } from '../contex/buyNotifications';
import { Button } from '../core';
import { ListComponent } from '../core/component';
import { ModalDelivery, ModalPayProduct } from '../core/component/modal';
import { BaseLayout } from '../core/ui/base-layout';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// Ruta según tu estructura

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
  const [showModal, setShowModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [numeroEntrega, setNumeroEntrega] = useState<string>("");

  const locations = useLocation();
  const locationsEfectivo = locations.pathname.includes('voucher/:efectivo');

  const handleBuy = () => {
    const idEntrega = uuidv4().slice(0, 8).toUpperCase();
    setNumeroEntrega(idEntrega);
    setShowDeliveryModal(true);
  };

  const listaConTotal = productNotificacion.map(item => {
    const cantidad = totalCantidad[item.id] || 0;
    return {
      ...item,
      cantidad,
      totalProducto: item.valorProducto * cantidad
    };
  });

  const valorTotalPagar = listaConTotal.reduce((acc, item) => acc + item.totalProducto, 0);

  return (
    <> 
      <BaseLayout header navBar={false}> 
        <div className='mt-10 md:mt-5 w-10/12 mx-auto'>
          <h1 className='text-2xl m-4 font-semibold'>Factura del cliente</h1>
          <ListComponent<Table> dataList={listaConTotal} module={'Table'} />

          <p className='text-right mt-5 mr-5 font-medium text-lg'>
            Total a pagar: {valorTotalPagar.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
          </p>
          
          <div className='justify-end flex mx-auto items-start w-full mt-5'> 
            <Button
              type="button"
              onClick={() => {
                if (locationsEfectivo) {
                  handleBuy();
                } else {
                  setShowModal(true);
                }
              }}
              className=" w-auto bg-gradient-to-b hover:bg-yellow-400 hover:font-semibold from-yellow-400 to-yellow-600 rounded-md flex-row items-center justify-center transition-shadow shadow-sm hover:shadow-md"
            > 
              <p className='leading-4 hover:font-semibold'>Finalizar </p> 
              <p className='leading-4 hover:font-semibold'>Compra</p>
            </Button>
          </div>
        </div>
      </BaseLayout>
      
      <ModalPayProduct
        showModal={showModal} 
        onSucces={() => setShowModal(false)}  
      />

      <ModalDelivery
        showModal={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        numeroEntrega={numeroEntrega}
      />
    </>
  );
};
