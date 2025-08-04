import { createContext, useContext, useState } from "react";
import { AuthSlice, AuthState, } from "./authStore";
import { useBoundStore } from "@/store";
import { shallow } from 'zustand/shallow'
import { Spinner } from "../core";
import { AuthValues } from "../core/types/user";
import { login as loginWithApi } from "./auth";


type ActionCallback = () => void

interface AuthContextValue {
  login: (params: AuthValues, cd?: ActionCallback) => Promise<void>
  logout: (cb?: ActionCallback) => void
  isLoggingIn: boolean
  user: AuthState
  error: string | null
}

interface ProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextValue)

export const AuthProvider: React.FC<ProviderProps> = ({children}) => {
  const value = useAuthProvider()
  if (value.isLoggingIn) return <Spinner className='fixed inset-0 flex items-center justify-center text-red-300'/>

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


const useAuthProvider = (): AuthContextValue => {
   const authStore: AuthSlice = useBoundStore(
    ({
      isAuthenticated,
      loggedInDate,
      setLogin,
      setLogout,
      nombreUsuario,
      apellidoUsuario,
      id,
      token,
      message,
      login,
      password

   }) => ({
      isAuthenticated,
      loggedInDate,
      setLogin,
      setLogout,
      nombreUsuario,
      apellidoUsuario,  
      id,
      token,
      message,
      login,
      password
   }),
   shallow
  )

  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [error, setError] = useState('')
 

  

  const login : AuthContextValue['login'] = async (values, callback) => {
    setIsLoggingIn(true)
    setError('')
    try {
    const response = await loginWithApi(values)

    // Mapea los campos correctamente según lo que espera setLogin
    const mappedData = {
      id: response.id,
      token: response.token,
      nombreUsuario: response.nombreUsuario,
      apellidoUsuario: response.apellidoUsuario,
      login: response.login,
      password: response.password,
      message: response.message ?? "",
    }

    authStore.setLogin(mappedData)
     callback?.()
    } catch (error) {
       console.log(error)
      setError('Usuario o contraseña incorrecta')
    }
    finally {
      setIsLoggingIn(false); 
    }

  }


  const logout: AuthContextValue['logout'] = (callback) => {
    authStore.setLogout()
    callback?.()
  }

  return {
    user: {
      isAuthenticated: authStore.isAuthenticated,
      token: authStore.token,
      loggedInDate: authStore.loggedInDate,
      nombreUsuario: authStore.nombreUsuario,
      apellidoUsuario: authStore.apellidoUsuario,
      id: authStore.id,
      // Add missing AuthState properties with default values or from authStore
      login: authStore.login ?? "",
      password: authStore.password ?? "",
      message: authStore.message ?? "",
    
    },
    login,
    isLoggingIn,
    logout,
    error
  }


}


export const useAuth = (): AuthContextValue => useContext(AuthContext)
export const useAuthStore = (): Omit<AuthState, 'token' | 'refreshToken'> =>
  useBoundStore(
    ({
      isAuthenticated,
      loggedInDate,
      nombreUsuario,
      apellidoUsuario,
      id,
      login,
      password,
      message
    }) => ({
      isAuthenticated,
      loggedInDate,
      nombreUsuario,
      apellidoUsuario,
      id,
      login,
      password,
      message
    }),
    shallow
  )

