import { Button, Card, Divider, Space } from 'antd'
import FilterByMonth from '@/pages/money/components/filterByMonth'
import { CaretDownOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import TotalRecord from '@/pages/statistics/components/totalRecord'
import SegmentedNav from 'src/components/SegmentedNav'
import { borderBottomByColor, flexBetween, xYFull } from '@/utils/shortcuts'
import ConsumptionRatio from '@/pages/statistics/components/consumptionRatio'
import DailyComparison from '@/pages/statistics/components/dailyComparison'
import ConsumptionProportion from '@/pages/statistics/components/consumptionProportion'
import store from '@/store'
import dayjs from 'dayjs'
import BigJs from 'big.js'
import { RecordObj } from '@/components/DoAccount/types'

function Statistics() {
  const [yearMonth, setYearMonth] = useState<string>(dayjs().format('YYYY-MM'))
  const [recordList, setRecordList] = useState<RecordObj[]>([])

  useEffect(() => {
    const { handleRecords } = store.getState() as {
      handleRecords: RecordObj[]
    }
    const records = handleRecords.filter(
      (item) => dayjs(item.date).format('YYYY-MM') === yearMonth
    )
    setRecordList(records)
  }, [yearMonth])
  return (
    <Space
      size="small"
      direction="vertical"
      className={`${xYFull} overflow-auto`}
    >
      <section>
        <TotalRecord
          recordList={recordList}
          onChange={(value) => setYearMonth(value)}
        ></TotalRecord>
      </section>
      <section>
        <Card className="card-reset p-3">
          <div className={`mx-3 ${borderBottomByColor()}`}>
            <ConsumptionRatio recordList={recordList} />
          </div>
          <div className={`mx-3 ${borderBottomByColor()}`}>
            <DailyComparison recordList={recordList} yearMonth={yearMonth} />
          </div>
          <div className={`mx-3 ${borderBottomByColor()}`}>
            <ConsumptionProportion recordList={recordList} />
          </div>
        </Card>
      </section>
    </Space>
  )
}

export default Statistics
