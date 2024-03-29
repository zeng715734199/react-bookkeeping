import { Button, Card, Divider, Space } from 'antd'
import FilterByMonth from '@/pages/money/components/filterByMonth'
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import TotalRecord from '@/pages/statistics/components/totalRecord'
import SegmentedNav from 'src/components/SegmentedNav'
import { borderBottomByColor, flexBetween, xYFull } from '@/utils/shortcuts'
import ConsumptionRatio from '@/pages/statistics/components/consumptionRatio'
import DailyComparison from '@/pages/statistics/components/dailyComparison'
import MonthComparison from '@/pages/statistics/components/monthComparison'

function Statistics() {
  return (
    <Space
      size="small"
      direction="vertical"
      className={`${xYFull} overflow-auto`}
    >
      <section>
        <TotalRecord></TotalRecord>
      </section>
      <section>
        <Card className="card-reset p-3">
          <div className={`mx-3 ${borderBottomByColor()}`}>
            <ConsumptionRatio />
          </div>
          <div className={`mx-3 ${borderBottomByColor()}`}>
            <DailyComparison />
          </div>
          <div className={`mx-3 ${borderBottomByColor()}`}>
            <MonthComparison />
          </div>
        </Card>
      </section>
    </Space>
  )
}

export default Statistics
