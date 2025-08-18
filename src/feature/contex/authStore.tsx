import { Roles } from '../core/const/roles';
import { AuthUser } from '../core/types/user';
import { Nulleable } from '../core/types/utils';
import type { StateCreator } from 'zustand'



export interface User {
  userId: string;
  username: string;
  email: string;
}

export interface AuthState extends Nulleable<AuthUser> {
  isAuthenticated: boolean
  loggedInDate: Date | null
  token: string | null;
  rolId: Roles | null;
}



export interface AuthActions {
   setLogin: (params: AuthUser) => void
  setLogout: () => void
}

export type AuthSlice = AuthState & AuthActions


const initialState: AuthState = {
  isAuthenticated: false,
  loggedInDate: null,
  apellidoUsuario: null,
  nombreUsuario: null,
  id: null,
  login: null,
  token: null,

  message: null,
  rolId: null,
}

export  const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setLogin(newState){
    set({
      isAuthenticated: true,
      loggedInDate: new Date(),
        ...newState,
    })
  },
  setLogout() {
      set(initialState)
  },
})




