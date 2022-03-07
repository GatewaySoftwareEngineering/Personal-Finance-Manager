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
  const [dataList, setDataList] = useState();
  const [loading, setLoading] = useState(true);
  const [updateState, setUpdateState] = useState(false);
  const [viewTransactionModal, setViewTransactionModal] = useState(false);

  const showTransactionModal = () => {
    setViewTransactionModal(true);
  }
  const closeTransactionModal = () => {
    setViewTransactionModal(false);
  }

  const updateComponent = () => {
    setUpdateState(!updateState);
  }

  useEffect(() => {
    // to delay the load by 1.5s to simulate the loading state of the components 
    setLoading(true);
    setTimeout(() => {
      dispatch(fetchTransactions({ limit: 10 }))
        .then((res) => {
          const { payload } = res;
          setDataList(payload);
          setLoading(false);
        }).catch(() => {
          //handle err
          setLoading(false);
        })
    }, 500);
  }, [dispatch, updateState]);

  return (
    <>
      <Modal
        centered
        footer={false}
        title="Add Transaction"
        className="transaction_modal"
        visible={viewTransactionModal}
        onCancel={closeTransactionModal}
      >
        <NewTransactios 
          closeModal={closeTransactionModal}
          updateParentComponent={updateComponent}
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
            <span>{dataList ? dataList.title : ''}</span>

            <AntList
              itemLayout="vertical"
              dataSource={dataList ? dataList.data : []}
              className="custom_list"
              style={{ marginTop: 15 }}
              renderItem={(item) => (
                <React.Fragment key={item.id}>
                  <CustomList
                    item={item}
                  />
                </React.Fragment>
              )}
            />
            <Col span={24} style={{ textAlign: 'end' }}>
              <Button
                shape='round'
                type='primary'
                onClick={showTransactionModal}
              >
                Add Transaction
              </Button>
            </Col>
          </div>
        </Col>
      </Row>
    </>
  )
}
