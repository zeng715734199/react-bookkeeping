import { RenderRecords } from '@/store/types'
import { RecordObj } from '@/components/DoAccount/types'
import dayjs from 'dayjs'
import BigJs from 'big.js'

const getWeekByDate = (date: string) => {
  const weeks = ['天', '一', '二', '三', '四', '五', '六']
  const dayNum = dayjs(date).get('days')
  return `星期${weeks[dayNum]}`
}

export const handleAccountRecords = (handleRecords: RecordObj[]) => {
  const yearMonthMap = new Map<string, RenderRecords>()
  handleRecords.forEach((item) => {
    const yearMonth = dayjs(item.date).format('YYYY年MM月')
    const date = dayjs(item.date).format('MM月DD日')
    const week = getWeekByDate(item.date)
    const income = item.tab === 'income' ? item.money : '0'
    const expense = item.tab === 'expend' ? item.money : '0'
    if (yearMonthMap.has(yearMonth)) {
      const obj = yearMonthMap.get(yearMonth) as RenderRecords
      obj.totalIncome =
        item.tab === 'income'
          ? new BigJs(obj.totalIncome).add(item.money).toString()
          : obj.totalIncome
      obj.totalExpense =
        item.tab === 'expend'
          ? new BigJs(obj.totalExpense).add(item.money).toString()
          : obj.totalExpense
      const dateDimensionItem = obj.children.find(
        (child) => child.date === date
      )
      if (dateDimensionItem) {
        dateDimensionItem.dailyIncome =
          item.tab === 'income'
            ? new BigJs(dateDimensionItem.dailyIncome)
                .add(item.money)
                .toString()
            : dateDimensionItem.dailyIncome
        dateDimensionItem.dailyExpense =
          item.tab === 'expend'
            ? new BigJs(dateDimensionItem.dailyExpense)
                .add(item.money)
                .toString()
            : dateDimensionItem.dailyExpense
        dateDimensionItem.items.push({
          id: item.id,
          tab: item.tab,
          time: item.time,
          money: item.money,
          note: item.note,
          tag: item.tag,
        })
      } else {
        obj.children.push({
          date,
          week,
          dailyIncome: income,
          dailyExpense: expense,
          items: [
            {
              id: item.id,
              tab: item.tab,
              time: item.time,
              money: item.money,
              note: item.note,
              tag: item.tag,
            },
          ],
        })
      }
      yearMonthMap.set(yearMonth, obj)
    } else {
      yearMonthMap.set(yearMonth, {
        monthDimension: yearMonth,
        totalIncome: income,
        totalExpense: expense,
        children: [
          {
            date,
            week,
            dailyIncome: income,
            dailyExpense: expense,
            items: [
              {
                id: item.id,
                tab: item.tab,
                time: item.time,
                money: item.money,
                note: item.note,
                tag: item.tag,
              },
            ],
          },
        ],
      })
    }
  })
  console.log(yearMonthMap.values())
  return [...yearMonthMap.values()]
}

export const computedTotal = (records: RenderRecords[]) => {
  return records.reduce(
    (obj, item) => {
      obj.totalExpense = new BigJs(obj.totalExpense)
        .add(item.totalExpense)
        .toString()
      obj.totalIncome = new BigJs(obj.totalIncome)
        .add(item.totalIncome)
        .toString()
      return obj
    },
    {
      totalIncome: '0',
      totalExpense: '0',
    }
  )
}
