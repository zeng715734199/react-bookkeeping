import { flexBetween } from '@/utils/shortcuts'
import SegmentedNav from '@/components/SegmentedNav'
import Empty from '@/components/Empty'
import React, { useEffect, useState } from 'react'
import { RecordObj, Tab } from '@/components/DoAccount/types'
import { Flex, Progress, Typography } from 'antd'
import BigJs from 'big.js'
import { allTypes } from '@/pages/money/components/filterByTag'

const colors = [
  '#5470c6',
  '#ffbab0',
  '#ffa750',
  '#8748d3',
  '#53a867',
  '#eba953',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
]
const allTags = [...allTypes]

const ConsumptionProportion: React.FC<{
  recordList: RecordObj[]
}> = ({ recordList }) => {
  const [segmentedValue, setSegmentedValue] = useState<Tab>('income')
  const [items, setItems] = useState(['aaa'])

  useEffect(() => {
    const map = new Map<string, string>()
    recordList.forEach((item) => {
      const value = map.get(item.tag)
      if (value && item.tab === segmentedValue) {
        map.set(item.tag, new BigJs(value).add(item.money).toString())
      }
    })
  }, [segmentedValue, recordList])

  return (
    <>
      <section className={`${flexBetween} my-5`}>
        <span className="text-[16px]">消费占比</span>
        <SegmentedNav
          value={segmentedValue}
          onChange={(value) => setSegmentedValue(value)}
        ></SegmentedNav>
      </section>
      {items.length ? (
        <Flex gap="small" vertical>
          {colors.map((color) => {
            return (
              <div key={color}>
                <Typography.Paragraph className="!m-0">
                  Custom count{color}:
                </Typography.Paragraph>
                <Progress percent={50} status="active" strokeColor={color} />
              </div>
            )
          })}
        </Flex>
      ) : (
        <Empty />
      )}
    </>
  )
}
export default ConsumptionProportion
