import { Wrapper } from '../core/ui/wrapper';
import { LoginForm } from '../auth/login';
import { AuthValues } from '../core/types/user';
import { useAuth, useAuthStore } from '../contex/AuthContext';
import { useEffect, useState } from 'react';
import { Alert } from '../core/ui/Alert';
import { useNavigate } from 'react-router-dom';
import { IoSettings } from "react-icons/io5";
import { Link } from '../core/ui/Link';
import { useParametrizacionContext } from '@/context/parametrizacionContext';
import { Button, Spinner } from '../core';

export function LoginPage() {
  const { login, error } = useAuth();
  const [colorBg, setColorBg] = useState('#3343a0');
  const navigate = useNavigate();
  const { isAuthenticated, roleId } = useAuthStore();
  const { parametros, loading } = useParametrizacionContext();
  const colorPrimary = parametros?.colorPrimario;

  const handleSuccess = (values: AuthValues): void => {
    login(values);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (roleId === 2) {
        navigate('/home/domi');
      } else {
        navigate('/home');
      }
    }
  }, [isAuthenticated, roleId]);

  useEffect(() => {
    if (colorPrimary !== undefined) {
      setColorBg(colorPrimary);
    }
  }, [colorPrimary]);

  if (loading || parametros?.nombreApp === undefined) {
    return (
      <Spinner className="fixed inset-0 flex items-center justify-center text-red-300" />
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      {/* 🔹 Header con logo */}
      <div
        style={{ backgroundColor: colorBg }}
        className="w-full h-16 absolute top-0 left-0 flex items-center justify-between px-4"
      >
        <Button
          onClick={() => {
            localStorage.removeItem('id');
            window.location.reload();
          }}
          className="bg-transparent text-white"
        >
          <IoSettings size={22} />
        </Button>

        <picture className="flex justify-center w-full">
          <img src={parametros.logo} alt="Logo" className="w-32 md:w-40 lg:w-48 h-auto" />
        </picture>
      </div>

      {/* 🔹 Contenedor principal */}
      <Wrapper className="flex flex-col md:flex-row h-full w-full md:px-10 lg:px-20 mt-20">
        {/* Imagen (solo visible en md+) */}
        <div className="hidden md:flex md:w-1/2 lg:w-7/12 items-center justify-center p-5">
          <picture>
            <img
              src={parametros.backgroundImagen}
              alt="backgroundLogin"
              className="max-w-full max-h-[500px] object-contain"
            />
          </picture>
        </div>

        {/* Formulario */}
        <div
          id="Formulario"
          className={`w-full md:w-1/2 lg:w-5/12 xl:w-4/12 bg-white rounded-xl shadow-md border p-6 md:p-10`}
          style={{ borderColor: colorPrimary }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
            Iniciar Sesión
          </h2>

          {/* ✅ Alerta de error */}
          {error && (
            <div className="mb-5">
              <Alert showIcon variant="danger">{error}</Alert>
            </div>
          )}

          <LoginForm
            className="w-full max-w-sm mx-auto mt-5"
            onSuccess={handleSuccess}
          />

          <div className="text-center mt-6 space-y-2">
            <Link aria-label="Ir al ForgotPassword" to={'/ForgotPassword'}>
              <p className="text-sm text-blue-600 hover:underline">¿Olvidó su contraseña?</p>
            </Link>
            <Link aria-label="Ir al RegisterUser" to={'/RegisterUser'}>
              <p className="text-sm text-blue-600 hover:underline">Registrarse</p>
            </Link>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center text-center justify-around mt-10">
            <p className="text-xs md:text-sm opacity-75 text-primaryText-50">
              {`© ${new Date().getFullYear()} ${parametros?.nombreApp} - Todos los derechos reservados`}
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
