import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Producto } from '../core/component/carruselHome/carruselHome';


type BuyNotificationContextType = {
    productNotificacion: Producto[]
    setProductNotificacion: React.Dispatch<React.SetStateAction<Producto[]>>   
    totalProduct: number       
    setTotalProductos: React.Dispatch<React.SetStateAction<number>>
    setTotalCantidad: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>;
    totalCantidad: { [id: string]: number }
}


const ProductContext = createContext<BuyNotificationContextType | undefined>(undefined);


export const ProductProvider = ({children}: {children: React.ReactNode}) => {
    const [totalProduct, setTotalProductos] = useState<number>(0);
    const [totalCantidad, setTotalCantidad] = useState<{ [id: string]: number }>({});
    const [productNotificacion, setProductNotificacion] = useState<Producto[]>(() => {
        const stored = localStorage.getItem('productNotificacion');
        return stored ? JSON.parse(stored) : [];
      });

  
    useEffect(() => {
        localStorage.setItem('productNotificacion', JSON.stringify(productNotificacion));
      }, [productNotificacion]);

      useEffect(() => {
        const total = productNotificacion.reduce((acc, item) => acc + item.valorProducto, 0);
        setTotalProductos(total);
      }, [productNotificacion]);

    

    const contextValue = useMemo(() => ({
        productNotificacion,
        setProductNotificacion,
        totalProduct,
        setTotalCantidad,
        totalCantidad,
        setTotalProductos,
    
    }), [productNotificacion, totalProduct]);

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {    
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext debe usarse dentro de un ProductProvider");
    }
    return context;
}