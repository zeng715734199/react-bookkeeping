import { Button, Input, message, Space } from 'antd'
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { InputRef } from 'rc-input/lib/interface'

function Notes(
  {
    value,
    onSave,
  }: {
    value: string
    onSave: (note: string) => void
  },
  ref: Ref<{ showNote: boolean }>
) {
  const noteInputRef = useRef<InputRef>(null)
  const [localNote, setLocalNote] = useState('')
  const [showNote, setShowNote] = useState(true)

  useImperativeHandle(
    ref,
    () => ({
      showNote,
    }),
    [showNote]
  )

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
          className="text-xs !bg-danger"
          onClick={saveNote}
        >
          保存
        </Button>
      )}
    </Space.Compact>
  )
}

export default forwardRef(Notes)
