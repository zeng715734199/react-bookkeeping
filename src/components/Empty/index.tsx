import { MehOutlined } from '@ant-design/icons'
import React from 'react'

export default function customizeRenderEmpty() {
  return (
    <div className="text-center text-[#878a90] p-1 m-5">
      <MehOutlined className="text-[20px]" />
      <p className="m-1 font-bold">暂无数据</p>
    </div>
  )
}
