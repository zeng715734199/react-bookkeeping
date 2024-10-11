import React, { useState, useRef } from 'react'
import { Tooltip } from 'antd'

const EllipsisTooltip = ({ text }: { text: string }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const textRef = useRef(null)
  const released = useRef(false)

  //长按0.3s展示tooltip
  const handleTouchStart = () => {
    released.current = false
    setTimeout(() => !released.current && setShowTooltip(true), 300)
  }

  const handleTouchEnd = () => {
    setShowTooltip(false)
    //提前松开，标记状态
    released.current = true
  }

  return (
    <Tooltip
      title={text}
      overlayClassName="ellipsis-tooltip"
      open={showTooltip}
      overlayStyle={{ whiteSpace: 'pre-wrap' }}
    >
      <span
        ref={textRef}
        style={{
          display: 'inline-block',
          maxWidth: '40px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {text}
      </span>
    </Tooltip>
  )
}

export default EllipsisTooltip
