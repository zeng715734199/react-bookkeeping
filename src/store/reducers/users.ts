import { SET_CURRENT, SET_USERINFO } from '@/store/actions'
import Constants from '@/store/constants'

const querySelfInfo = (
  state = Constants.stateData,
  action: { type: string; value: object }
) => {
  const map = {
    [SET_USERINFO]: () => ({
      ...state,
      userInfo: action.value,
    }),
  } as Record<string, Function>
  return map[action.type] ? map[action.type]() : Constants.stateData
}

const uiController = (
  state = Constants.uiState,
  action: { type: string; value: object | string | number | object[] }
) => {
  const map = {
    [SET_CURRENT]: () => ({
      ...state,
      currentTab: action.value,
    }),
  } as Record<string, Function>
  return map[action.type] ? map[action.type]() : Constants.uiState
}

export default {
  querySelfInfo,
  uiController,
}
