import { RecordObj, Tab } from '@/components/DoAccount/types'

export interface DateDimensionRecord {
  date: string
  week: string
  dailyIncome: string
  dailyExpense: string
  items: RecordItem[]
}

export interface RecordItem {
  id: string
  tab: Tab
  time: string
  money: string
  note: string
  tag: string
}

export interface RenderRecords {
  monthDimension: string
  totalIncome: string
  totalExpense: string
  children: DateDimensionRecord[]
}

export interface EditRecordParams {
  id: string
  value: RecordObj
}
