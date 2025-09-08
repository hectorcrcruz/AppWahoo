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
import { useDomicilioContext } from "../userDomicilary/contex/useContexDomicilio";
import { CardComponentPage } from "./cardComponentPage";
import { DashboardReports } from "./dashboarReports";

export const HomePage = () => {
  const { isAuthenticated  , rolId} = useAuthStore();
     const {  searchFilter } = useDomicilioContext();
 
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { dataList } = useGetList<Producto>({ moduleRour: 'Producto', searchId: searchFilter });


  const userRole = (rolId === 1 || rolId === 2 ) 

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
    { userRole ? (
      <BaseLayout header navBar={true}>
      <DashboardReports />
      </BaseLayout>

      
    ) :(
      <>
      <BaseLayout header navBar={true}>
        <div className="p-0 min-h-screen relative">
          <div>
            <Promotion />
          </div>
          <div>
            <CarruselHome Producto={dataList} />
          </div>
          {/* Botón flotante del chat, responsive */}
          <div
            onClick={() => setShowModal(true)}
            className="fixed bottom-4 right-4 z-50 flex items-center justify-center"
          >
            <Tooltip text="Chat" className="!top-0 !left-0">
              <BiSolidUserPin
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-300 hover:cursor-pointer hover:text-primary-500 transition-colors"
              />
            </Tooltip>
          </div>
        </div>
      </BaseLayout>

      <ModalChatBox
        showModal={showModal}
        onSucces={() => setShowModal(false)}
      />
       </>

    )}
      
    </>
  );
};
