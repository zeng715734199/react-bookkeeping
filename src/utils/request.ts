import axios, { AxiosRequestHeaders } from 'axios'
import {
  getLocalStorage,
  historyUtils,
  removeLocalStorage,
} from '@/utils/index'
import { message } from 'antd'
import store from '@/store'
import { setUserInfo } from '@/store/actions'

const instance = axios.create({
  baseURL: 'http://lbp-test.lifewit.cn/api/lbp/',
  timeout: 30000,
  transformResponse: [
    function (data) {
      return data !== '' ? JSON.parse(data) : data
    },
  ],
})

let globalRequestInfo: { url: string | null } = {
  url: null,
}

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 判断是否是登录接口
    if (config.url === 'v1/api/auth/login') {
      config.headers && delete config.headers.Authorizations
    } else {
      const bpmToken = getLocalStorage('bpmToken')
      if (bpmToken) {
        config.headers = {
          Authorization: bpmToken as string,
          ...config.headers,
        } as AxiosRequestHeaders
      }
    }
    globalRequestInfo.url = config.url as string
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  //成功响应
  (response) => response,
  //错误响应
  ({ response }) => {
    const data = response?.data
    if (!data) {
      message.error('您的网络发生异常，无法连接服务器')
      return Promise.reject(response)
    }
    switch (response.status) {
      case 401:
        'msg' in response.data && message.error(data.msg)
        removeLocalStorage('bpmToken')
        store.dispatch(setUserInfo(null))
        historyUtils.push('/login')
        break
      case 404:
        message.error('404:接口不存在')
        break
      case 499:
        message.error(`499:登录超时,请重试`)
        break
      case 500:
        message.error(`500:请联系管理员`)
        break
      default:
        'msg' in response.data && message.error(response.data.msg)
        'message' in response.data && message.error(response.data.message)
    }
    return Promise.reject(response)
  }
)

export default instance
