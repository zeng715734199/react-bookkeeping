import React from 'react'
import { Segmented } from 'antd'

export const tabList = [
  { label: '收入', value: 'income' },
  { label: '支出', value: 'expend' },
]

export default function SegmentedNav({
  value = 'income',
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Segmented
      value={value}
      defaultValue="income"
      className="bg-[#8fd0b2]"
      onChange={(value) => onChange(value)}
      options={tabList}
    />
  )
}
