import { wahooApi } from '../core/api/wahoo'
import { AuthUserSchema } from '../core/schemas/userSchema'
import { AuthUser, AuthValues } from '../core/types/user'

export const login = async (data: AuthValues): Promise<AuthUser> => {
  const response = await wahooApi.post('/Login/Login', data)

 
  const responseWithRole = {
    ...response.data,
    roleId: 2, // aquí lo quemas por ahora
  }

  
  const parsed = AuthUserSchema.parse(responseWithRole)

  
  localStorage.setItem('auth', JSON.stringify({ state: parsed, version: 1 }))

  return parsed // 👈 importante retornar el usuario autenticado
}


// const parsed = AuthUserSchema.parse(response.data)

// localStorage.setItem('auth', JSON.stringify({ state: parsed, version: 1 }))
// return parsed