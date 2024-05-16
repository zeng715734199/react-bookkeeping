import { SET_USERINFO } from '@/store/actions'
import { stateData } from '@/store/constants'

const querySelfInfo = (
  state = stateData,
  action: { type: string; payload: object }
) => {
  const map = {
    [SET_USERINFO]: () => ({
      ...state,
      userInfo: action.payload,
    }),
  } as Record<string, Function>
  return map[action.type] ? map[action.type]() : stateData
}

export default {
  querySelfInfo,
}
