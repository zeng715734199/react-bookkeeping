import React, { useEffect } from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import RouterApp from './config'
import { historyUtils } from '@/utils'
import store from '@/store'
import { queryUserInfo } from '@api/Login'
import { setUserInfo } from '@/store/actions'

function allRoutes() {
  useEffect(() => {
    // queryUserInfo().then(({ data }) => {
    //   store.dispatch(setUserInfo(data))
    // })
  }, [])
  return (
    <HistoryRouter history={historyUtils}>
      <RouterApp />
    </HistoryRouter>
  )
}

export default allRoutes
