import { Header } from 'antd/es/layout/layout'
import React, { createContext, useState } from 'react'
import NavTab from '@/components/NavBar/navTab'
import { SegmentedLabeledOption } from 'rc-segmented'
export const NavContext = createContext([] as SegmentedLabeledOption<string>[])
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  paddingInline: 48,
  lineHeight: '64px',
  // backgroundColor: '#4096ff',
  backgroundColor: '#79aaf0',
  width: '100%',
}
function NavBar() {
  return (
    <Header style={headerStyle}>
      <NavTab />
    </Header>
  )
}

export default NavBar
