import React, { useState, useRef } from 'react'
import { Tooltip } from 'antd'

const EllipsisTooltip = ({
  text,
  limitWith = 40,
  enabled = true,
}: {
  text: string
  limitWith?: number | string // 限制宽度超出多少才展示...
  enabled?: boolean //是否启用tooltip
}) => {
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
      open={enabled ? showTooltip : false}
      overlayStyle={{ whiteSpace: 'pre-wrap' }}
      overlayInnerStyle={{ fontSize: '12px' }}
    >
      <span
        ref={textRef}
        style={{
          display: 'inline-block',
          maxWidth: `${limitWith}px`,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
        }}
        onBlur={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {text}
      </span>
    </Tooltip>
  )
}

export default EllipsisTooltip
