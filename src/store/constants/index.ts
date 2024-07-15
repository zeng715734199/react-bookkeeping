import { RecordObj, Tab } from '@/components/DoAccount/types'
import {
  expenditures,
  incomes,
  Tags,
} from '@/components/DoAccount/components/tagList'

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

/**
 * @desc labels模块
 */
export const labelsGroup = {
  income: incomes,
  expend: expenditures,
} as Record<Tab, Tags[]>
