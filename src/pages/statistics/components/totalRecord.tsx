import { Button, Card, Divider, Space } from 'antd'
import FilterByMonth from '@/pages/money/components/filterByMonth'
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import store from '@/store'
import { RecordObj, Tab } from '@/components/DoAccount/types'
import BigJs from 'big.js'

interface Amount {
  income: string
  expense: string
}

const TotalRecord: React.FC<{
  onChange: (time: string) => void
  recordList: RecordObj[]
}> = ({ recordList, onChange }) => {
  const [timeFrame, setTimeFrame] = useState<string>(dayjs().format('YYYY-MM'))
  const [totalAmount, setTotalAmount] = useState<Amount>({
    income: '0',
    expense: '0',
  })
  useEffect(() => {
    const totalMap = new Map<Tab, string>([
      ['income', '0'],
      ['expend', '0'],
    ])
    recordList.forEach((item) => {
      const value = totalMap.get(item.tab)
      totalMap.set(
        item.tab,
        value ? new BigJs(value).add(item.money).toString() : item.money
      )
    })
    const obj = Object.fromEntries<string>(totalMap)
    //计算月度总金额
    setTotalAmount({ expense: obj.expend, income: obj.income })
    onChange(timeFrame)
  }, [timeFrame])
  return (
    <Card className="flex justify-center text-center !rounded-0">
      <FilterByMonth onOk={(value) => setTimeFrame(value)}>
        <Button type="default">
          <Space
            split={<Divider type="vertical" className="bg-baseBg mx-1.5" />}
            size={0}
            align={'center'}
          >
            <span>{`${dayjs(timeFrame).format('YYYY年MM月')}`}</span>
            <CaretDownOutlined />
          </Space>
        </Button>
      </FilterByMonth>
      <div className="mt-2 text-primary font-bold">
        <h1 className="text-[15px] py-2">总支出</h1>
        <span className="text-3xl">￥{totalAmount.expense}</span>
      </div>
      <div className="m-3 text-grey font-bold text-[14px]">
        <span>总收入</span>
        <span>￥{totalAmount.income}</span>
      </div>
    </Card>
  )
}

export default TotalRecord
