import {
  UploadOutlined,
  HomeOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import React from 'react'
import Money from '@/pages/money/index'
import Statistics from '@/pages/statistics/index'
import Labels from '@/pages/labels/index'
import Login from '@/pages/login/index'
import NotFound from '@/notFound'

export type RoutesRaw = {
  path: string
  title: string
  icon: React.FC
  component: React.FC
}

const routesConfig = {
  menus: [
    // 菜单相关路由
    {
      path: '/login',
      title: '登录',
      icon: HomeOutlined,
      component: Login,
    },
    {
      path: '/money',
      title: '记账',
      icon: HomeOutlined,
      component: Money,
    },
    {
      path: '/statistics',
      title: '统计',
      icon: UploadOutlined,
      component: Statistics,
    },
    {
      path: '/labels',
      title: '标签',
      icon: VideoCameraOutlined,
      component: Labels,
    },
    {
      path: '*',
      title: '404',
      icon: null,
      component: NotFound,
    },
  ] as RoutesRaw[],
  others: [], // 非菜单相关路由
}

export default routesConfig
