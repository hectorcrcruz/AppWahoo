

import { wahooApi } from '../core/api/wahoo'
import { AuthUserSchema } from '../core/schemas/userSchema'
import { AuthUser, AuthValues } from '../core/types/user'


export const login = async (data: AuthValues): Promise<AuthUser> => {
  const response = await wahooApi.post('/Login/Login', data)

  // 👇 agrega el roleId ANTES del parse
  const responseWithRole = {
    ...response,
    roleId:2,
  }

  return AuthUserSchema.parse(responseWithRole)
}

