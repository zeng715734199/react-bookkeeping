import React, { createContext, useContext, useEffect, useState } from 'react'
import store from '@/store'
import FilterByTag, {
  allTypes,
  expenditures,
  incomes,
} from '@/pages/money/components/filterByTag'
import { Space, Divider, Button } from 'antd'
import FilterByMonth from '@/pages/money/components/filterByMonth'
import { AppstoreOutlined, CaretDownOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const NavTab: React.FC<{
  onFilter: (params: { time: string; tag: string }) => void
}> = ({ onFilter }) => {
  const [time, setTimeFrame] = useState<string>('')
  const [tag, setTag] = useState<string>('*')
  const filterTag = (value: string) => {
    console.log(111111)
    setTag(value)
    onFilter({ tag: value, time })
  }
  const filterMonth = (value: string) => {
    console.log('aaaa')
    setTimeFrame(value)
    onFilter({ tag, time: value })
  }

  return (
    <section className="w-full bg-primary flex flex-col max-h-[80px]">
      <div className="mx-5">
        <FilterByTag onOk={filterTag}>
          <Button
            size="large"
            className="text-[#fff]"
            type="primary"
            icon={<AppstoreOutlined className="text-xl text-[#fff] w-[32px]" />}
          >
            {
              [...allTypes, ...incomes, ...expenditures].find(
                (item) => item.key === tag
              )?.label
            }
          </Button>
        </FilterByTag>
      </div>
      <Space
        className="text-[#fff] text-[13px] flex justify-center my-3"
        split={<Divider type="vertical" className="mx-1" />}
        align={'center'}
        size={[3, 3]}
      >
        <FilterByMonth value={time} onOk={filterMonth}>
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
              <span>{`${dayjs(time).format('YYYY年MM月')}`}</span>
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
