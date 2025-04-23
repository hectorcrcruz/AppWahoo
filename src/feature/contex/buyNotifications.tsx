import { createContext, useContext, useMemo, useState } from 'react';
import { Producto } from '../core/component/carruselHome/carruselHome';


type BuyNotificationContextType = {
    productNotificacion: Producto[]
    setProductNotificacion: React.Dispatch<React.SetStateAction<Producto[]>>   
    totalProduct: number       
    setTotalProductos: React.Dispatch<React.SetStateAction<number>>
}


const ProductContext = createContext<BuyNotificationContextType | undefined>(undefined);


export const ProductProvider = ({children}: {children: React.ReactNode}) => {
    const [productNotificacion, setProductNotificacion] = useState<Producto[]>([])
    const [totalProduct, setTotalProductos] = useState<number>(0);

    const contextValue = useMemo(() => ({
        productNotificacion,
        setProductNotificacion,
        totalProduct,
        setTotalProductos
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