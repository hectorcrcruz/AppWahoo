import { wahooApi } from "@/feature/core/api/wahoo"
import { UserSchema } from "@/feature/core/schemas/userSchema"
import { InfoRegisterUser, User } from "@/feature/core/types/user"







export const createUser = async (data: InfoRegisterUser): Promise<User> => {
  return UserSchema.parse(await wahooApi.post('/Usuario/CreateUsuario', data))
}



