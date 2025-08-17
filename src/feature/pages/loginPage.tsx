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
  const { isAuthenticated , roleId } = useAuthStore();
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
    <div className="min-h-screen w-auto items-center justify-center flex">
      <div
        style={{ backgroundColor: colorBg }}
        className={`w-full h-16 absolute top-0`}
      >
        <Button
          onClick={() => {
            localStorage.removeItem('id');
            window.location.reload();
          }}
          className="absolute top-3 bg-transparent"
        >
          <IoSettings />
        </Button>
        <picture className="text-center flex justify-center mt-3">
          <img src={parametros.logo} alt="Logo" className="w-48 h-auto" />
        </picture>
      </div>

      <Wrapper className="flex h-full items-center justify-center md:pl-0">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full">
          <div className="col-span-7 hidden mx-auto h-full md:flex items-center justify-center">
            <picture>
              <img
                src={parametros.backgroundImagen}
                alt="backgroundLogin"
                className="w-9/12 h-9/12 2xl:w-10/12 2xl:h-10/12 mx-20 2xl:mx-16 object-cover"
              />
            </picture>
          </div>

          <div
            id="Formulario"
            className={`lg:col-span-4 2xl:col-span-3 border-[1px] rounded-md border-[${colorPrimary}] md:mt-10 2xl:mt-0`}
          >
            <div className="mt-10 mb-7">
              <h2 className="text-xl text-center">Iniciar Sesión</h2>
            </div>

            {/* ✅ Alerta visible pero sin detener renderizado */}
            {error && (
              <div className="mb-5 px-5">
                <Alert showIcon variant="danger">
                  {error}
                </Alert>
              </div>
            )}

            <LoginForm
              className="mx-auto w-9/12 justify-center 2xl:w-[394px] mt-5"
              onSuccess={handleSuccess}
            />

            <div className="text-center mt-4">
              <Link aria-label="Ir al ForgotPassword" to={'/ForgotPassword'}>
                <p>¿Olvidó su contraseña?</p>
              </Link>
              <Link aria-label="Ir al RegisterUser" to={'/RegisterUser'}>
                <p>Registrarse</p>
              </Link>
            </div>

            <div className="flex flex-col items-center text-center justify-around pb-10 mt-10">
              <p className="text-sm opacity-75 text-primaryText-50">
                {`© ${new Date().getFullYear()} Copyright ${
                  parametros?.nombreApp
                } - Todos los derechos reservados`}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
