import { DEL_RECORDS, EDIT_RECORDS, SET_RECORDS } from '@/store/actions'
import { recordList, records } from '@/store/constants'
import { RecordObj } from '@/components/DoAccount/types'
import { EditRecordParams } from '@/store/types'
import { getLocalStorage } from '@/utils'

const localList = getLocalStorage('accountRecord') || []

const handleRecords = (
  state = [...records, ...localList],
  action: {
    type: string
    payload: RecordObj | EditRecordParams | { id: string }
  }
) => {
  const map = {
    [SET_RECORDS]: () => {
      return [...state, action.payload as RecordObj]
    },
    [EDIT_RECORDS]: () => {
      const { payload } = action as { payload: EditRecordParams }
      const index = state.findIndex((item) => item.id === payload.id)
      const arr = [...state]
      arr.splice(index, 1, payload.value)
      return arr
    },
    [DEL_RECORDS]: () => {
      const { payload }: { payload: { id: string } } = action
      return [...state.filter((item) => item.id !== payload.id)]
    },
  } as Record<string, Function>
  return map[action.type] ? map[action.type]() : state
}

const computedRecordList = (
  state = recordList,
  action: {
    type: string
    payload: RecordObj | EditRecordParams | { id: string }
  }
) => {
  const map = {
    [SET_RECORDS]: () => {
      return [...state, action.payload as RecordObj]
    },
  } as Record<string, Function>
  return map[action.type] ? map[action.type]() : records
}

export default {
  handleRecords,
  computedRecordList,
}
