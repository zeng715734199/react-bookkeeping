import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Card, message } from 'antd'
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import './style.less'
import { useNavigate } from 'react-router-dom'

import { getLocalStorage, setLocalStorage } from '@/utils'
import { queryLogin, queryUserInfo } from '@api/Login'
import store from '@/store'
import { setUserInfo } from '@/store/actions'
type FieldType = {
  username?: string
  password?: string
  remember?: boolean
}

const Login: React.FC = () => {
  const localKey = 'userInfo'
  const navigate = useNavigate()
  const initVal = {
    remember: true,
    username: '',
    password: '',
  }
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const obj = JSON.parse(getLocalStorage(localKey) as string) || {}
    form.setFieldsValue({
      ...initVal,
      ...obj,
    })
  }, [])

  const onFinish = (values: FieldType) => {
    queryLogin({
      userId: values.username as string,
      password: values.password as string,
    })
      .then(({ data }) => {
        if (data.token) {
          message.success('登录成功~')
          setLocalStorage('token', data.token)
          values.remember &&
            setLocalStorage(localKey, {
              username: values.username,
              password: values.password,
            })
        }
      })
      .then(() => {
        queryUserInfo().then(({ data }) => {
          store.dispatch(setUserInfo(data))
          navigate('/money')
        })
      })
  }

  const onFinishFailed = (errorInfo: ValidateErrorEntity<FieldType>) => {
    messageApi.error('提交失败')
  }

  return (
    <>
      {contextHolder}
      <Card className="login-container">
        <Form
          name="Login"
          className="login-form"
          initialValues={initVal}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名~' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码~' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item className="login-btn-wrap">
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default Login
