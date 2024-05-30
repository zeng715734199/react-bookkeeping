import { flexBetween } from '@/utils/shortcuts'
import SegmentedNav from '@/components/SegmentedNav'
import Empty from '@/components/Empty'
import React, { useEffect, useState } from 'react'
import { RecordObj, Tab } from '@/components/DoAccount/types'
import dayjs from 'dayjs'
import BigJs from 'big.js'
import LineChart, { LineDataItem } from '@/pages/statistics/charts/lineChart'

const DailyComparison: React.FC<{
  recordList: RecordObj[]
  yearMonth?: string
}> = ({ recordList, yearMonth = dayjs().format('YYYY-MM') }) => {
  const [segmentedValue, setSegmentedValue] = useState<Tab>('income')
  const [dataSource, setDataSource] = useState<LineDataItem>({
    xAxis: [],
    data: [],
  })

  useEffect(() => {
    const days = dayjs(yearMonth).daysInMonth()
    const chartsData = {
      xAxis: [],
      data: [],
    } as LineDataItem
    if (recordList.length === 0) {
      setDataSource(chartsData)
      return
    }
    for (let d = 1; d <= days; d++) {
      const total = recordList.reduce(
        (amount, item) =>
          dayjs(item.date).date() === d && item.tab === segmentedValue
            ? new BigJs(amount).add(item.money || 0).toNumber()
            : amount,
        0
      )
      chartsData.xAxis.push(`${d}号`)
      chartsData.data.push(total)
    }
    setDataSource(chartsData)
  }, [recordList, segmentedValue])

  return (
    <div className="mb-10">
      <section className={`${flexBetween} my-5`}>
        <span className="text-[16px]">每日对比</span>
        <SegmentedNav
          value={segmentedValue}
          onChange={(value) => setSegmentedValue(value)}
        ></SegmentedNav>
      </section>
      {dataSource?.data?.length && dataSource?.xAxis?.length ? (
        <LineChart dataSource={dataSource} type={segmentedValue} />
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default DailyComparison
