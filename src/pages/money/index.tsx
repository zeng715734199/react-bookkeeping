import React, { useEffect, useState } from 'react'
import NavTab from '@/pages/money/components/navTab'
import RecordItems from '@/pages/money/components/recordItems'
import DoAccount from 'src/components/DoAccount'
import { FloatButton, Empty } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import store from '@/store'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { RenderRecords } from '@/store/types'
import { RecordObj } from '@/components/DoAccount/types'
import { handleAccountRecords } from '@/pages/money/utils'

function Money() {
  const [recordList, setRecordList] = useState<RenderRecords[]>([])
  useEffect(() => {
    const localList = getLocalStorage('accountRecord') || []
    const list = handleAccountRecords(localList)
    setRecordList(list)
    // 监听state的变化
    const unsubscribe = store.subscribe(() => {
      const handleRecords = (
        store.getState()?.handleRecords as RecordObj[]
      ).concat(localList || [])
      console.log('监听中..', handleRecords)
      setLocalStorage('accountRecord', handleRecords)
      const list = handleAccountRecords(handleRecords)
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
        {recordList.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="pt-[24px]" />
        ) : (
          <RecordItems recordList={recordList} />
        )}
      </div>
    </div>
  )
}

export default Money
