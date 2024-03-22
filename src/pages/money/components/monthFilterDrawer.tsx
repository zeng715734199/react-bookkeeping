import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Button, Drawer, Space, Tag } from 'antd'

export default function MonthFilterDrawer() {
  const [timeFrame, setTimeFrame] = useState<string>('')
  const [yearList, setYearList] = useState<
    { year: number; months: number[] }[]
  >([])
  const [open, setOpen] = useState<boolean>(false)
  const [checkedYearMonth, setCheckedYearMonth] = useState<string[]>([])
  const showDrawer = () => setOpen(true)
  const onClose = () => {
    setCheckedYearMonth([timeFrame])
    setOpen(false)
  }
  const changeCheckedList = (month: string, checked: boolean) => {
    if (checked) {
      setCheckedYearMonth([])
      setCheckedYearMonth([month])
    }
  }
  const confirmTime = () => {
    setTimeFrame(checkedYearMonth['0'])
    setOpen(false)
  }

  useEffect(() => {
    const d = new Date()
    const currentYear = d.getFullYear()
    const currentMonth = d.getMonth() + 1
    const currentTime = `${currentYear}年${currentMonth < 10 ? '0' + currentMonth : currentMonth}月`
    const getMonthList = (num: number) =>
      Array.from({ length: num }, (_, index) => index + 1).reverse()
    //获取最近两年数据
    setYearList([
      {
        year: currentYear,
        months: getMonthList(currentMonth),
      },
      {
        year: currentYear - 1,
        months: getMonthList(12),
      },
    ])
    setCheckedYearMonth([currentTime])
    setTimeFrame(currentTime)
  }, [])

  return (
    <>
      <div onClick={showDrawer}>
        <span>{timeFrame}</span>
        {open ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </div>
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
                const uniKey = `${item.year}年${month < 10 ? '0' + month : month}月`
                return (
                  <Tag.CheckableTag
                    className="w-[60px] h-[30px] m-1 border-[#d4d4d4]"
                    key={month}
                    checked={checkedYearMonth.includes(uniKey)}
                    onChange={(checked) => changeCheckedList(uniKey, checked)}
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
