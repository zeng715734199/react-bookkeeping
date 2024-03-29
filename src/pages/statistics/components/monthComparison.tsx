import { flexBetween } from '@/utils/shortcuts'
import SegmentedNav from '@/components/SegmentedNav'
import Empty from '@/components/Empty'
import React, { useEffect, useState } from 'react'
import LineChart from '@/pages/statistics/charts/lineChart'
import { useDayjs } from '@/utils'
import { DataItem } from '@/pages/statistics/charts/barChart'

const dayjs = useDayjs()

export default function MonthComparison() {
  const [segmentedValue, setSegmentedValue] = useState('income')
  const [dataSource, setDataSource] = useState<DataItem>(new DataItem())

  useEffect(() => {
    const month = dayjs().month() + 1
    const year = dayjs().year()
    const arr = [] as string[]
    // if (month >= 6) {
    //   let monthNum = month
    //   while (monthNum > 0) {
    //     arr.push(`${monthNum}月`)
    //     monthNum--
    //   }
    // } else {
    //   let monthNum = month
    //   Array.from({ length: monthNum }, (_, index) => index + 1).reverse()
    //
    //   while (monthNum > 0) {
    //     arr.push(`${monthNum}月`)
    //     monthNum--
    //   }
    // }
    console.log(year, month)
    console.log(dataSource, '5555')
  }, [])
  useEffect(() => {
    //TODO 切换刷新数据
  }, [segmentedValue])
  return (
    <>
      <section className={`${flexBetween} my-5`}>
        <span className="text-[16px]">月度对比</span>
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
    </>
  )
}
