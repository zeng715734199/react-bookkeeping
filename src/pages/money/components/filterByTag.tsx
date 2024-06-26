import React, { JSX, useEffect, useState } from 'react'
import { Button, Drawer, Tag, Space } from 'antd'
import {
  expenditures,
  incomes,
} from '@/components/DoAccount/components/tagList'
type Tags = {
  label: string
  key: string
}

export const allTypes: Tags[] = [
  {
    label: '所有标签',
    key: '*',
  },
]

const FilterByTag: React.FC<{
  onOk: (key: string) => void
  children: JSX.Element
}> = ({ onOk, children }) => {
  const [open, setOpen] = useState(false)
  const [checkedTag, setCheckedTag] = useState<string>('*')

  const changeCheckedTag = (key: string, checked: boolean) => {
    checked && setCheckedTag(key)
  }

  const saveTag = () => {
    onOk(checkedTag)
    setOpen(false)
  }

  const getTagList = (tagList: Tags[]) => {
    return tagList.map((item) => (
      <Tag.CheckableTag
        className="w-[80px] h-[40px] m-1 border-[#d4d4d4]"
        key={item.key}
        checked={checkedTag === item.key}
        onChange={(checked) => changeCheckedTag(item.key, checked)}
      >
        <span className="flex items-center justify-center text-sm w-full h-full font-bold">
          {item.label}
        </span>
      </Tag.CheckableTag>
    ))
  }

  return (
    <>
      <Space>
        <div className="overflow-hidden" onClick={() => setOpen(true)}>
          {children}
        </div>
      </Space>
      <Drawer
        placement="bottom"
        width={500}
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Button type="primary" onClick={saveTag}>
            确定
          </Button>
        }
      >
        <section>{getTagList(allTypes)}</section>
        <section>
          <div className="text-[#a7a9ad] my-3 font-bold text-[15px]">收入</div>
          {getTagList(incomes)}
        </section>
        <section>
          <div className="text-[#a7a9ad] my-3 font-bold text-[15px]">支出</div>
          {getTagList(expenditures)}
        </section>
      </Drawer>
    </>
  )
}

export default FilterByTag
