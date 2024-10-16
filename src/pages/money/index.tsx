import React, { useEffect, useState } from 'react'
import NavTab from '@/pages/money/components/navTab'
import RecordItems from '@/pages/money/components/recordItems'
import AccountingPopup from 'src/components/AccountingPopup'
import { Empty, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import store from '@/store'
import { setLocalStorage } from '@/utils'
import { RenderRecords } from '@/store/types'
import { InitialRecord, RecordObj } from '@/components/AccountingPopup/types'
import { computedTotal, handleAccountRecords } from '@/pages/money/utils'
import { setRecords } from '@/store/actions'
import dayjs from 'dayjs'

function Money() {
  const [recordList, setRecordList] = useState<RenderRecords[]>([])
  const [filter, setFilter] = useState<{
    tagId: string
    time: string
  }>({
    tagId: '*',
    time: dayjs().format('YYYY-MM'),
  })
  const initRecordList = () => {
    const { handleRecords } = store.getState()
    console.log('监听中..', handleRecords)
    setLocalStorage('accountRecord', handleRecords as RecordObj[])
    const list = handleAccountRecords(handleRecords as RecordObj[])
    setRecordList(list)
  }

  useEffect(() => {
    initRecordList()
    filterRecords()
    // 监听state的变化
    const unsubscribe = store.subscribe(() => initRecordList())
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    filterRecords()
  }, [filter])

  const submit = (record: InitialRecord) => {
    const obj = {
      ...record,
      money: parseFloat(record.money).toString(),
      date: record.date.format('YYYY-MM-DD'),
      time: record.time.format('HH:mm'),
    } as RecordObj
    store.dispatch(setRecords(obj))
    filterRecords()
  }

  const filterRecords = () => {
    const { handleRecords } = store.getState() as {
      handleRecords: RecordObj[]
    } & Record<string, any>
    const afterFilterList = handleRecords.filter((item) => {
      const timeEq = dayjs(item.date).format('YYYY-MM') === filter.time
      return filter.tagId === '*'
        ? timeEq
        : item.tagId === filter.tagId && timeEq
    })
    const list = handleAccountRecords(afterFilterList)
    setRecordList(list)
  }

  return (
    <div className="h-full overflow-auto min-w-[360px]">
      <div className="absolute top-0 z-10 w-full">
        <NavTab
          onFilter={({ time, tagId }) => setFilter({ time, tagId })}
          totalVal={computedTotal(recordList)}
        />
      </div>
      <div className="mt-[80px]">
        <AccountingPopup onSubmit={submit}>
          <Button
            className="right-[5%] bottom-[5%] w-[50px] h-[50px] text-center absolute z-[50]"
            icon={<EditOutlined className="text-xl text-primary" />}
            type="default"
            shape="round"
          ></Button>
        </AccountingPopup>
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
