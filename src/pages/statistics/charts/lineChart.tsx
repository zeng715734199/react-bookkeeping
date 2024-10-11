import React, { useEffect, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'
import { flexCenter } from '@/utils/shortcuts'
import { Tab } from '@/components/DoAccount/types'
export interface LineDataItem {
  xAxis: string[]
  data: Array<string | number>
}

const LineChart: React.FC<{
  dataSource: LineDataItem
  type: Tab
}> = ({ dataSource, type }) => {
  const [options, setOptions] = useState<EChartsOption>({})
  const screenWidth = useRef<number>(window.innerWidth)
  useEffect(() => {
    const config = {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : ￥{c}',
      },
      xAxis: {
        type: 'category',
        data: dataSource.xAxis,
        axisTick: { alignWithLabel: true, interval: 0 },
        axisLabel: {
          //x轴文字的配置
          show: true,
          interval: 0,
          formatter(value) {
            //x轴的文字改为竖版显示
            const list = value.split('')
            const unit = list.pop()
            const str = list.join('')
            return str + '\n' + unit
          },
        },
      },
      yAxis: {
        type: 'value',
        lineStyle: {
          type: 'dashed', //设置网格线类型 dashed：虚线   solid:实线
        },
      },
      grid: {
        left: 0, //默认10%
        top: '10%',
        right: 0, //默认10%
        bottom: '5%', //默认60
        containLabel: true,
        //grid区域是否包含坐标轴的刻度标签
      },
      series: [
        {
          data: dataSource.data,
          type: 'line',
          itemStyle: {
            shadowBlur: 3,
            shadowOffsetX: 0,
            shadowColor: type === 'income' ? '#2d9869' : '#ef585c',
            color: type === 'income' ? '#84c570' : '#fcbf58',
          },
        },
      ],
    } as EChartsOption
    setOptions(config)
  }, [dataSource, type])

  return (
    <section className={`${flexCenter} w-full`}>
      <div
        className="overflow-auto"
        style={{
          width:
            screenWidth.current > 500
              ? '400px'
              : screenWidth.current * 0.8 + 'px',
        }}
      >
        <ReactECharts
          option={options}
          style={{ minHeight: 250, minWidth: 600 }}
        />
      </div>
    </section>
  )
}

export default React.memo(LineChart)
