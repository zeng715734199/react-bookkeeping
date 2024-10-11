import { RecordObj, Tab } from '@/components/DoAccount/types'
import { createUid } from '@/utils'

export type Tags = {
  label: string
  key: string
  uid: string
}
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

export const incomes: Tags[] = [
  { label: '工资', key: 'salary' },
  {
    label: '理财',
    key: 'stock',
  },
].map((tag) => ({ ...tag, uid: `${tag.key + tag.label}` }))

export const expenditures: Tags[] = [
  {
    label: '餐饮',
    key: 'food',
  },
  {
    label: '交通',
    key: 'car',
  },
  {
    label: '购物',
    key: 'shopping',
  },
  {
    label: '服饰',
    key: 'clothes',
  },
  {
    label: '信用卡',
    key: 'credit',
  },
  {
    label: '其他',
    key: 'money',
  },
].map((tag) => ({ ...tag, uid: `${tag.key + tag.label}` }))

export const IconTabMap = {
  income: incomes,
  expend: expenditures,
} as Record<Tab, Tags[]>

/**
 * @desc labels模块
 */
export const labelsGroup = {
  income: incomes,
  expend: expenditures,
} as Record<Tab, Tags[]>
