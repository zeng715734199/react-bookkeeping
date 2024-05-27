import React, { useEffect, useState } from 'react'
import NavTab from '@/pages/money/components/navTab'
import RecordItems from '@/pages/money/components/recordItems'
import DoAccount from 'src/components/DoAccount'
import { FloatButton, Empty } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import store from '@/store'
import { setLocalStorage } from '@/utils'
import { RenderRecords } from '@/store/types'
import { InitialRecord, RecordObj } from '@/components/DoAccount/types'
import { handleAccountRecords } from '@/pages/money/utils'
import { setRecords } from '@/store/actions'

function Money() {
  const [recordList, setRecordList] = useState<RenderRecords[]>([])
  const initRecordList = () => {
    const { handleRecords } = store.getState()
    console.log('监听中..', handleRecords)
    setLocalStorage('accountRecord', handleRecords as RecordObj[])
    const list = handleAccountRecords(handleRecords as RecordObj[])
    console.log(list, 'lsls')
    setRecordList(list)
  }
  useEffect(() => {
    initRecordList()
    // 监听state的变化
    const unsubscribe = store.subscribe(() => {
      initRecordList()
    })
    return () => {
      // 取消监听
      unsubscribe()
    }
  }, [])

  const submit = (record: InitialRecord) => {
    const obj = {
      ...record,
      money: parseFloat(record.money).toString(),
      date: record.date.format('YYYY-MM-DD'),
      time: record.time.format('HH:mm:ss'),
    } as RecordObj
    console.log(obj, 'ooooo')
    store.dispatch(setRecords(obj))
  }

  return (
    <div className="h-full overflow-auto min-w-[360px]">
      <div className="absolute top-0 z-10 w-full">
        <NavTab />
      </div>
      <div className="mt-[80px]">
        <DoAccount onSubmit={submit}>
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
