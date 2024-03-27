import React, { useEffect } from 'react'
import NavTab from '@/pages/money/components/navTab'
import RecordItems from '@/pages/money/components/recordItems'
import DoAccountDrawer from '@/pages/money/components/DoAccountDrawer'

function Money() {
  return (
    <div className="h-full overflow-auto">
      <div className="absolute top-0 z-10 w-full">
        <NavTab />
      </div>
      <div className="mt-[80px]">
        <DoAccountDrawer />
        <RecordItems />
        <RecordItems />
        <RecordItems />
        <RecordItems />
      </div>
    </div>
  )
}

export default Money
