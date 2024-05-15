export const SET_USERINFO = 'SET_USERINFO'
export const SET_CURRENT = 'SET_CURRENT'

/*
 * action 创建函数
 */

export function setUserInfo(value: object | null) {
  return { type: SET_USERINFO, value }
}

export function setCurrentTab(value: string) {
  return { type: SET_CURRENT, value }
}
