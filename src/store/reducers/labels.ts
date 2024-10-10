import { labelsGroup, Tags } from '@/store/constants'
import { DEL_LABELS, EDIT_LABELS, ADD_LABELS } from '@/store/actions'
import { Tab } from '@/components/DoAccount/types'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { cloneDeep } from 'lodash-es'

const handleLabels = (
  state: Record<Tab, Tags[]> = {
    income: [],
    expend: [],
  },
  action: {
    type: string
    payload: { tab: Tab; labelItem?: Tags; idx?: number }
  }
) => {
  state = getLocalStorage('labels') || labelsGroup
  const { tab, labelItem, idx } = action?.payload || {}
  const map = {
    [ADD_LABELS]: () => {
      return { ...state, [tab]: [...state[tab], labelItem] }
    },
    [EDIT_LABELS]: () => {
      const item = cloneDeep(state)
      item[tab][idx as number] = labelItem || ({} as Tags)
      return { ...item }
    },
    [DEL_LABELS]: () => {
      return {
        ...state,
        [tab]: state[tab].filter((item, index) => index !== idx),
      }
    },
  } as Record<string, Function>
  const handler = (type: string) => {
    const res = map[action.type]()
    setLocalStorage('labels', res)
    return res
  }

  return map[action.type] ? handler(action.type) : state
}

export default {
  handleLabels,
}
