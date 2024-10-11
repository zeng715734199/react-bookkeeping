import { createHashHistory } from 'history'
import { History } from '@remix-run/router/history'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import dayjs from 'dayjs'
import { customAlphabet } from 'nanoid'
dayjs.extend(isLeapYear)
export const historyUtils = createHashHistory() as unknown as History

//创建uid
export const createUid = (size = 10) =>
  customAlphabet(
    `1234567890${Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).join('')}`,
    size
  )()

export const setLocalStorage = (
  key: string,
  value: Record<string, any> | string
) =>
  localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  )

export const getLocalStorage = (key: string) =>
  localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : null

export const removeLocalStorage = (key: string) => localStorage.removeItem(key)

export const clearLocalStorage = () => localStorage.clear()

export const useDayjs = () => dayjs
