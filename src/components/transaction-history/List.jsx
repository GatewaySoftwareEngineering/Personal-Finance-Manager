/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Row, Col, List as AntList, Form, Input, Button,
  Select, DatePicker, Dropdown, Space, Radio, Divider,
  Checkbox,
  Tooltip
} from "antd";
import {
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { historyTransactions } from '../../features/transaction-history/historySlice';

import _ from 'lodash';
import moment from 'moment';

import Loading from '../basic/Loading';
import CustomList from '../basic/CustomList';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function List() {

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // states
  const [dataList, setDataList] = useState();
  const [loading, setLoading] = useState(true);
  const [typeValue, setTypeValue] = useState('all');
  const [enableRangePicker, setEnableRangePicker] = useState(false);

  const fetchTransactions = (allValues) => {
    setLoading(true);

    let query = {}
    if (allValues) {
      query = allValues;
    }

    setTimeout(() => {
      dispatch(historyTransactions(query))
        .then((res) => {
          const { payload } = res;
          setDataList(payload);
          setLoading(false);
        }).catch(() => {
          //handle err
          setLoading(false);
        })
    }, 500);
  }

  const onValuesChange = _.debounce((changedValue, allValues) => {

    if (changedValue.type) {
      setTypeValue(changedValue.type);
      form.resetFields(['category']);
    }

    const formValues = form.getFieldValue();
    fetchTransactions(formValues);
  }, 500);

  const clearMainSerach = () => {
    form.resetFields(['note']);
    const formValues = form.getFieldValue();
    fetchTransactions(formValues);
  }

  const clearFilters = () => {
    form.resetFields(['category', 'type', 'date_to', 'date_from', 'date_range']);
    const formValues = form.getFieldValue();
    fetchTransactions(formValues);
  }

  const disableFutureDates = (current) => {
    return current.isAfter(moment());
  }

  const onShowRange = (e) => {
    const { checked } = e.target;
    clearFilters();
    setEnableRangePicker(checked);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const dropdown = (
    <>
      <div className="category_dropdown">
        <Col span={24}>
          <Form.Item name="type"                             >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value='Income'>Income</Radio>
                <Radio value='Expense'>Expense</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Divider dashed />
          <Checkbox onChange={onShowRange}>
            <Tooltip title="Enable range picker">
              Date Range
            </Tooltip>
          </Checkbox>
        </Col>
      </div>
    </>
  )

  return (
    <>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <Form
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <Row>
              <Col span={24}>
                <Form.Item name="note">
                  <Input
                    autoComplete='off'
                    className='custom_serach_input'
                    placeholder='Search for transactions...'
                    prefix={<SearchOutlined />}
                    addonAfter={(
                      <Button type='primary' onClick={clearMainSerach}>Clear</Button>
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div className="transaction_history_filter_container">
                  <div className="filter_icon">
                    <Dropdown overlay={dropdown}>
                      <Button
                        type="text"
                        shape="circle"
                        icon={<FilterOutlined />}
                      />
                    </Dropdown>
                  </div>
                  <div className="filter_by_type">
                    <Form.Item name="category">
                      <Select
                        mode="multiple"
                        className="custom_select_input"
                        placeholder="Filter by Type..."
                      >
                        {typeValue !== "Expense" && (
                          <>
                            <Option value="Salary">Salary</Option>
                            <Option value="Loan">Loan</Option>
                            <Option value="Gift">Gift</Option>
                          </>
                        )}
                        {typeValue !== "Income" && (
                          <>
                            <Option value="Tech">Tech</Option>
                            <Option value="Food">Food</Option>
                            <Option value="Sports">Sports</Option>
                            <Option value="Health">Health</Option>
                          </>
                        )}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="filter_date_picker">
                    <Row gutter={[10, 10]}>
                      {!enableRangePicker && (
                        <>
                          <Col span={12}>
                            <Form.Item name="date_from">
                              <DatePicker
                                placeholder="From"
                                className="custom_date_inputs"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item name="date_to">
                              <DatePicker
                                placeholder="To"
                                className='custom_date_inputs'
                                disabledDate={disableFutureDates}
                              />
                            </Form.Item>
                          </Col>
                        </>
                      )}

                      {enableRangePicker && (
                        <Col span={24}>
                          <Form.Item name="date_range">
                            <RangePicker
                              className='custom_date_inputs'
                              ranges={{
                                'yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
                                'Today': [moment(), moment()],
                                'This Week': [moment().startOf('week'), moment().endOf('week')],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                                'This Year': [moment().startOf('years'), moment().endOf('years')],
                              }}
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                  </div>
                  <div className="clear_filter_button">
                    <Button type='primary' onClick={clearFilters}>Clear</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col
          span={24}
          className="overview_transactions"
        >
          <Loading visible={loading} />
          <div style={{ display: loading ? 'none' : undefined }}>

            <AntList
              itemLayout="vertical"
              className="custom_list"
              style={{ marginTop: 15 }}
              pagination={{ pageSize: 10 }}
              dataSource={dataList ? dataList : []}
              renderItem={(item) => (
                <React.Fragment key={item.id}>
                  <CustomList
                    item={item}
                  />
                </React.Fragment>
              )}
            />
          </div>
        </Col>

      </Row>
    </>
  )
}
