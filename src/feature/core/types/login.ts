export interface LoginUser {
  fullName: string
  role: string
  rolId: number
  userId: string
  userName: string
  email: string
  ext: string
}
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: LoginUser
}
