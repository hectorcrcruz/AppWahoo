
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "@/feature/core/ui/base-layout";

import { Spinner } from "../core";

import { useAuthStore } from '../contex/AuthContext';
import { CarruselHome, Producto } from "../core/component/carruselHome/carruselHome";
import { Promotion } from "../core/component/promotion";
import { useGetList } from "../core/services/useGetList";
import { BiSolidUserPin } from "react-icons/bi";
import Tooltip from "../core/ui/Tooltip/Tooltip";
import { ModalChatBox } from "../core/component/modal/modalChatBox";








export const HomePage = () => {
   const { isAuthenticated } = useAuthStore()
   const [searchValues, setSearchValues] = useState<string | number | undefined>()
   const [showModal, setShowModal] = useState(false)
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
    <>  
    <BaseLayout
    header
    navBar={true}  
  >
  <div className="p-0 h-min-screen bg-primary-50/15"> 
    <div > 
   <Promotion searchValues={searchValues} OnchagueValues={(values) => setSearchValues(values)} />
   </div>
   <div>
    <CarruselHome  Producto={dataList} />
   </div>

     <div  onClick={() => setShowModal(true)} className="justify-end flex h-10   pt-3 absolute right-0">
      <Tooltip  text="Chat" className="!top-0 !left-0">
      <BiSolidUserPin  className="text-7xl md:text-9xl text-primary-600 -mt-10 md:-mt-24    2xl:mt-10 hover:cursor-pointer hover:text-primary-700" />
      </Tooltip>
      
      </div>
  </div>
    </BaseLayout>

    <ModalChatBox showModal={showModal} 
       onSucces={() => setShowModal(false)} />
    </>
  )
}


