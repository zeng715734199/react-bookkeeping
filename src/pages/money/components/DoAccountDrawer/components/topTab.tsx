import React from 'react'
import { Segmented } from 'antd'

const tabList = [
  { label: '收入', value: 'income' },
  { label: '支出', value: 'expend' },
]

export default function TopTab({
  onChange,
}: {
  onChange: (value: string) => void
}) {
  return (
    <div className="w-full flex justify-center">
      <Segmented
        defaultValue="income"
        className="mb-10 bg-[#8fd0b2]"
        onChange={(value) => onChange(value)}
        options={tabList}
      />
    </div>
  )
}
