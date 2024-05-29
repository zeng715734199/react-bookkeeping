import { Button, Card, Divider, Space } from 'antd'
import FilterByMonth from '@/pages/money/components/filterByMonth'
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { RecordObj, Tab } from '@/components/DoAccount/types'
import BigJs from 'big.js'

interface Amount {
  income: string
  expense: string
  netIncome: string
}

const TotalRecord: React.FC<{
  recordList: RecordObj[]
  onChange: (time: string) => void
}> = ({ recordList, onChange }) => {
  const [timeFrame, setTimeFrame] = useState<string>(dayjs().format('YYYY-MM'))
  const [totalAmount, setTotalAmount] = useState<Amount>({
    income: '0',
    expense: '0',
    netIncome: '0',
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
    setTotalAmount({
      expense: obj.expend,
      income: obj.income,
      netIncome: new BigJs(obj.income).minus(obj.expend).toString(),
    })
    onChange(timeFrame)
  }, [timeFrame, recordList])
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
        <h1 className="text-[15px] py-2">净收入</h1>
        <span className="text-3xl">￥ {totalAmount.netIncome}</span>
      </div>
      <div className="m-3 text-grey font-bold text-[14px]">
        <span>总收入 ￥{totalAmount.income}</span>
      </div>
      <div className="m-3 text-warn font-bold text-[14px]">
        <span>总支出 ￥{totalAmount.expense}</span>
      </div>
    </Card>
  )
}

export default TotalRecord
