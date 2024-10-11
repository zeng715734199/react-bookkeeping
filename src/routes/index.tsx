import React, { useEffect } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import routes from './config'
const router = createHashRouter(routes)

const allRoutes = () => <RouterProvider router={router}></RouterProvider>

export default allRoutes
