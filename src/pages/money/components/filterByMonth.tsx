import React, { useEffect, useState } from 'react'
import { Button, Divider, Drawer, Space, Tag } from 'antd'
import dayjs from 'dayjs'

type MonthObj = { year: number; months: number[] }

const FilterByMonth = function ({
  onOk,
  children,
}: {
  onOk: (value: string) => void
  children: React.ReactNode
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [yearList, setYearList] = useState<MonthObj[]>([])
  const [checkedYearMonth, setCheckedYearMonth] = useState<string>(
    dayjs().format('YYYY-MM')
  )
  const changeCheckedList = (month: string, checked: boolean) => {
    checked && setCheckedYearMonth(month)
  }
  const confirmTime = () => {
    onOk(checkedYearMonth)
    setOpen(false)
  }

  useEffect(() => {
    const currentYear = dayjs().year()
    const currentMonth = dayjs().month() + 1
    const getMonthByYear = (year: number) => {
      if (year > currentYear) return []
      const monthNum = year === currentYear ? currentMonth : 12
      return Array.from({ length: monthNum }, (_, index) => index + 1).reverse()
    }
    const getFewYearList = (num: number) => {
      const arr = [] as MonthObj[]
      for (let i = 0; i < num; i++) {
        const year = currentYear - i
        arr.push({ year, months: getMonthByYear(year) })
      }
      return arr
    }
    //获取最近两年数据
    setYearList(getFewYearList(2))
  }, [])

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Drawer
        placement="bottom"
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Button type="primary" onClick={confirmTime}>
            确定
          </Button>
        }
      >
        <section>
          {yearList.map((item) => (
            <div
              className="text-[#a7a9ad] my-3 font-bold text-[15px]"
              key={item.year}
            >
              <div className="my-3 text-center">{item.year}</div>
              {item.months.map((month) => {
                const value = `${item.year}-${month < 10 ? '0' + month : month}`
                return (
                  <Tag.CheckableTag
                    className="w-[60px] h-[30px] m-1 border-[#d4d4d4]"
                    key={month}
                    checked={checkedYearMonth === value}
                    onChange={(checked) => changeCheckedList(value, checked)}
                  >
                    <span className="flex items-center justify-center text-sm w-full h-full font-bold">
                      {month}月
                    </span>
                  </Tag.CheckableTag>
                )
              })}
            </div>
          ))}
        </section>
      </Drawer>
    </>
  )
}

export default React.memo(FilterByMonth)
