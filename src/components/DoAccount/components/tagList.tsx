import Icons from '@/components/Icons/icons'
import React from 'react'
import { Tab } from '@/components/DoAccount/types'
import { colorMap } from '@/components/DoAccount/constant'
import store from '@/store'
import { Tags } from '@/store/constants'
import { Button, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import EllipsisTooltip from '@/components/EllipsisTooltip'
import { useNavigate } from 'react-router-dom'

export default function TagList({
  tab,
  uniKey,
  onChange,
}: {
  tab: Tab
  uniKey: string
  onChange: (item: Tags) => void
}) {
  const navigate = useNavigate()
  const { handleLabels } = store.getState() as {
    handleLabels: Record<Tab, Tags[]>
  }
  return (
    <div className="flex justify-between items-center">
      <div
        className="flex overflow-x-auto"
        style={{
          width: 'calc(100% - 40px)',
        }}
      >
        {handleLabels[tab].map((item) => {
          return (
            <div
              className="flex flex-col justify-center items-center mr-[10px] mt-3"
              key={item.uid}
              onClick={() => onChange(item)}
            >
              <Icons
                name={item.key}
                background={uniKey === item.uid ? colorMap[tab] : '#e9e9e9'}
                color={uniKey === item.uid ? '#fff' : '#c0c0c0'}
              />
              <span
                className="my-2 text-[12px]"
                style={{
                  color: uniKey === item.uid ? colorMap[tab] : '#94979c',
                }}
              >
                <EllipsisTooltip text={item.label} />
              </span>
            </div>
          )
        })}
      </div>

      <Popconfirm
        title="提示"
        description="即将跳转标签管理页，确定前往？"
        okButtonProps={{ size: 'small', style: { fontSize: '10px' } }}
        cancelButtonProps={{ size: 'small', style: { fontSize: '10px' } }}
        onConfirm={() => navigate('/labels')}
        onCancel={(e) => console.log(e)}
        okText="确定"
        cancelText="取消"
      >
        <Button
          className="text-center"
          icon={<PlusOutlined className="text-xl text-[#fff]" />}
          shape="circle"
          type="primary"
        ></Button>
      </Popconfirm>
    </div>
  )
}
