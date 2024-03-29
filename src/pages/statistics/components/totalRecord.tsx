import { Button, Card, Divider, Space } from 'antd'
import FilterByMonth from '@/pages/money/components/filterByMonth'
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

export default function TotalRecord() {
  const [timeFrame, setTimeFrame] = useState<string>('')
  return (
    <Card className="flex justify-center text-center !rounded-0">
      <FilterByMonth value={timeFrame} onOk={(value) => setTimeFrame(value)}>
        <Button type="default">
          <Space
            split={<Divider type="vertical" className="bg-baseBg mx-1.5" />}
            size={0}
            align={'center'}
          >
            <span>{`${timeFrame.slice(0, 4)}年${timeFrame.slice(4)}月`}</span>
            <CaretDownOutlined />
          </Space>
        </Button>
      </FilterByMonth>
      <div className="mt-2 text-primary font-bold">
        <h1 className="text-[15px] py-2">总支出</h1>
        <span className="text-3xl">￥3560.00</span>
      </div>
      <div className="m-3 text-grey font-bold text-[14px]">
        <span>总收入</span>
        <span>￥3566.01</span>
      </div>
    </Card>
  )
}
