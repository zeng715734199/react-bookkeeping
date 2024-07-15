import React, { JSX, useEffect, useRef, useState } from 'react'
import { Button, Card, Drawer, Input, Space } from 'antd'
import {
  expenditures,
  incomes,
  Tags,
} from '@/components/DoAccount/components/tagList'
import SquareIcon from '@/pages/labels/components/squareIcon'
import { colorMap } from '@/components/DoAccount/constant'
import { RecordObj, Tab } from '@/components/DoAccount/types'
import store from '@/store'
import { addLabelItem, editLabelItem, updateRecords } from '@/store/actions'

const drawerHeight = window.innerHeight * 0.5
const labelKeys = [...expenditures, ...incomes].map((item) => item.key)

const LabelDrawer: React.FC<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeTab: Tab
  mode: 'ADD' | 'EDIT'
  updateList: () => void
  defaultValue?: Tags | null
}> = ({ updateList, open, setOpen, activeTab, mode, defaultValue = {} }) => {
  const [labelObj, setLabelObj] = useState<Tags>({
    label: '',
    key: 'food',
  })
  const onSave = () => {
    const { handleRecords, handleLabels } = store.getState() as {
      handleRecords: RecordObj[]
      handleLabels: Record<Tab, Tags[]>
    }
    const map = {
      ADD: () => {
        store.dispatch(addLabelItem({ tab: activeTab, labelItem: labelObj }))
      },
      EDIT: () => {
        handleRecords.forEach((item, index) => {
          if (
            item.tag === defaultValue?.key &&
            item.tagName === defaultValue?.label
          ) {
            item.tag = labelObj.key
            item.tagName = labelObj.label
          }
        })
        const idx = handleLabels[activeTab].findIndex(
          (item) =>
            item.label === defaultValue?.label && item.key === defaultValue?.key
        )
        //更新记录中的旧标签为新的标签
        store.dispatch(updateRecords(handleRecords))
        store.dispatch(
          editLabelItem({ tab: activeTab, labelItem: labelObj, idx })
        )
      },
    }
    map[mode]?.()
    updateList()
    close()
  }
  const close = () => {
    setLabelObj(() => ({
      label: '',
      key: 'food',
    }))
    setOpen(false)
  }

  useEffect(() => {
    open &&
      setLabelObj((state) => ({
        ...state,
        ...(defaultValue ? defaultValue : {}),
      }))
  }, [open])

  return (
    <Drawer
      placement="bottom"
      onClose={close}
      open={open}
      height={drawerHeight > 350 ? drawerHeight : 350}
      extra={
        <Button
          type="primary"
          size="small"
          style={{ background: colorMap[activeTab] }}
          onClick={onSave}
        >
          保存
        </Button>
      }
    >
      <div className="p-1 overflow-auto w-full flex justify-center flex-col">
        <Space size={5} className="my-2 mx-3">
          <span>标签名称：</span>
          <Input
            value={labelObj.label}
            placeholder="请输入标签名称"
            onChange={({ target: { value } }) =>
              setLabelObj((state) => ({
                ...state,
                label: value,
              }))
            }
          />
        </Space>
        <Card className="mt-2 mx-3 card-reset h-[30vh]">
          <div className="flex flex-wrap pt-2">
            {labelKeys.map((key) => {
              return (
                <div
                  className="ml-2 mb-2"
                  key={key}
                  onClick={() =>
                    setLabelObj((state) => ({
                      ...state,
                      key,
                    }))
                  }
                >
                  <SquareIcon
                    name={key}
                    size={35}
                    background={
                      key === labelObj.key ? colorMap[activeTab] : '#a5a5a5'
                    }
                  />
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </Drawer>
  )
}

export default LabelDrawer
