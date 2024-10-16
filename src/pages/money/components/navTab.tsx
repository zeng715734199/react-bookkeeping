import React, { createContext, useContext, useEffect, useState } from 'react'
import FilterByTag, { allTypes } from '@/pages/money/components/filterByTag'
import { Space, Divider, Button } from 'antd'
import FilterByMonth from '@/pages/money/components/filterByMonth'
import { AppstoreOutlined, CaretDownOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import store from '@/store'
import { Tab } from '@/components/AccountingPopup/types'
import { Tags } from '@/store/constants'

const NavTab: React.FC<{
  totalVal: {
    totalIncome: string
    totalExpense: string
  }
  onFilter: (params: { time: string; tagId: string }) => void
}> = ({ onFilter, totalVal }) => {
  const { handleLabels } = store.getState() as {
    handleLabels: Record<Tab, Tags[]>
  }
  const [condition, setCondition] = useState<{ time: string; tagId: string }>({
    time: dayjs().format('YYYY-MM'),
    tagId: '*',
  })

  useEffect(
    () => onFilter({ time: condition.time, tagId: condition.tagId }),
    [condition]
  )

  return (
    <section className="w-full bg-primary flex flex-col max-h-[80px]">
      <div className="mx-5">
        <FilterByTag
          onOk={(tagId) => setCondition((state) => ({ ...state, tagId }))}
        >
          <Button
            size="large"
            className="text-[#fff]"
            type="primary"
            icon={<AppstoreOutlined className="text-xl text-[#fff] w-[32px]" />}
          >
            {
              [
                ...allTypes,
                ...handleLabels.income,
                ...handleLabels.expend,
              ].find((item) => item.uid === condition.tagId)?.label
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
        <FilterByMonth
          onOk={(time) => setCondition((state) => ({ ...state, time }))}
        >
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
              <span>{`${dayjs(condition.time).format('YYYY年MM月')}`}</span>
              <CaretDownOutlined />
            </Space>
          </Button>
        </FilterByMonth>
        <span className="min-w-30">总支出：￥{totalVal.totalExpense}</span>
        <span className="min-w-30">总收入：￥{totalVal.totalIncome}</span>
      </Space>
    </section>
  )
}

export default React.memo(NavTab)
