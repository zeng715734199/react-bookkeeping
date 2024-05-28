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
import { computedTotal, handleAccountRecords } from '@/pages/money/utils'
import { setRecords } from '@/store/actions'
import dayjs from 'dayjs'

function Money() {
  const [recordList, setRecordList] = useState<RenderRecords[]>([])
  const [filter, setFilter] = useState<{
    tag: string
    time: string
  }>({
    tag: '*',
    time: dayjs().format('YYYY-MM'),
  })
  const initRecordList = () => {
    const { handleRecords } = store.getState()
    console.log('监听中..', handleRecords)
    setLocalStorage('accountRecord', handleRecords as RecordObj[])
    const list = handleAccountRecords(handleRecords as RecordObj[])
    console.log(list, 'list')
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
      time: record.time.format('HH:mm:ss'),
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
      return filter.tag === '*' ? timeEq : item.tag === filter.tag && timeEq
    })
    const list = handleAccountRecords(afterFilterList)
    setRecordList(list)
  }

  return (
    <div className="h-full overflow-auto min-w-[360px]">
      <div className="absolute top-0 z-10 w-full">
        <NavTab
          onFilter={({ time, tag }) => setFilter({ time, tag })}
          totalVal={computedTotal(recordList)}
        />
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
