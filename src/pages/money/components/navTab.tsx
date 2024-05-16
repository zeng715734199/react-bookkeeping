import React, { createContext, useContext, useEffect, useState } from 'react'
import store from '@/store'
import FilterByTag from '@/pages/money/components/filterByTag'
import { Space, Divider, Button } from 'antd'
import FilterByMonth from '@/pages/money/components/filterByMonth'
import { CaretDownOutlined } from '@ant-design/icons'

function NavTab() {
  const [timeFrame, setTimeFrame] = useState<string>('')

  return (
    <section className="w-full bg-primary flex flex-col max-h-[80px]">
      <div className="mx-5">
        <FilterByTag />
      </div>
      <Space
        className="text-[#fff] text-[13px] flex justify-center my-3"
        split={<Divider type="vertical" className="mx-1" />}
        align={'center'}
        size={[3, 3]}
      >
        <FilterByMonth value={timeFrame} onOk={(value) => setTimeFrame(value)}>
          <Button
            size="small"
            type="default"
            className="!py-0 !px-1 !m-0 !text-[12px]"
          >
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
        <span>总支出：￥300.00</span>
        <span>总收入：￥300.0</span>
      </Space>
    </section>
  )
}

export default NavTab
