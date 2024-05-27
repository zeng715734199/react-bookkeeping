import React from 'react'
import { Segmented } from 'antd'
import { Tab } from '@/components/DoAccount/types'
import { SegmentedLabeledOption } from 'rc-segmented'

export const tabList = [
  { label: '收入', value: 'income' },
  { label: '支出', value: 'expend' },
] as SegmentedLabeledOption<Tab>[]

export default function SegmentedNav({
  value = 'income',
  onChange,
}: {
  value: Tab
  onChange: (value: Tab) => void
}) {
  return (
    <Segmented
      value={value}
      defaultValue="income"
      className="bg-[#8fd0b2]"
      onChange={(value: Tab) => onChange(value)}
      options={tabList}
    />
  )
}
