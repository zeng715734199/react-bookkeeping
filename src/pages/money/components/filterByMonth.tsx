import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Button, Divider, Drawer, Space, Tag } from 'antd'

type MonthObj = { year: number; months: number[] }
const getSpliceVal = (year: number, month: number) =>
  year + `${month < 10 ? '0' + month : month}`

export default function FilterByMonth({
  value,
  onOk,
  children,
}: {
  value: string
  onOk: (value: string) => void
  children: React.ReactNode
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [yearList, setYearList] = useState<MonthObj[]>([])
  const [checkedYearMonth, setCheckedYearMonth] = useState<string[]>([])
  const showDrawer = () => setOpen(true)
  const onClose = () => {
    setCheckedYearMonth([value])
    setOpen(false)
  }
  const changeCheckedList = (month: string, checked: boolean) => {
    if (checked) setCheckedYearMonth([month])
  }
  const confirmTime = () => {
    onOk(checkedYearMonth['0'])
    setOpen(false)
  }

  useEffect(() => {
    const d = new Date()
    const currentYear = d.getFullYear()
    const currentMonth = d.getMonth() + 1
    const currentTime = getSpliceVal(currentYear, currentMonth)
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
    setCheckedYearMonth([currentTime])
    onOk(currentTime)
  }, [])

  return (
    <>
      <div onClick={showDrawer}>{children}</div>
      <Drawer
        placement="bottom"
        onClose={onClose}
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
                const value = getSpliceVal(item.year, month)
                return (
                  <Tag.CheckableTag
                    className="w-[60px] h-[30px] m-1 border-[#d4d4d4]"
                    key={month}
                    checked={checkedYearMonth.includes(value)}
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
