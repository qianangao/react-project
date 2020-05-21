import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Spin,
} from 'antd';

import { getLogin } from '../../actions/users'

import './login.less'

const mapState = state => ({
  isLogin: state.users.isLogin,
  isLoading: state.users.isLoading
})

@connect(mapState, { getLogin })
class Login extends Component {
  render() {
      const onFinish = values => {
        // console.log('Success:', values);
        this.props.getLogin(values)
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

    return (
      this.props.isLogin
      ?
      <Redirect to='./admin' />
      :
      <Spin spinning={this.props.isLoading}>
        <Card className='ko-card' title="QF 管理后台登录" bordered={false}>
          <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="username"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <div className='bottom'>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember Me</Checkbox>
              </Form.Item>
              <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              </Form.Item>
          </div>
        </Form>
        </Card>
      </Spin>
    )
  }
}

export default Login