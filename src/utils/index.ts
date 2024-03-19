import { createBrowserHistory } from 'history'
import { History } from '@remix-run/router/history'

export const historyUtils = createBrowserHistory() as unknown as History

export const setLocalStorage = (
  key: string,
  value: Record<string, any> | string
) =>
  localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  )

export const getLocalStorage = (key: string) => localStorage.getItem(key)

export const removeLocalStorage = (key: string) => localStorage.removeItem(key)

export const clearLocalStorage = () => localStorage.clear()
