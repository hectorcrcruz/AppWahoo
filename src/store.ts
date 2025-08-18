
import { persist } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'
import { AuthSlice, createAuthSlice } from './feature/contex/authStore';







type BoundStore = AuthSlice 
type StorageState = { token: string} | null

export const useBoundStore = createWithEqualityFn(
  persist<BoundStore, [], [], StorageState>(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: 'auth-store',
      version: 1,
      partialize: ({ token, loggedInDate, apellidoUsuario ,  id , rolId,  nombreUsuario ,isAuthenticated}) => {
        const hasValues = token  && loggedInDate && id && isAuthenticated && nombreUsuario && apellidoUsuario && rolId
        if (hasValues) return { token, loggedInDate, id, isAuthenticated, nombreUsuario, apellidoUsuario, rolId}

        return null
      }
    }
  ),
  Object.is
)
