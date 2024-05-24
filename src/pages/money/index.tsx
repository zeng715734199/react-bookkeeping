import React, { useEffect, useState } from 'react'
import NavTab from '@/pages/money/components/navTab'
import RecordItems from '@/pages/money/components/recordItems'
import DoAccount from 'src/components/DoAccount'
import { FloatButton } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import store from '@/store'
import { setLocalStorage } from '@/utils'
import { RenderRecords } from '@/store/types'
import { RecordObj } from '@/components/DoAccount/types'

import { handleAccountRecords } from '@/pages/money/utils'

function Money() {
  const [recordList, setRecordList] = useState<RenderRecords[]>([])
  useEffect(() => {
    // 监听state的变化
    let unsubscribe = store.subscribe(() => {
      const { handleRecords } = store.getState()
      console.log('监听中..', handleRecords)
      setLocalStorage('accountRecord', handleRecords as RecordObj[])
      const list = handleAccountRecords(handleRecords as RecordObj[])
      setRecordList(list)
    })
    return () => {
      // 取消监听
      unsubscribe()
    }
  }, [])

  return (
    <div className="h-full overflow-auto min-w-[360px]">
      <div className="absolute top-0 z-10 w-full">
        <NavTab />
      </div>
      <div className="mt-[80px]">
        <DoAccount>
          <FloatButton
            className="right-[5%] bottom-[15%] w-[50px] h-[50px] text-center"
            icon={<EditOutlined className="text-xl text-primary" />}
            type="default"
          />
        </DoAccount>
        <RecordItems recordList={recordList} />
      </div>
    </div>
  )
}

export default Money
