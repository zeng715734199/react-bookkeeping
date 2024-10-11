import { flexBetween } from '@/utils/shortcuts'
import SegmentedNav from '@/components/SegmentedNav'
import PieChart, { PieDataItem } from '@/pages/statistics/charts/pieChart'
import Empty from '@/components/Empty'
import React, { useEffect, useState } from 'react'
import { RecordObj, Tab } from '@/components/DoAccount/types'
import BigJs from 'big.js'
import store from '@/store'
import { Tags } from '@/store/constants'

const ConsumptionRatio: React.FC<{
  recordList: RecordObj[]
}> = ({ recordList }) => {
  const [segmentedValue, setSegmentedValue] = useState<Tab>('income')
  const [dataSource, setDataSource] = useState<PieDataItem[]>([])

  useEffect(() => {
    if (recordList.length === 0) {
      setDataSource([])
      return
    }
    const { handleLabels } = store.getState() as {
      handleLabels: Record<Tab, Tags[]>
    }
    const allTags = [...handleLabels.income, ...handleLabels.expend]
    const map = new Map<string, number>()
    recordList.forEach((item) => {
      if (item.tab === segmentedValue) {
        const value = map.get(item.tag)
        map.set(
          item.tagId,
          value
            ? new BigJs(value).add(item.money).toNumber()
            : new BigJs(item.money).toNumber()
        )
      }
    })
    const list: PieDataItem[] = []
    for (const [tagId, value] of map.entries()) {
      const tagItem = allTags.find((item) => item.uid === tagId)
      list.push({ name: tagItem!.label, value })
    }
    setDataSource(list)
  }, [segmentedValue, recordList])

  return (
    <>
      <section className={`${flexBetween} my-5`}>
        <span className="text-[16px]">收支构成</span>
        <SegmentedNav
          value={segmentedValue}
          onChange={(value) => setSegmentedValue(value)}
        ></SegmentedNav>
      </section>
      {dataSource?.length ? <PieChart dataSource={dataSource} /> : <Empty />}
    </>
  )
}

export default ConsumptionRatio
