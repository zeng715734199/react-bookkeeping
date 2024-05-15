import dayjs from 'dayjs'

export interface RecordObj {
  tab: string
  date: dayjs.Dayjs
  money: string
  note: string
  tag: string
}
