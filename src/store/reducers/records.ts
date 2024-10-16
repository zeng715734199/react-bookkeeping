import {
  DEL_RECORDS,
  EDIT_RECORDS,
  SET_RECORDS,
  UPDATE_RECORDS,
} from '@/store/actions'
import { records } from '@/store/constants'
import { RecordObj } from '@/components/AccountingPopup/types'
import { getLocalStorage } from '@/utils'
import { orderBy } from 'lodash-es'
const localList = getLocalStorage('accountRecord') || []

const handleRecords = (
  state = [...records, ...localList],
  action: {
    type: string
    payload: RecordObj | { id: string } | RecordObj[]
  }
) => {
  const map = {
    [SET_RECORDS]: () => {
      return [...state, action.payload as RecordObj]
    },
    [UPDATE_RECORDS]: () => {
      return [...(action.payload as RecordObj[])]
    },
    [EDIT_RECORDS]: () => {
      const index = state.findIndex(
        (item) => item.id === (action.payload as RecordObj)?.id
      )
      const arr = [...state]
      arr.splice(index, 1, action.payload)
      return arr
    },
    [DEL_RECORDS]: () => {
      const { payload } = action as { payload: { id: string } }
      return [...state.filter((item) => item.id !== payload.id)]
    },
  } as Record<string, Function>
  return orderBy(
    map[action.type] ? map[action.type]() : state,
    ['date', 'time'],
    ['desc', 'asc']
  )
}

export default {
  handleRecords,
}
