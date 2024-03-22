import { Header } from 'antd/es/layout/layout'
import React, { JSX } from 'react'

function NavBar(props: { children?: JSX.Element }) {
  return (
    <div className="w-full flex flex-col h-[56px] z-10">
      <Header className="text-center bg-primary text-[#fff] h-full">
        <span className="text-xl font-bold">记账本</span>
      </Header>
      {props.children}
    </div>
  )
}

export default NavBar
