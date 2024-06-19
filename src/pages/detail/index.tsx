import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Card, Divider, message, Modal, Space } from 'antd'
import {
  DeleteOutlined,
  FormOutlined,
  LeftOutlined,
  WarningFilled,
} from '@ant-design/icons'
import Icons from '@/components/Icons/icons'
import Title from 'antd/es/typography/Title'
import DoAccount from '@/components/DoAccount'
import { setLocalStorage } from '@/utils'
import { InitialRecord, RecordObj } from '@/components/DoAccount/types'
import { colorMap } from '@/components/DoAccount/constant'
import {
  incomes,
  expenditures,
} from '@/components/DoAccount/components/tagList'
import dayjs from 'dayjs'
import store from '@/store'
import { delRecords, editRecords } from '@/store/actions'

interface Detail extends RecordObj {
  getDateTime: string
}
const RecordDetails: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [detail, setDetail] = useState<Detail>()
  const getRecordItem = () => {
    const { handleRecords: recordList } = store.getState()
    return (recordList as RecordObj[]).find((item) => item.id === id)
  }
  const init = () => {
    const recordItem = getRecordItem()
    recordItem &&
      setDetail(
        (state) =>
          ({
            ...state,
            ...recordItem,
            getDateTime: `${dayjs(recordItem?.date).format('YYYY年MM月DD日').toString()} ${recordItem?.time}`,
          }) as Detail
      )
  }
  const submit = (record: InitialRecord) => {
    const obj = {
      ...record,
      money: parseFloat(record.money).toString(),
      date: record.date.format('YYYY-MM-DD'),
      time: record.time.format('HH:mm:ss'),
    } as RecordObj
    store.dispatch(editRecords(obj))
    message.success('修改成功~')
    init()
  }

  const showConfirm = () => {
    Modal.confirm({
      title: '警告',
      icon: <WarningFilled />,
      content: '确定删除该标签？',
      onOk() {
        store.dispatch(delRecords(id as string))
        message.success('删除成功~')
        navigate('/money')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  useEffect(() => {
    init()
    // 监听state的变化
    const unsubscribe = store.subscribe(() => {
      const { handleRecords } = store.getState()
      console.log('详情页监听中..', handleRecords)
      setLocalStorage('accountRecord', handleRecords as RecordObj[])
    })
    return () => {
      // 取消监听
      unsubscribe()
    }
  }, [])

  return (
    <div className="p-3 bg-baseBg h-full">
      <Breadcrumb
        items={[
          {
            href: '/money',
            title: <LeftOutlined className="text-[#55575b]" />,
          },
        ]}
      />
      <Card bordered={true} className="mt-2 mx-2 text-center card-reset">
        <div className="mt-6 mx-6 mb-4">
          <Space className="flex justify-center items-center" size="small">
            <Icons
              name="shopping"
              size={25}
              background={detail?.tab ? colorMap[detail.tab] : undefined}
            ></Icons>
            <span>
              {
                (detail?.tab === 'income'
                  ? incomes.find((i) => i.key === detail?.tag)
                  : expenditures.find((i) => i.key === detail?.tag)
                )?.label
              }
            </span>
          </Space>
          <Title level={2} className="my-4">
            {`${detail?.tab === 'income' ? '+' : '-'}${detail?.money}`}
          </Title>
          <table className="text-left text-[14px] my-6">
            <tbody>
              <tr>
                <td className="text-[#a1a3a8] font-bold">记录时间：</td>
                <td>{detail?.getDateTime}</td>
              </tr>
              <tr>
                <td className="text-[#a1a3a8] font-bold">备注：</td>
                <td>{detail?.note}</td>
              </tr>
            </tbody>
          </table>
          <Space
            className="flex justify-center pt-4 mt-4 border-solid border-0 border-t border-[#eee]"
            split={<Divider type="vertical" />}
            align={'center'}
            size={50}
          >
            <DoAccount defaultValue={getRecordItem()} onSubmit={submit}>
              <Button icon={<FormOutlined />}>修改</Button>
            </DoAccount>
            <Button danger icon={<DeleteOutlined />} onClick={showConfirm}>
              删除
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  )
}

export default RecordDetails
