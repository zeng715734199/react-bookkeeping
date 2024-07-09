import React, { useEffect } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import routes from './config'
import store from '@/store'
import { queryUserInfo } from '@api/Login'
import { setUserInfo } from '@/store/actions'

const router = createHashRouter(routes)
function allRoutes() {
  useEffect(() => {
    // queryUserInfo().then(({ data }) => {
    //   store.dispatch(setUserInfo(data))
    // })
  }, [])
  return <RouterProvider router={router}></RouterProvider>
}

export default allRoutes
