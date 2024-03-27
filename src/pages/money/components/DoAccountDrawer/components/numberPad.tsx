import React, { CSSProperties, MouseEvent, useEffect, useState } from 'react'
import { Button } from 'antd'

function NumPadButton({
  children,
  styles,
}: {
  styles?: CSSProperties
  children: string
}) {
  return (
    <Button
      type="default"
      className="rounded-[4px] text-xl flex justify-center items-center"
      style={{
        width: '100%',
        minHeight: '64px',
        ...styles,
      }}
    >
      {children}
    </Button>
  )
}
const leftNumberList = [
  ...Array.from({ length: 9 }, (_, index) => (index + 1).toString()),
  '0',
  '.',
]
export default function NumberPad({
  onPress,
  onOk,
}: {
  onPress: (money: string) => void
  onOk: () => void
}) {
  const [money, setMoney] = useState('0')

  useEffect(() => {
    onPress(money)
  }, [money])

  const setNum = (num: string) => {
    setMoney((state) => {
      if (num === '.') return /\./.test(state) ? state : state + num
      if (num === '0' && /\./.test(state)) return state + num
      return parseFloat(state + num).toString()
    })
  }
  const deleteNum = () => {
    setMoney((state) =>
      state.length === 1 ? '0' : state.slice(0, state.length - 1)
    )
  }
  const clickNumPad = (e: MouseEvent) => {
    const value = (e.target as HTMLButtonElement).textContent as string
    const map = {
      AC: () => setMoney('0'),
      DEL: () => deleteNum(),
      OK: () => onOk(),
    } as Record<string, () => void>
    map[value] ? map[value]?.() : setNum(value)
  }

  return (
    <div className="flex w-full" onClick={clickNumPad}>
      <div className="w-[75%] flex flex-wrap">
        {leftNumberList.map((item) => (
          <NumPadButton
            styles={{
              width: item === '0' ? '66.6%' : '33.3%',
            }}
            key={item}
          >
            {item}
          </NumPadButton>
        ))}
      </div>
      <div className="w-[25%]">
        <NumPadButton>AC</NumPadButton>
        <NumPadButton>DEL</NumPadButton>
        <NumPadButton
          styles={{
            minHeight: '128px',
            backgroundColor: '#80caa5',
            color: '#fff',
          }}
        >
          OK
        </NumPadButton>
      </div>
    </div>
  )
}
