import React, { useState } from 'react'
import {
  Row, Col, Space, Avatar, Button, Modal
} from "antd";
import {
  IssuesCloseOutlined
} from "@ant-design/icons";

import Statistics from './Statistics' 
import NewTransactios from './NewTransactios'

export default function List() {
  const [viewTransactionModal, setViewTransactionModal] = useState(false);

  const showTransactionModal = () => {
    setViewTransactionModal(true)
  }
  const closeTransactionModal = () => {
    setViewTransactionModal(false)
  }
  
  return (
    <>
    <Modal
        centered
        footer={false}
        key={Math.random()}
        title="Add Transaction"
        width="calc(100% - 240px)"
        className="transaction_modal"
        visible={viewTransactionModal}
        onCancel={closeTransactionModal}
      >
        <NewTransactios 
          closeModal={closeTransactionModal}
        /> 
      </Modal>

      <Row gutter={[0, 80]}>
        <Col span={24}>
          <Statistics />
        </Col>
        <Col span={24} className="overview_transactions">
          <span>This Week</span>
          <div className="transaction_container">

            <div>
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
            <div>
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
            <div>
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

          </div>
        </Col>
        <Col span={24} style={{ textAlign: 'end' }}>
          <Button
            shape='round'
            type='primary'
            onClick={showTransactionModal}
          >
            Add Transaction
          </Button>
        </Col>
      </Row>
    </>
  )
}
