import React from 'react'
import { Card, Divider, Space } from 'antd'
import Tag from '@/pages/money/widget/tag'
import Icons from '@/pages/money/widget/icons'
import { useNavigate } from 'react-router-dom'
import { RenderRecords } from '@/store/types'
import { expenditures } from '@/pages/money/components/filterByTag'
import { incomes } from '@/components/DoAccount/components/tagList'
import { borderBottomByColor } from '@/utils/shortcuts'
import { colorMap } from '@/components/DoAccount/constant'
const RecordItems: React.FC<{ recordList: RenderRecords[] }> = ({
  recordList = [],
}) => {
  const navigate = useNavigate()
  const goDetail = (id: string) => navigate(`/detail/${id}`)
  return recordList.map((record) => {
    return (
      <div className="p-3" key={record.monthDimension}>
        <div className="text-[#86898f] text-[13px] font-bold flex justify-between items-center">
          <span>{record.monthDimension}</span>
          <span>总支出：￥{record.totalExpense}</span>
          <span>总收入：￥{record.totalIncome}</span>
        </div>
        {record.children?.length
          ? record.children.map((recordItem) => {
              return (
                <Card
                  className="card-reset mb-2 mt-2"
                  key={record.monthDimension + recordItem.date}
                  title={
                    <section className="flex justify-between font-normal">
                      <Space>
                        <span>{recordItem.date}</span>
                        <span>{recordItem.week}</span>
                      </Space>
                      <Space className="text-[13px]">
                        <Tag>收</Tag>
                        <span>￥{recordItem.dailyIncome}</span>
                        <Tag>支</Tag>
                        <span>￥{recordItem.dailyExpense}</span>
                      </Space>
                    </section>
                  }
                  bordered={true}
                >
                  {recordItem.items.map((item) => {
                    return (
                      <div
                        className={`flex justify-between items-center p-2 m-3 ${borderBottomByColor()}`}
                        key={item.id}
                        onClick={() => goDetail(item.id)}
                      >
                        <Icons
                          name={item.tag}
                          background={colorMap[item.tab]}
                        ></Icons>
                        <div className="flex flex-col ml-[5%] mr-[5%] w-full">
                          <span className="text-[14px]">
                            {
                              (item.tab === 'income'
                                ? incomes.find((i) => i.key === item.tag)
                                : expenditures.find((i) => i.key === item.tag)
                              )?.label
                            }
                          </span>
                          <Space
                            className="text-[12px] text-[#b8bcc5] font-bold"
                            split={<Divider type="vertical" />}
                            align={'center'}
                            size={1}
                          >
                            <span>{item.time}</span>
                            <div className="min-w-20 break-all">
                              {item.note}
                            </div>
                          </Space>
                        </div>
                        <div className="text-[16px] w-[50%] text-right">
                          {`${item.tab === 'income' ? '+' : '-'}${item.money}`}
                        </div>
                      </div>
                    )
                  })}
                </Card>
              )
            })
          : null}
      </div>
    )
  })
}

export default RecordItems
