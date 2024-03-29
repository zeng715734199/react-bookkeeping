import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'
import { EChartsInstance } from 'echarts-for-react/src/types'
export type DataItem = {
  value: number
  name: string
}
export default function PieChart({ dataSource }: { dataSource: DataItem[] }) {
  const [options, setOptions] = useState<EChartsOption>({})

  const config = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : ￥{c} ({d}%)',
    },
    grid: {
      left: '3%', //默认10%
      top: '10%',
      right: '3%', //默认10%
      bottom: '5%', //默认60
      containLabel: true,
    },
    series: [
      {
        name: '收支构成',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: dataSource,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: '#000',
          },
        },
        label: { overflow: 'none' },
      },
    ],
  } as EChartsOption

  useEffect(() => {
    setOptions({ ...config })
    console.log('dataSource变了')
  }, [dataSource])

  function onChartReady(echarts: EChartsInstance) {
    console.log('echarts is ready', echarts)
  }

  return (
    <>
      <ReactECharts
        option={options}
        style={{ minHeight: 250 }}
        onChartReady={onChartReady}
      />
    </>
  )
}
