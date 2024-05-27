import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Card, Divider, message, Modal, Space } from 'antd'
import {
  DeleteOutlined,
  FormOutlined,
  LeftOutlined,
  WarningFilled,
} from '@ant-design/icons'
import Icons from '@/pages/money/widget/icons'
import Title from 'antd/es/typography/Title'
import DoAccount from '@/components/DoAccount'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { RecordObj } from '@/components/DoAccount/types'
import { colorMap } from '@/components/DoAccount/constant'
import { incomes } from '@/components/DoAccount/components/tagList'
import { expenditures } from '@/pages/money/components/filterByTag'
import dayjs from 'dayjs'
import store from '@/store'
import { delRecords } from '@/store/actions'
interface Detail extends RecordObj {
  getDateTime: string
}
const RecordDetails: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [detail, setDetail] = useState<Detail>()
  const localList: RecordObj[] = getLocalStorage('accountRecord') || []
  useEffect(() => {
    const recordItem = localList.find((item) => item.id === id)
    console.log(recordItem, 'rrr')
    setDetail(
      (state) =>
        ({
          ...state,
          ...recordItem,
          getDateTime: `${dayjs(recordItem?.date).format('YYYY年MM月DD日').toString()} ${recordItem?.time}`,
        }) as Detail
    )
  }, [])
  const showConfirm = () => {
    Modal.confirm({
      title: '警告',
      icon: <WarningFilled />,
      content: '确定删除该标签？',
      onOk() {
        store.dispatch(delRecords(id as string))
        const { handleRecords } = store.getState()
        setLocalStorage('accountRecord', handleRecords || [])
        message.success('删除成功~')
        navigate('/money')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

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
            <DoAccount>
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
