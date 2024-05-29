import { flexBetween } from '@/utils/shortcuts'
import SegmentedNav from '@/components/SegmentedNav'
import Empty from '@/components/Empty'
import React, { useEffect, useState } from 'react'
import LineChart, { LineDataItem } from '@/pages/statistics/charts/lineChart'
import { useDayjs } from '@/utils'
import { Tab } from '@/components/DoAccount/types'

const dayjs = useDayjs()

export default function MonthComparison() {
  const [segmentedValue, setSegmentedValue] = useState<Tab>('income')
  const [dataSource, setDataSource] = useState<LineDataItem>({
    xAxis: [],
    data: [],
  })

  useEffect(() => {
    const month = dayjs().month() + 1
    const year = dayjs().year()
    const arr = [] as string[]
    let monthNum = 12
    Array.from({ length: monthNum }, (_, index) => index + 1).reverse()
    while (monthNum > 0) {
      arr.push(`${monthNum}月`)
      monthNum--
    }
    // console.log(arr, 'aaaa')

    setDataSource((state) => ({
      xAxis: arr.reverse(),
      data: arr.map((item) => Math.floor(Math.random() * 1000)),
    }))
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
