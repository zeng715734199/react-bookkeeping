import React, { createContext, useContext, useEffect, useState } from 'react'
import store from '@/store'
import { UI_STATE } from '@/store/reducers/users'
import { setCurrentTab } from '@/store/actions'
import FilterByTag from '@/pages/money/components/filterByTag'
import { Space, Divider } from 'antd'
import FilterByMonth from '@/pages/money/components/filterByMonth'

function NavTab() {
  const { uiController } = store.getState() as { uiController: UI_STATE }
  const [current, setCurrent] = useState(uiController.currentTab)
  const setTab = (value: string) => {
    setCurrent(value)
    store.dispatch(setCurrentTab(value))
  }

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
        <FilterByMonth></FilterByMonth>
        <span>总支出：￥300.00</span>
        <span>总收入：￥300.0</span>
      </Space>
    </section>
  )
}

export default NavTab
