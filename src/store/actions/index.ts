import { RecordObj } from '@/components/DoAccount/types'

/**
 * @desc users模块
 */
export const SET_USERINFO = 'SET_USERINFO'

export function setUserInfo(value: object | null) {
  return { type: SET_USERINFO, payload: value || {} }
}

/**
 * @desc records模块
 */
export const SET_RECORDS = 'SET_RECORDS'
export const EDIT_RECORDS = 'EDIT_RECORDS'
export const DEL_RECORDS = 'DEL_RECORDS'
export function setRecords(value: RecordObj) {
  return { type: SET_RECORDS, payload: value || {} }
}
export function editRecords(value: RecordObj) {
  return { type: EDIT_RECORDS, payload: value || {} }
}
export function delRecords(id: string) {
  return { type: DEL_RECORDS, payload: { id } || {} }
}
