import React, { useState } from 'react';
import {
  Row, Col, Typography, Card, Form, Input,
  Button, notification
} from "antd";
import { useDispatch } from 'react-redux';
import { login } from '../../features/users/userSlice';

import sideImage from "../../assets/images/main-logo.png";

export default function Login() {

  const dispatch = useDispatch();
  const [saving, setLoading] = useState(false)

  const onFinish = (val) => {
    setLoading(true)
    if (val.username === 'admin' && val.password === '123') {
      // the set timeout to simulate as if the user check happens somewehere else!
      setTimeout(() => {
        setLoading(false)
        dispatch(login({
          ...val
        }))
        notification.success({
          message: 'Success', 
          description: 'successfully logged in...',
          placement: 'bottomRight',
          duration: 3,
        }); 
      }, 1500);
    } else {
      setLoading(false)
      notification.warning({
        message: 'Warning', 
        description: 'Wrong password provided...',
        placement: 'bottomRight',
        duration: 3,
      });  
    }
  }

  return (
    <>
      <Row justify="center" align="middle">
        <Col span={15}>
          <div className="logo_container">
            <img src={sideImage} alt="Logo" />
          </div>
        </Col>
        <Col span={9}>
          <Row className="login_input_container">
            <Col span={24}>
              <Typography.Title
                align="center"
                style={{ color: '#1c658c' }}
              >
                Finance Manager
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Card bordered={false}>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{
                    username: 'admin',
                    password: '123'
                  }}
                >
                  <Row gutter={[0, 10]}>
                    <Col span={24}>
                      <Form.Item
                        label="User Name"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "This input is required!"
                          },
                        ]}
                      >
                        <Input className='custom_regular_inputs' />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: "This input is required!" },
                        ]}
                      >
                        <Input.Password className='custom_regular_inputs' />
                      </Form.Item>
                    </Col>
                    <Col span={8} offset={16}>
                      <Button
                        block
                        shape="round"
                        type="primary"
                        loading={saving}
                        htmlType="submit"
                        disabled={saving}
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
