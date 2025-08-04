
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
      partialize: ({ token, loggedInDate, apellidoUsuario ,  id ,  nombreUsuario ,isAuthenticated}) => {
        const hasValues = token  && loggedInDate && id && isAuthenticated && nombreUsuario && apellidoUsuario
        if (hasValues) return { token, loggedInDate,  isAuthenticated, nombreUsuario, apellidoUsuario}

        return null
      }
    }
  ),
  Object.is
)
