import React from 'react'
import {
  Row, Col, Space, Avatar, Form, Input, Button,
  Select, DatePicker
} from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  IssuesCloseOutlined
} from "@ant-design/icons";
import moment from 'moment'

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function List() {
  const [form] = Form.useForm();

  const onValuesChange = (val) => {
    console.log(val)
  }

  const clearMainSerach = () => {
    form.resetFields(['search']);
  }
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
                <Form.Item name="search">
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
                    <FilterOutlined />
                  </div>
                  <div className="filter_by_type">
                    <Form.Item name="type">
                      <Select
                        mode="multiple" 
                        className="custom_select_input"
                        placeholder="Filter by Type..."
                      >
                        <Option value="Salary">Salary</Option>
                        <Option value="Loan">Loan</Option>
                        <Option value="Gift">Gift</Option>
                        <Option value="Tech">Tech</Option>
                        <Option value="Food">Food</Option>
                        <Option value="Sports">Sports</Option>
                        <Option value="Health">Health</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="filter_date_picker">
                    <Form.Item name="date">
                      <RangePicker
                        className='custom_date_inputs'
                        ranges={{
                          'yesterday': [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
                          'Today': [moment(), moment()],
                          'This Month': [moment().startOf('month'), moment().endOf('month')],
                          'This Year': [moment().startOf('years'), moment().endOf('years')],
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="clear_filter_button">
                    <Button type='primary'>Clear</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24} className="overview_transactions">
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
      </Row>
    </>
  )
}
