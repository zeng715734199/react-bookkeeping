import {
  DatabaseOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import React from 'react'
import Money from '@/pages/money/index'
import Statistics from '@/pages/statistics/index'
import Settings from '@/pages/settings/index'
import NotFound from '@/notFound'
import Login from '@/pages/login'
import type { RouteObject } from 'react-router-dom'
import type { AntdIconProps } from '@ant-design/icons/es/components/AntdIcon'
import { useRoutes } from 'react-router-dom'
import PageLayout from '@/components/PageLayout'
import RecordDetails from 'src/pages/detail'

export type TabItem = {
  path: string
  icon: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >
  title: string
}
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
    path: '/settings',
    icon: SettingOutlined,
    title: '设置',
  },
]
const routerList: RouteObject[] = [
  // 菜单相关路由
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        path: '', // 空路径作为父路由
        element: <Money />,
        children: [
          {
            path: '/money',
            element: <Money />,
          },
        ],
      },
      {
        path: '/statistics',
        element: <Statistics />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '/detail/:id',
    element: <RecordDetails />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
]

export default () => useRoutes(routerList)
