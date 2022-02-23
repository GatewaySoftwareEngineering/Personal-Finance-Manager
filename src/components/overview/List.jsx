import React, { useState, useEffect } from 'react'
import {
  Row, Col, Button, Modal, List as AntList
} from "antd";
import { useDispatch } from "react-redux";
import { fetchTransactions } from '../../features/transactions/transactionsSlice';

import Statistics from './Statistics'
import Loading from '../basic/Loading';
import CustomList from '../basic/CustomList';
import NewTransactios from './NewTransactios';

export default function List() {
  const dispatch = useDispatch();
  const [dateList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewTransactionModal, setViewTransactionModal] = useState(false);

  const showTransactionModal = () => {
    setViewTransactionModal(true)
  }
  const closeTransactionModal = () => {
    setViewTransactionModal(false)
  }

  useEffect(() => {
    // to delay the load by 1.5s to simulate the loading state of the components
    setTimeout(() => {
      dispatch(fetchTransactions())
        .then((res) => {
          const { payload } = res
          setDataList(payload)
          setLoading(false)
        }).catch((err) => {
          //handle err
          setLoading(false)
        })
    }, 1500);
  }, [dispatch])

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

        <Col
          span={24}
          className="overview_transactions"
        >
          <span>This Week</span>

          <Loading visible={loading} />
          <div style={{ display: loading ? 'none' : undefined }}>
            <AntList
              itemLayout="vertical"
              dataSource={dateList}
              className="custom_list"
              style={{ marginTop: 15 }}
              pagination={{ pageSize: 6 }}
              renderItem={(item) => (
                <CustomList
                  item={item}
                />
              )}
            />
            <Button
              shape='round'
              type='primary'
              onClick={showTransactionModal}
              style={{
                right: 0,
                bottom: 0,
                position: 'absolute'
              }}
            >
              Add Transaction
            </Button>
          </div>
        </Col>
      </Row>
    </>
  )
}
