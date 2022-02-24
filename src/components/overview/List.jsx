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


  const [updateState, setUpdateState] = useState(false);

  const showTransactionModal = () => {
    setViewTransactionModal(true);
  }
  const closeTransactionModal = () => {
    setViewTransactionModal(false);
    updateComponent();
  }

  const updateComponent = () => {
    setUpdateState(!updateState);
  }

  useEffect(() => {
    // to delay the load by 1.5s to simulate the loading state of the components 
    setLoading(true);
    setTimeout(() => {
      dispatch(fetchTransactions())
        .then((res) => {
          const { payload } = res;
          setDataList([...payload].reverse());
          setLoading(false);
        }).catch(() => {
          //handle err
          setLoading(false);
        })
    }, 750);
  }, [dispatch, updateState]); 

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
          <Loading visible={loading} />
          <div style={{ display: loading ? 'none' : undefined }}>
            <span>This Week</span>

            <AntList
              itemLayout="vertical"
              dataSource={dateList}
              className="custom_list"
              style={{ marginTop: 15 }}
              pagination={{ pageSize: 20 }}
              renderItem={(item) => (
                <React.Fragment key={parseInt(item.id, 10)}>
                  <CustomList
                    item={item}
                  />
                </React.Fragment>
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
