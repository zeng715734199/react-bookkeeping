import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'
export interface PieDataItem {
  value: number
  name: string
}
const PieChart: React.FC<{ dataSource: PieDataItem[] }> = function ({
  dataSource,
}) {
  const [options, setOptions] = useState<EChartsOption>({})

  useEffect(() => {
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
            shadowBlur: 3,
            shadowOffsetX: 0,
            shadowColor: '#000',
          },
          label: { overflow: 'none' },
        },
      ],
    } as EChartsOption
    setOptions(config)
  }, [dataSource])

  return <ReactECharts option={options} style={{ minHeight: 250 }} />
}
export default React.memo(PieChart)
