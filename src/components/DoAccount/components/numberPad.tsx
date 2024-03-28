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
      const hasPoint = /\./.test(state)
      let money = parseFloat(state + num).toString()
      if (num === '.') return hasPoint ? state : state + num
      if (num === '0' && hasPoint) money = state + num
      if (money.includes('.') && money.split('.')[1]?.length > 2) {
        message.warning('小数点最多两位嗷！👎')
        return state
      }
      if (+money > 10000000) {
        message.warning('记这么多，你有这么多钱吗？👎')
        return state
      }
      return money
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
      OK: () => {
        if (parseFloat(money) === 0) {
          message.warning('吃饱了撑的是吧，0元记了干嘛？')
          return
        }
        onOk()
      },
    } as Record<string, () => void>
    map[value] ? map[value]?.() : setNum(value)
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
