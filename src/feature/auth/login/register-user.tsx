import { Wrapper } from "@/feature/core/ui/wrapper";
import { RegisterUserForm } from "@/feature/auth/login/register-user-form";
import backgroundLogin from '@/feature/auth/assets/fondoLogin.png';
import { InfoRegisterUser } from "@/feature/core/types/user";

export const RegisterUser = () => {
  const handleSuccess = (values: InfoRegisterUser): void => {
    console.log(values);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 relative">
      {/* Header fijo */}
      <div className="bg-primary-700 w-full h-16 fixed top-0 left-0 z-10 flex items-center justify-center">
        <h1 className="text-2xl text-white font-extrabold">WAHOO</h1>
      </div>

      {/* Contenido principal */}
      <Wrapper className="flex flex-col md:flex-row items-center justify-center w-full mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">

          {/* Imagen (solo en md+) */}
          <div className="hidden md:flex items-center justify-center">
            <picture>
              <img
                src={backgroundLogin}
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
  );
};
