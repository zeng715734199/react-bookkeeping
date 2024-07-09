import Icons from '@/components/Icons/icons'
import React, { useState } from 'react'
import { Tab } from '@/components/DoAccount/types'
import { colorMap } from '@/components/DoAccount/constant'

export type Tags = {
  label: string
  key: string
}
export const incomes: Tags[] = [
  { label: '工资', key: 'salary' },
  {
    label: '理财',
    key: 'stock',
  },
]

export const expenditures: Tags[] = [
  {
    label: '餐饮',
    key: 'food',
  },
  {
    label: '交通',
    key: 'car',
  },
  {
    label: '购物',
    key: 'shopping',
  },
  {
    label: '服饰',
    key: 'clothes',
  },
  {
    label: '信用卡',
    key: 'credit',
  },
  {
    label: '其他',
    key: 'money',
  },
]

export const IconTabMap = {
  income: incomes,
  expend: expenditures,
} as Record<Tab, Tags[]>

export default function TagList({
  tab,
  uniKey,
  onChange,
}: {
  tab: Tab
  uniKey: string
  onChange: (item: Tags) => void
}) {
  return (
    <>
      {IconTabMap[tab].map((item) => {
        const keyName = `${item.key}-${item.label}`
        return (
          <div
            className="flex flex-col justify-center items-center mt-5 mx-1"
            key={item.key}
            onClick={() => onChange(item)}
          >
            <Icons
              name={item.key}
              background={uniKey === keyName ? colorMap[tab] : '#e9e9e9'}
              color={uniKey === keyName ? '#fff' : '#c0c0c0'}
            />
            <span
              className="my-2"
              style={{
                color: uniKey === keyName ? colorMap[tab] : '#94979c',
              }}
            >
              {item.label}
            </span>
          </div>
        )
      })}
    </>
  )
}
