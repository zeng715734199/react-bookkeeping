import { Button, Input, message, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { InputRef } from 'rc-input/lib/interface'

export default function Notes({
  value,
  onSave,
}: {
  value: string
  onSave: (note: string) => void
}) {
  const noteInputRef = useRef<InputRef>(null)
  const [localNote, setLocalNote] = useState('')
  const [showNote, setShowNote] = useState(true)
  useEffect(() => {
    noteInputRef.current?.focus?.()
  }, [showNote])
  //回显赋值
  useEffect(() => {
    setLocalNote(value)
  }, [value])
  const saveNote = () => {
    if (localNote.length >= 30) {
      message.error('备注内容不得超过30字~')
      return
    }
    setShowNote(true)
    onSave(localNote)
  }

  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input
        size="small"
        value={localNote}
        className="text-xs"
        addonBefore="备注"
        ref={noteInputRef}
        disabled={showNote}
        onChange={(e) => setLocalNote(e.target.value)}
      />
      {showNote ? (
        <Button
          size="small"
          className="text-xs"
          onClick={() => setShowNote(false)}
        >
          添加备注
        </Button>
      ) : (
        <Button
          type="primary"
          size="small"
          className="text-xs"
          onClick={saveNote}
        >
          保存
        </Button>
      )}
    </Space.Compact>
  )
}
