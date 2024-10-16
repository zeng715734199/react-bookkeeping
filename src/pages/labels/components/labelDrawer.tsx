import React, { JSX, useEffect, useRef, useState } from 'react'
import { Button, Card, Drawer, Input, message, Space } from 'antd'
import SquareIcon from '@/pages/labels/components/squareIcon'
import { colorMap } from '@/components/AccountingPopup/constant'
import { RecordObj, Tab } from '@/components/AccountingPopup/types'
import store from '@/store'
import { addLabelItem, editLabelItem, updateRecords } from '@/store/actions'
import { expenditures, incomes, Tags } from '@/store/constants'
import { createUid } from '@/utils'

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
  const [labelObj, setLabelObj] = useState<Tags | null>({
    label: '',
    key: 'food',
    uid: createUid(),
  })
  const onSave = () => {
    if (!labelObj?.label?.trim()) {
      message.error('标签名称不可为空')
      return
    }
    const { handleRecords, handleLabels } = store.getState() as {
      handleRecords: RecordObj[]
      handleLabels: Record<Tab, Tags[]>
    }
    const map = {
      ADD: () => {
        store.dispatch(
          addLabelItem({
            tab: activeTab,
            labelItem: { ...labelObj, uid: createUid() },
          })
        )
      },
      EDIT: () => {
        const list = handleRecords.map((item, index) => {
          if (item.tagId === (defaultValue as Tags).uid) {
            item = { ...item, tagName: labelObj!.label, tag: labelObj!.key }
          }
          return item
        })
        const idx = handleLabels[activeTab].findIndex(
          (item) => item.uid === (defaultValue as Tags).uid
        )
        //更新记录中的旧标签为新的标签
        store.dispatch(updateRecords(list))
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
    setLabelObj(
      () =>
        ({
          label: '',
          key: 'food',
          uid: createUid(),
        }) as Tags
    )
    setOpen(false)
  }

  useEffect(() => {
    open &&
      setLabelObj(
        (state) =>
          ({
            ...state,
            ...(defaultValue ? defaultValue : {}),
          }) as Tags
      )
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
            value={labelObj!.label}
            placeholder="请输入标签名称"
            onChange={({ target: { value } }) =>
              setLabelObj(
                (state) =>
                  ({
                    ...state,
                    label: value,
                  }) as Tags
              )
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
                    setLabelObj(
                      (state) =>
                        ({
                          ...state,
                          key,
                        }) as Tags
                    )
                  }
                >
                  <SquareIcon
                    name={key}
                    size={35}
                    background={
                      key === labelObj!.key ? colorMap[activeTab] : '#a5a5a5'
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
