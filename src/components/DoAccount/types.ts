import dayjs from 'dayjs'

export type Tab = 'income' | 'expend'

export interface RecordObj {
  id: string
  tab: Tab
  date: string
  time: string
  money: string
  note: string
  tag: string
  tagName: string
  tagId: string
}

export interface InitialRecord {
  id: string
  tab: Tab
  date: dayjs.Dayjs
  time: dayjs.Dayjs
  money: string
  note: string
  tag: string
  tagName: string
}
