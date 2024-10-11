import request from '@/utils/request'

const api = {
  auth_login: 'v1/api/auth/login',
  auth_user_info_detail: 'v1/api/auth//userDetail',
  auth_logout: 'v1/api/auth/logout',
}

export interface LoginParamsType {
  userId: string
  password: string
}

// 账号密码登录
export function queryLogin(params: LoginParamsType) {
  return request.post<{ token: string }>(api.auth_login, params)
}

// 查询用户信息
export async function queryUserInfo() {
  return request.get(api.auth_user_info_detail)
}

// 退出登录
export async function logout() {
  return request.post(api.auth_logout)
}
