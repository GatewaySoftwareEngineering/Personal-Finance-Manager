import React, { useState, useEffect } from 'react'
import {
  Row, Col, Space, Form, InputNumber, notification,
  DatePicker, Select, Radio, Input, Button
} from "antd";
import { useSelector } from "react-redux";

import moment from 'moment';
import uniqid from 'uniqid';

const { Option } = Select

export default function NewTransactios({ closeModal }) {

  const [form] = Form.useForm();
  const { transactions }  = useSelector((state) => state.transactions); 

  // states
  const [type, setType] = useState('Income');
  const [saving, setSaving] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);

  const onFinish = async (val) => {
    setSaving(true);
    // const lastTransactionObj =  allTransactions.slice(-1).pop();
    // const generatedId = parseInt(lastTransactionObj.id, 10) + 1;
    const transactionArray = [...allTransactions];

     const data = await {
      ...val,
      id: uniqid().toString(),
      date: moment(val.date).format(),
    } 

    transactionArray.push(data);
    localStorage.setItem('fm-transactions', JSON.stringify(transactionArray));
    
    setTimeout(() => { 
      notification.success({
        message: 'Success', 
        description: 'Transaction added successfully',
        placement: 'bottomRight',
        duration: 3,
      }); 
      setSaving(false);
      closeModal();
    }, 1000);
  }

  const onTypeChange = (val) => {
    const { value } = val.target;
    setType(value)
    if (value === 'Income') {
      form.setFieldsValue({
        category: 'Salary'
      });  
    } else if (value === 'Expense') {
      form.setFieldsValue({
        category: 'Tech'
      }); 
    } 
  }

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('fm-transactions'));
    if (ls !== null) setAllTransactions(ls);
    else setAllTransactions(transactions); 
  }, [transactions])
  

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ 
          type: 'Income',
          date: moment(),
          category: 'Salary',
        }}
      >
        <Row gutter={[12, 20]} style={{ marginTop: 40, marginBottom: 10 }}>

          <Col span={8}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{
                required: true,
                message: 'This input is required!',
              }]}
            >
              <Select
                allowClear={false}
                className="custom_select_input"
              >
                {type === 'Income' && (
                  <>
                    <Option value="Salary">Salary</Option>
                    <Option value="Loan">Loan</Option>
                    <Option value="Gift">Gift</Option>
                  </>
                )}
                {type === 'Expense' && (
                  <>
                    <Option value="Tech">Tech</Option>
                    <Option value="Food">Food</Option>
                    <Option value="Sports">Sports</Option>
                    <Option value="Health">Health</Option>
                  </>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{
                required: true,
                message: 'This input is required!',
              }]}
            >
              <DatePicker
                allowClear={false}
                className='custom_date_inputs'
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{
                required: true,
                message: 'Amount is required and it must be bigger than 0!',
              }]}
            >
              <InputNumber
                min={0}
                className='custom_number_inputs'
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{
                required: true,
                message: 'This input is required!',
              }]}
            >
              <Radio.Group onChange={onTypeChange}>
                <Radio value="Income">Income</Radio>
                <Radio value="Expense">Expense</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Note"
              name="note"
              rules={[{
                required: true,
                message: 'This input is required!',
              }]}
            >
              <Input.TextArea
                rows={5}
                showCount
                maxLength={350}
                className="input_textarea_input"
              />
            </Form.Item>
          </Col>


          <Col span={24} style={{ textAlign: 'end' }}>
            <Space size={20}>
              <Button
                shape='round'
                onClick={closeModal}
              >
                Dismiss
              </Button>
              <Button
                shape='round'
                type='primary'
                htmlType='submit'
                loading={saving}
                disabled={saving}
              >
                Add Transaction
              </Button>
            </Space>
          </Col>

        </Row>
      </Form>
    </>
  )
}
