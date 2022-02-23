import React from 'react'
import {
  Space, Avatar,  
} from "antd";
import { IssuesCloseOutlined } from "@ant-design/icons";

export default function CustomList({ item }) {
  console.log(item)
  return (
    <div className="transaction_row">
      <Space>
        <Avatar
          icon={<IssuesCloseOutlined />}
          style={{ backgroundColor: '#1c658c' }}
        />
        <p>12 Rules for life by Jordan Peterson signed by himself...</p>
      </Space>
      <div className="transaction_row_end_child">
        <span>Today</span>
        <div>-$45</div>
      </div>
    </div>
  )
}
