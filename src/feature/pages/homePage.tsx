
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "@/feature/core/ui/base-layout";

import { Spinner } from "../core";

import { useAuthStore } from '../contex/AuthContext';
import { CarruselHome } from "../core/component/carruselHome/carruselHome";
import { Promotion } from "../core/component/promotion";
import { useGetList } from "../core/services/useGetList";
import { ProductProvider } from "../contex/buyNotifications";



interface Producto {
  id: number;
  descripcionProducto: string;
  detalleProducto: string;
  stock: number;
  valorProducto: number;
  imagenProducto: number;
  categoriaProductoId: number;
  usuarioAdd: string;
  estado: number;
  fechaAdd: string; 
}





export const HomePage = () => {
   const { isAuthenticated } = useAuthStore()
   const [searchValues, setSearchValues] = useState<string | number | undefined>()
   const navigate = useNavigate();
   const {dataList} = useGetList<Producto>({moduleRour: 'Producto', searchId: searchValues}) 

 
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <Spinner className='fixed inset-0 flex items-center justify-center text-red-300' />
    );
  }

 

  return (
    <BaseLayout
    header
    navBar={true}  
  >
  <div className="p-0 h-min-screen bg-primary-50/15"> 
    <div> 
   <Promotion searchValues={searchValues} OnchagueValues={(values) => setSearchValues(values)} />
   </div>
   <div>
   
    <CarruselHome  Producto={dataList} />
   
   </div>
  </div>
    </BaseLayout>
  )
}


