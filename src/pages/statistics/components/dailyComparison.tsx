import { flexBetween } from '@/utils/shortcuts'
import SegmentedNav from '@/components/SegmentedNav'
import PieChart, { DataItem } from '@/pages/statistics/charts/pieChart'
import Empty from '@/components/Empty'
import React, { useEffect, useState } from 'react'

export default function DailyComparison() {
  const [segmentedValue, setSegmentedValue] = useState('income')
  const [dataSource, setDataSource] = useState<DataItem[]>([
    { value: 335, name: '工资' },
    { value: 310, name: '旅行' },
    { value: 234, name: '衣服' },
    { value: 135, name: '餐饮' },
    { value: 1548, name: '购物' },
  ])

  useEffect(() => {
    //TODO 切换刷新数据
    console.log(dataSource)
  }, [segmentedValue])
  return (
    <>
      <section className={`${flexBetween} my-5`}>
        <span className="text-[16px]">每日对比</span>
        <SegmentedNav
          value={segmentedValue}
          onChange={(value) => setSegmentedValue(value)}
        ></SegmentedNav>
      </section>
      {dataSource?.length ? <PieChart dataSource={dataSource} /> : <Empty />}
    </>
  )
}
