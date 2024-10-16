import { Button, Card, Divider, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import TotalRecord from '@/pages/statistics/components/totalRecord'
import { borderBottomByColor } from '@/utils/shortcuts'
import ConsumptionRatio from '@/pages/statistics/components/consumptionRatio'
import DailyComparison from '@/pages/statistics/components/dailyComparison'
import ConsumptionProportion from '@/pages/statistics/components/consumptionProportion'
import store from '@/store'
import dayjs from 'dayjs'
import { RecordObj } from '@/components/AccountingPopup/types'

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
    <div className={`h-full overflow-auto min-w-[360px]`}>
      <Space size="small" direction="vertical" className="w-full">
        <section>
          <TotalRecord
            recordList={recordList}
            onChange={(value) => setYearMonth(value)}
          ></TotalRecord>
        </section>
        <section>
          <Card className="card-reset p-3 w-full">
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
    </div>
  )
}

export default Statistics
