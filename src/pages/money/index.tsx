import React, { useEffect } from 'react'
import NavTab from '@/pages/money/components/navTab'
import RecordItems from '@/pages/money/components/recordItems'

function Money() {
  return (
    <div className="h-full overflow-auto">
      <div className="absolute top-0 z-10 w-full">
        <NavTab />
      </div>
      <div className="mt-[80px]">
        <RecordItems />
        <RecordItems />
        <RecordItems />
        <RecordItems />
      </div>
    </div>
  )
}

export default Money
