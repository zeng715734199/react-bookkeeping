import { createContext, useContext, useEffect, useState } from 'react'
import { Segmented } from 'antd'
import { NavContext } from '@/components/NavBar/index'
import { SegmentedLabeledOption } from 'rc-segmented'
import store from '@/store'
import { UI_STATE } from '@/store/reducers/users'
import { setCurrentTab } from '@/store/actions'
import colors from 'tailwindcss/colors'

function NavTab() {
  const { uiController } = store.getState() as { uiController: UI_STATE }
  const [current, setCurrent] = useState(uiController.currentTab)
  const setTab = (value: string) => {
    setCurrent(value)
    store.dispatch(setCurrentTab(value))
  }

  return (
    <Segmented
      defaultValue={uiController.currentTab}
      onChange={(value) => setTab(value)}
      options={uiController.tabs}
    />
  )
}

export default NavTab
