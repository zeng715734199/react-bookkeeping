import { DEL_RECORDS, EDIT_RECORDS, SET_RECORDS } from '@/store/actions'
import { recordList, records } from '@/store/constants'
import { RecordObj } from '@/components/DoAccount/types'
import { EditRecordParams } from '@/store/types'

const handleRecords = (
  state = records,
  action: {
    type: string
    payload: RecordObj | EditRecordParams | { id: string }
  }
) => {
  const map = {
    [SET_RECORDS]: () => {
      state.push(action.payload as RecordObj)
      return state
    },
    [EDIT_RECORDS]: () => {
      const { payload } = action as { payload: EditRecordParams }
      const index = state.findIndex((item) => item.id === payload.id)
      state[index] = payload.value
      return state
    },
    [DEL_RECORDS]: () => {
      const { payload }: { payload: { id: string } } = action
      return state.filter((item) => item.id === payload.id)
    },
  } as Record<string, Function>
  return map[action.type] ? map[action.type]() : recordList
}

export default {
  handleRecords,
}
