import Icons from '@/pages/money/widget/icons'
import React, { useState } from 'react'

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
} as Record<string, Tags[]>

export default function TagList({
  tab,
  tag,
  onChange,
}: {
  tab: string
  tag: string
  onChange: (key: string) => void
}) {
  return (
    <>
      {IconTabMap[tab].map((item) => {
        return (
          <div
            className="flex flex-col justify-center items-center mt-10 mx-1"
            key={item.key}
            onClick={() => onChange(item.key)}
          >
            <Icons
              name={item.key}
              background={tag === item.key ? '#30ab6d' : '#e9e9e9'}
              color={tag === item.key ? '#fff' : '#c0c0c0'}
            />
            <span
              className="my-2"
              style={{
                color: tag === item.key ? '#30ab6d' : '#94979c',
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
