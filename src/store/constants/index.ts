import { RecordObj } from '@/components/DoAccount/types'
import { RenderRecords } from '@/store/types'

/**
 * @desc users模块
 */
export const stateData = {
  userInfo: {} as Record<string, any> | null,
}

/**
 * @desc records模块
 */
export const records = [] as RecordObj[]
export const recordList = [] as RenderRecords[]
