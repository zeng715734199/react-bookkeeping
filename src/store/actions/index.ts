import { RecordObj, Tab } from '@/components/DoAccount/types'
import { Tags } from '@/store/constants'

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
export const UPDATE_RECORDS = 'UPDATE_RECORDS'
export function updateRecords(value: RecordObj[]) {
  return { type: UPDATE_RECORDS, payload: value || [] }
}
export function setRecords(value: RecordObj) {
  return { type: SET_RECORDS, payload: value || {} }
}
export function editRecords(value: RecordObj) {
  return { type: EDIT_RECORDS, payload: value || {} }
}
export function delRecords(id: string) {
  return { type: DEL_RECORDS, payload: { id } || {} }
}

/**
 * @desc labels 模块
 */
export const ADD_LABELS = 'ADD_LABELS'
export const DEL_LABELS = 'DEL_LABELS'
export const EDIT_LABELS = 'EDIT_LABELS'
export function addLabelItem(value: { tab: Tab; labelItem: Tags | null }) {
  return { type: ADD_LABELS, payload: value || {} }
}
export function delLabelItem(value: { tab: Tab; idx: number }) {
  return { type: DEL_LABELS, payload: value || {} }
}
export function editLabelItem(value: {
  tab: Tab
  labelItem: Tags | null
  idx: number
}) {
  return { type: EDIT_LABELS, payload: value || {} }
}
