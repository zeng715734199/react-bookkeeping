import { flexBetween } from '@/utils/shortcuts'
import SegmentedNav from '@/components/SegmentedNav'
import Empty from '@/components/Empty'
import React, { useEffect, useRef, useState } from 'react'
import { RecordObj, Tab } from '@/components/DoAccount/types'
import { Flex, Progress, Typography } from 'antd'
import BigJs from 'big.js'
import {
  expenditures,
  incomes,
  Tags,
} from '@/components/DoAccount/components/tagList'

export interface ProgressItem {
  tagName: string
  amount: number
}

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
const allTags = [...incomes, ...expenditures] as Tags[]

const ConsumptionProportion: React.FC<{
  recordList: RecordObj[]
}> = ({ recordList }) => {
  const [segmentedValue, setSegmentedValue] = useState<Tab>('income')
  const [items, setItems] = useState<ProgressItem[]>([])
  const totalAmount = useRef(0)
  const getPercent = (amount: number) =>
    +new BigJs(amount).div(totalAmount.current).times(100).toFixed(0)

  useEffect(() => {
    totalAmount.current = 0
    const map = new Map<string, number>()
    recordList.forEach((item) => {
      const value = map.get(item.tag)
      item.tab === segmentedValue &&
        map.set(
          item.tag,
          value ? new BigJs(value).add(item.money).toNumber() : +item.money
        )
    })
    const recordTagList = [...map.entries()]
    const list = [] as ProgressItem[]
    for (const [tag, amount] of recordTagList) {
      const obj = {} as ProgressItem
      obj.tagName = allTags.find((item) => item.key === tag)!.label
      obj.amount = amount
      list.push(obj)
      totalAmount.current = new BigJs(totalAmount.current)
        .add(amount)
        .toNumber()
    }
    setItems(list)
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
          {items.map((tagItem, index) => {
            return (
              <div key={index}>
                <Typography.Paragraph className="!m-0">
                  {tagItem.tagName}: ￥{tagItem.amount}
                </Typography.Paragraph>
                <Progress
                  percent={getPercent(tagItem.amount)}
                  status="active"
                  strokeColor={colors[index]}
                />
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
