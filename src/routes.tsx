import { useRoutes } from 'react-router-dom'

import authRoutes from '@/feature/auth/routes'

import adminRoutes from './feature/user/routes'
import { useAuthStore } from './feature/contex/AuthContext';
import { Roles } from './feature/core/const/roles';
import deliveryRoutes from './feature/userDomicilary/routesDomicilary';



export const AppRoutes: React.FC = () => {
  const { isAuthenticated , rolId}  = useAuthStore();
  
  let roleRoutes = authRoutes;

  if (isAuthenticated && rolId) {
    if (rolId === Roles.Domiciliario) {
      roleRoutes = [...authRoutes, ...deliveryRoutes];
    } else if (rolId=== Roles.Usuario) {
      roleRoutes = [...authRoutes, ...adminRoutes];
    } else {
      roleRoutes = [...authRoutes];
    }
  }


  const routes = useRoutes(roleRoutes)
  return <>{routes}</>
}
