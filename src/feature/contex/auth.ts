

import { wahooApi } from '../core/api/wahoo'
import { AuthUserSchema } from '../core/schemas/userSchema'
import { AuthUser, AuthValues } from '../core/types/user'


export const login = async (data: AuthValues): Promise<AuthUser> => {
  const response = await wahooApi.post('/Login/Login', data)

  // 👇 agrega el roleId ANTES del parse
const responseWithRole = {
  ...response,
  roleId: 2, // quemado por ahora
}

const parsed = AuthUserSchema.parse(responseWithRole)

localStorage.setItem('auth', JSON.stringify({ state: parsed, version: 1 }))
return parsed
}
