import React, { useEffect } from 'react'
import NavTab from '@/pages/money/components/navTab'
import RecordItems from '@/pages/money/components/recordItems'
import DoAccount from 'src/components/DoAccount'
import { FloatButton } from 'antd'
import { EditOutlined } from '@ant-design/icons'

function Money() {
  return (
    <div className="h-full overflow-auto min-w-[360px]">
      <div className="absolute top-0 z-10 w-full">
        <NavTab />
      </div>
      <div className="mt-[80px]">
        <DoAccount>
          <FloatButton
            className="right-[5%] bottom-[15%] w-[50px] h-[50px] text-center"
            icon={<EditOutlined className="text-xl text-primary" />}
            type="default"
          />
        </DoAccount>
        <RecordItems />
      </div>
    </div>
  )
}

export default Money
