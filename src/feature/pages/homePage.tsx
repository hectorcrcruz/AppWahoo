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
  const { isAuthenticated } = useAuthStore();
  const [searchValues, setSearchValues] = useState<string | number | undefined>();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { dataList } = useGetList<Producto>({ moduleRour: 'Producto', searchId: searchValues });

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
      <BaseLayout header navBar={true}>
        <div className="p-0 min-h-screen relative">
          <div>
            <Promotion
              searchValues={searchValues}
              OnchagueValues={(values) => setSearchValues(values)}
            />
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
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-600 hover:cursor-pointer hover:text-primary-700 transition-colors"
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
  );
};
