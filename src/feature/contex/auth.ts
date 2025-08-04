

import { wahooApi } from '../core/api/wahoo'
import { AuthUserSchema } from '../core/schemas/userSchema'
import { AuthUser, AuthValues } from '../core/types/user'


export const login = async (data: AuthValues): Promise<AuthUser> => {
  return AuthUserSchema.parse(await wahooApi.post('/Login/Login', data))
}

interface RefreshTokenDTO {
  token: string
  refreshToken: string
}
// export const refreshToken = async (data: RefreshTokenDTO): Promise<AuthUser> => {
// //   const res = (await wahooApi.post('/LOGIN/refreshToken', data)) as AuthUser
// //   if (!res.roleName) {
// //     res.roleName = Roles.jefe
// //   }

// //   return AuthUserSchema.parse(res)
// }
