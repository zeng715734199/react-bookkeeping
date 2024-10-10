import Icons from '@/components/Icons/icons'
import React, { useState } from 'react'
import { RecordObj, Tab } from '@/components/DoAccount/types'
import { colorMap } from '@/components/DoAccount/constant'
import store from '@/store'
import { IconTabMap, Tags } from '@/store/constants'

export default function TagList({
  tab,
  uniKey,
  onChange,
}: {
  tab: Tab
  uniKey: string
  onChange: (item: Tags) => void
}) {
  const { handleLabels } = store.getState() as {
    handleLabels: Record<Tab, Tags[]>
  }
  return (
    <div
      className="flex flex-wrap h-[90px] overflow-y-auto"
      style={{ width: 'calc(100vw - (0.5rem + 8px))' }}
    >
      {handleLabels[tab].map((item) => {
        const keyName = `${item.key}-${item.label}`
        return (
          <div
            className="flex flex-col justify-center items-center mt-3 mx-3"
            key={item.uid}
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
    </div>
  )
}
