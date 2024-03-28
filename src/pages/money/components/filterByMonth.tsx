import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Button, Divider, Drawer, Space, Tag } from 'antd'

export default function FilterByMonth() {
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
    const getMonthByYear = (year: number) => {
      if (year > currentYear) return []
      const monthNum = year === currentYear ? currentMonth : 12
      return Array.from({ length: monthNum }, (_, index) => index + 1).reverse()
    }
    const getFewYearList = (num: number) => {
      const arr = [] as { year: number; months: number[] }[]
      for (let i = 0; i < num; i++) {
        const year = currentYear - i
        arr.push({ year, months: getMonthByYear(year) })
      }
      return arr
    }
    //获取最近两年数据
    setYearList(getFewYearList(2))
    setCheckedYearMonth([currentTime])
    setTimeFrame(currentTime)
  }, [])

  return (
    <>
      <Space
        onClick={showDrawer}
        split={<Divider type="vertical" className="bg-baseBg mx-1.5" />}
        size={0}
        align={'center'}
      >
        <span>{timeFrame}</span>
        {open ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </Space>
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
