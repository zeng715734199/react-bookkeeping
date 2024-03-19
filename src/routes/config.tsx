import {
  DatabaseOutlined,
  MoneyCollectOutlined,
  TagOutlined,
} from '@ant-design/icons'
import React from 'react'
import Money from '@/pages/money/index'
import Statistics from '@/pages/statistics/index'
import Labels from '@/pages/labels/index'
import NotFound from '@/notFound'
import Login from '@/pages/login'
import type { RouteObject } from 'react-router-dom'
import { useRoutes, Navigate } from 'react-router-dom'
import PageLayout from '@/components/PageLayout'

// 底部菜单栏
export const tabBar = [
  {
    path: '/money',
    icon: MoneyCollectOutlined,
    title: '记账',
  },
  {
    path: '/statistics',
    icon: DatabaseOutlined,
    title: '统计',
  },
  {
    path: '/labels',
    icon: TagOutlined,
    title: '标签',
  },
]
const routerList = [
  // 菜单相关路由
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/money',
    element: <Money />,
  },
  {
    path: '/statistics',
    element: <Statistics />,
  },
  {
    path: '/labels',
    element: <Labels />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
] as RouteObject[]

export default function () {
  return useRoutes(
    routerList.map((item) =>
      ['/login', '*'].includes(item.path as string)
        ? item
        : {
            ...item,
            element: <PageLayout>{item.element}</PageLayout>,
          }
    )
  )
}
