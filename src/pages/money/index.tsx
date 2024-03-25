import React, { useEffect } from 'react'
import NavTab from '@/pages/money/components/navTab'
import RecordItems from '@/pages/money/components/recordItems'
import { FloatButton } from 'antd'
import { EditOutlined } from '@ant-design/icons'

function Money() {
  return (
    <div className="h-full overflow-auto">
      <div className="absolute top-0 z-10 w-full">
        <NavTab />
      </div>
      <div className="mt-[80px]">
        <FloatButton
          icon={<EditOutlined />}
          type="default"
          style={{ right: 94 }}
        />

        <RecordItems />
        <RecordItems />
        <RecordItems />
        <RecordItems />
      </div>
    </div>
  )
}

export default Money
