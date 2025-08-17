import { Wrapper } from "@/feature/core/ui/wrapper";
import { LoginForm } from "./login-form";
import { AuthValues } from "@/feature/core/types/user";
import { useParametrizacionContext } from "@/context/parametrizacionContext";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const handleSuccess = (values: AuthValues) => {
    console.log(values);
  }; 

    const { parametros } = useParametrizacionContext();
    const navigate = useNavigate()

    const handleNavigations = () => {
      navigate(-1);
    };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 relative">
      {/* Encabezado fijo */}
      <div style={{ backgroundColor: parametros?.colorPrimario }} className=' w-full h-16 fixed top-0 left-0 z-10 flex items-center justify-center'>
         <img src={parametros?.logo} alt='Logo' className='h-12' />
          <div className="fixed left-4">
            <FaArrowCircleLeft onClick={() => handleNavigations()} className="text-white w-7 h-7 hover:text-gray-500 cursor-pointer" />
          </div>

      </div>

      {/* Contenido principal */}
      <Wrapper className='flex flex-col md:flex-row items-center justify-center w-full  md:mt-20 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl'>
          
          {/* Imagen (solo visible en md+) */}
          <div className="hidden md:flex items-center justify-center">
            <picture>
              <img
                src={parametros?.backgroundImagen}
                alt="backgroundLogin"
                className="w-80 lg:w-96 xl:w-[450px]"
              />
            </picture>
          </div>

          {/* Formulario */}
          <div id="Formulario" className="w-full max-w-md mx-auto border border-[#73008A] rounded-md bg-white shadow-md px-6 py-8">
            <div className="mb-6">
              <h2 className="text-xl text-center font-semibold text-gray-800">Recuperar Cuenta</h2>
            </div>

            <LoginForm
              className='mx-auto w-full'
              onSuccess={handleSuccess}
            />

            <div className='flex flex-col items-center text-center justify-around pt-8'>
              <p className='text-sm text-gray-500 opacity-75'>
                {`© ${new Date().getFullYear()} Copyright Wahoo - Todos los derechos reservados`}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
