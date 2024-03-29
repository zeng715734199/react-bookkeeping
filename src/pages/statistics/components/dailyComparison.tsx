import { flexBetween } from '@/utils/shortcuts'
import SegmentedNav from '@/components/SegmentedNav'
import Empty from '@/components/Empty'
import React, { useEffect, useState } from 'react'
import BarChart, { DataItem } from '@/pages/statistics/charts/barChart'
import { useDayjs } from '@/utils'

const dayjs = useDayjs()
const getNumberOfDays = (year: string, month: string) => {
  const date = dayjs(`${+year}-${+month}`, 'YYYY-M')
  return date.endOf('month').date()
}
export default function DailyComparison({
  time = '202403',
}: {
  time?: string
}) {
  const [segmentedValue, setSegmentedValue] = useState('income')
  const [dataSource, setDataSource] = useState<DataItem>()

  useEffect(() => {
    const year = time.slice(0, 4)
    const month = time.slice(4)
    let days = getNumberOfDays(year, month)
    const obj = new DataItem()
    while (days > 0) {
      obj.xAxis.push(`${days}号`)
      //TODO 模拟数据
      obj.data.push(days % 2 === 0 ? 300 : 50)
      days--
    }
    obj.xAxis = obj.xAxis.reverse()
    setDataSource(obj)
  }, [time])

  useEffect(() => {
    //TODO 切换刷新数据
    console.log(dataSource)
  }, [segmentedValue])
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
        <BarChart dataSource={dataSource} type={segmentedValue} />
      ) : (
        <Empty />
      )}
    </div>
  )
}
