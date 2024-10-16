import Title from 'antd/es/typography/Title'
import React from 'react'
import { borderBottomByColor } from '@/utils/shortcuts'

export default function MoneyPanel({ money }: { money: string }) {
  return (
    <div className={`min-h-[64px]  flex items-center ${borderBottomByColor()}`}>
      <Title level={1} className="max-w-[35px] !m-0">
        ￥
      </Title>
      <span className="w-full text-right text-3xl">{money}</span>
    </div>
  )
}
