import React, { CSSProperties, MouseEvent, useEffect, useState } from 'react'
import { Button, message } from 'antd'

function NumPadButton({
  className,
  children,
}: {
  className?: string
  children: string
}) {
  return (
    <Button
      type="default"
      className={`w-full min-h-[64px] rounded-[4px] text-xl flex justify-center items-center ${className}`}
    >
      {children}
    </Button>
  )
}
const leftNumberList = Array.from('1234567890.').map(String)
export default function NumberPad({
  value,
  onPress,
  onOk,
}: {
  value: string
  onPress: (money: string) => void
  onOk: () => void
}) {
  const setNum = (num: string) => {
    const hasPoint = /\./.test(value)
    let price = parseFloat(value + num).toString()
    if (num === '.') return onPress(hasPoint ? value : value + num)
    if (num === '0' && hasPoint) price = value + num
    if (price.includes('.') && price.split('.')[1]?.length > 2) {
      message.warning('小数点最多两位嗷！👎')
      onPress(value)
      return
    }
    if (+value > 100000) {
      message.warning('记这么多，你有这么多钱吗？👎')
      onPress(value)
      return
    }
    onPress(price)
  }
  const deleteNum = () => {
    onPress(value.length === 1 ? '0' : value.slice(0, value.length - 1))
  }
  const clickNumPad = (e: MouseEvent) => {
    const val = (e.target as HTMLButtonElement).textContent as string
    const map = {
      AC: () => onPress('0'),
      DEL: () => deleteNum(),
      OK: () => {
        if (parseFloat(value) === 0) {
          message.warning('吃饱了撑的是吧，0元记了干嘛？')
          return
        }
        onOk()
      },
    } as Record<string, () => void>
    map[val] ? map[val]?.() : setNum(val)
  }

  return (
    <div className="flex w-full" onClick={clickNumPad}>
      <div className="w-[75%] flex flex-wrap">
        {leftNumberList.map((item) => (
          <NumPadButton
            key={item}
            className={item === '0' ? '!w-[66.6%]' : '!w-[33.3%]'}
          >
            {item}
          </NumPadButton>
        ))}
      </div>
      <div className="w-[25%]">
        <NumPadButton>AC</NumPadButton>
        <NumPadButton>DEL</NumPadButton>
        <NumPadButton className="!min-h-[128px] bg-[#80caa5] text-[#fff]">
          OK
        </NumPadButton>
      </div>
    </div>
  )
}
