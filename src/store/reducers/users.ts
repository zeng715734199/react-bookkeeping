import { SegmentedLabeledOption } from 'rc-segmented'
import { SET_CURRENTTAB, SET_USERINFO } from '@/store/actions'

const stateData = {
  userInfo: {} as Record<string, any> | null,
}
const querySelfInfo = (
  state = stateData,
  action: { type: string; value: object }
) => {
  const map = {
    [SET_USERINFO]: () => ({
      ...state,
      userInfo: action.value,
    }),
  } as Record<string, Function>
  return map[action.type] ? map[action.type]() : stateData
}

export type UI_STATE = typeof uiState

const uiState = {
  tabs: [
    { label: '收入', value: 'income' },
    { label: '支出', value: 'expend' },
  ] as SegmentedLabeledOption<string>[],
  currentTab: 'income',
}

const uiController = (
  state = uiState,
  action: { type: string; value: object | string | number | object[] }
) => {
  const map = {
    [SET_CURRENTTAB]: () => ({
      ...state,
      currentTab: action.value,
    }),
  } as Record<string, Function>
  return map[action.type] ? map[action.type]() : uiState
}

export default {
  querySelfInfo,
  uiController,
}
