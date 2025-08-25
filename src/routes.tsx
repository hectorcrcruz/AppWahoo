import { useRoutes } from 'react-router-dom'

import authRoutes from '@/feature/auth/routes'

import adminRoutes from './feature/user/routes'
import { useAuthStore } from './feature/contex/AuthContext';
import deliveryRoutes from './feature/userDomicilary/routesDomicilary';

import { NotFoundPage } from './feature/pages/notFoundPage';
import { roleNames, Roles } from './feature/core/const/roles';



export const AppRoutes: React.FC = () => {
  const { isAuthenticated , rolId}  = useAuthStore();
  
  let roleRoutes = authRoutes;



  if (isAuthenticated && rolId) {

    if (rolId === Roles.Domiciliario_Propio || rolId === Roles.Domiciliario_Externo)  {
      roleRoutes = [...authRoutes, ...deliveryRoutes];
    } else if (rolId === Roles.Cliente  ) {
      roleRoutes = [...authRoutes, ...adminRoutes];
    } else {
      roleRoutes = [
      ...authRoutes,
      {
        path: "/home",
        element: <NotFoundPage />
      }
    ];
    }
  }


  const routes = useRoutes(roleRoutes)
  return <>{routes}</>
}
