import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import RoutesConfig, { RoutesRaw } from './config'
import Login from '@/pages/login'

export default memo(function (props: object) {
  const { menus } = RoutesConfig
  return (
    <Routes>
      <Route index element={<Login />} />
      {menus.map((item: RoutesRaw) => (
        <Route
          key={item.path}
          path={item.path}
          element={<item.component {...props} />}
        />
      ))}
    </Routes>
  )
})
