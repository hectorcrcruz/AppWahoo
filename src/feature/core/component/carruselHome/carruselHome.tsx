
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Button } from '../../ui';




import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";

import { Toaster, toast } from 'react-hot-toast'
import { ModalDetailProduct } from '../modal';
import { useEffect, useMemo, useState } from 'react';
import { useProductContext } from '@/feature/contex/buyNotifications';
import Tooltip from "../../ui/Tooltip/Tooltip";


export const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaAngleDoubleRight
    className={`${className} !text-primary-700`}
      style={{ ...style,  fontSize: '30px' }}
      onClick={onClick}
    />
  );
};

export const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaAngleDoubleLeft
    className={`${className} !text-primary-700`}
      style={{ ...style,  fontSize: '30px' }}
      onClick={onClick}
    />
  );
};


export interface Producto {
  id: number;
  descripcionProducto: string;
  stock: number;
  valorProducto: number;
  imagenProducto: string;
  categoriaProductoId: number;
  detalleProducto:string
  usuarioAdd: string;
  estado: number;
  fechaAdd: string;
 
}

interface CarruselHomeProps {
  Producto: Producto[];
}

export const CarruselHome:React.FC<CarruselHomeProps> = ({Producto}) => {
    

  const [idProducto, setIdProducto] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const [product, setProduct] = useState<Producto[]>([])
  const {  setTotalProductos ,setProductNotificacion, productNotificacion } = useProductContext();

  const productForId = Producto.find((item) => item.id === idProducto);

 

      const handleClick = (itemId: number) => {
        setIdProducto(itemId)
        setShowModal(true)

      }

   
     const totalProduct =  useMemo(() => 
        product.reduce((producaa, item) => producaa + item.valorProducto, 0)
        , [product])
 
        useEffect(() => {
          setTotalProductos(totalProduct);
        }, [totalProduct, setTotalProductos]);
     
    
      

      const handleBuy = (itemId: number) => {
        const itemToAdd = Producto.find((item) => item.id === itemId);
        if (!itemToAdd) return; 

        const alreadyInCart = productNotificacion.find((item) => item.id === itemToAdd.id);
     
        if(alreadyInCart) {
          toast.error('El producto ya está en el carrito', {
            icon: '❌',
          });
        }else {
          toast.success('🛒  Producto añadido al carrito', {
            icon: '✅', 
          });
           setProduct((prev) => [...prev, itemToAdd]);
           setProductNotificacion((prev) => [...prev, itemToAdd]);
           
        }
       
        
      }

  return (
    <> 
    
  <div className="w-full h-full grid md:grid-cols-3 justify-center items-center"> 
    {Producto.length > 0 ? Producto.map((item) => (
       <div key={item.id} className="flex flex-col items-center mt-10">
    <div onClick={() => handleClick(item.id)} className="overflow-hidden rounded-md">
      <img
        src={item.imagenProducto}
        alt={item.descripcionProducto}
        className="
          w-72 h-48 object-cover
          transform transition-transform duration-300
          hover:scale-125 hover:shadow-md hover:cursor-pointer
        "
      />
    </div>
    <div className="mt-2 w-72 flex flex-col items-start">
      <h1 className="font-semibold">{item.descripcionProducto}</h1>
      <div className="flex items-center justify-between w-full mt-1">
        <span className="font-semibold text-lg"> {` $${item.valorProducto}`}</span>
        <div className="flex gap-2">
          
          <Tooltip text="Añadir al carrito" >
          <Button
            type="button"
            onClick={() => handleBuy(item.id)}
            className="w-10 h-10 bg-gradient-to-b from-[#a20f5c] to-[#d53287] rounded-full flex items-center justify-center transition-shadow shadow-sm hover:shadow-lg"
          >
            <GiShoppingCart />
          </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>

    )) : (
      <div className="flex justify-center items-center h-96 w-full">
        <h1 className="text-2xl font-bold text-primary-700 text-center">
          No hay productos disponibles
        </h1>
      </div>
    )}
   </div>

    <div>
      <ModalDetailProduct
      idProducto={idProducto}
        showModal={showModal} 
        onSucces={() => setShowModal(false)} 
        nombre={productForId?.descripcionProducto ?? ''}
        description={productForId?.detalleProducto ?? ''}
        valor={productForId?.valorProducto ?? 0}
        icon={productForId?.imagenProducto ?? ''} 
      />
    </div>
     
    
    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{
        className: '',
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}
    />
    </>
  )}


