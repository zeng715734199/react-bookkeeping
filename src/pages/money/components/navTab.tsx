import React, { createContext, useContext, useEffect, useState } from 'react'
import store from '@/store'
import { UI_STATE } from '@/store/reducers/users'
import { setCurrentTab } from '@/store/actions'
import FilterTypeDrawer from '@/pages/money/components/filterTypeDrawer'
import { CaretDownOutlined } from '@ant-design/icons'

function NavTab() {
  const { uiController } = store.getState() as { uiController: UI_STATE }
  const [current, setCurrent] = useState(uiController.currentTab)
  const setTab = (value: string) => {
    setCurrent(value)
    store.dispatch(setCurrentTab(value))
  }

  return (
    <section className="fixed top-[15%] w-full bg-primary px-5">
      <FilterTypeDrawer />
      <section className="text-[#fff] flex justify-between">
        <span>
          2024年3月
          <CaretDownOutlined />
        </span>
        <span>总支出：￥300.00</span>
        <span>总收入：￥300.0</span>
      </section>
    </section>
  )
}

export default NavTab
