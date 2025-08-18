import { Wrapper } from "@/feature/core/ui/wrapper";
import { RegisterUserForm } from "@/feature/auth/login/register-user-form";

import { InfoRegisterUser } from "@/feature/core/types/user";
import { useParametrizacionContext } from "@/context/parametrizacionContext";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";
import { createUser } from "../services/createUser";
import { Spinner } from "@/feature/core";
import { ModalDelivery } from "@/feature/core/component/modal";

export const RegisterUser = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

   const handleSuccess = async (values: InfoRegisterUser) => {
    setIsLoading(true);
    try {
     
      const payload = {
        ...values,
        telefonoUsuario: Number(values.telefonoUsuario),
        usuarioAdd: "sistema",
        rolId: 2,
        estado: 2, 
        login: values.login,
        fechaAdd: new Date().toISOString(), 
      };

      await createUser(payload);
     
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setIsLoading(false);
       setShowModal(true);
    }
  };

   const { parametros } = useParametrizacionContext();
      const navigate = useNavigate()
  
      const handleNavigations = () => {
        navigate(-1);
      };

     if (isLoading) {
  return (
    <Spinner className="fixed inset-0 flex items-center justify-center text-red-300" />
  );
}



  return (
    <>  
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 relative">
      {/* Header fijo */}
      <div style={{ backgroundColor: parametros?.colorPrimario }} className="w-full h-16 fixed top-0 left-0 z-10 flex items-center justify-center">
         <img src={parametros?.logo} alt='Logo' className='h-12' />
          <div className="fixed left-4">
            <FaArrowCircleLeft onClick={() => handleNavigations()} className="text-white w-7 h-7 hover:text-gray-500 cursor-pointer" />
          </div>
      </div>

      {/* Contenido principal */}
      <Wrapper className="flex flex-col md:flex-row items-center justify-center w-full mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">

          {/* Imagen (solo en md+) */}
          <div className="hidden md:flex items-center justify-center">
            <picture>
              <img
                src={parametros?.backgroundImagen}
                alt="backgroundLogin"
                className="w-80 lg:w-96 xl:w-[450px] mt-10"
              />
            </picture>
          </div>

          {/* Formulario */}
          <div
            id="Formulario"
            className="w-full max-w-xl mx-auto border border-[#73008A] rounded-md bg-white shadow-md px-6 py-8"
          >
            <div className="mb-6">
              <h2 className="text-xl text-center font-semibold text-gray-800">Crear Cuenta</h2>
            </div>

            <RegisterUserForm
              className="mx-auto w-full"
              onSuccess={handleSuccess}
            />

            <div className="flex flex-col items-center text-center justify-around pt-8">
              <p className="text-sm text-gray-500 opacity-75">
                {`© ${new Date().getFullYear()} Copyright Wahoo - Todos los derechos reservados`}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
 {showModal && (
   <ModalDelivery
      TitleText='Usuario creado con éxito'
      textTwo='Ya puedes iniciar sesión con tus credenciales.'
      showModal={showModal}
      onClose={() => setShowModal(false)}
    />
  )}
   
 </>
  );
};
