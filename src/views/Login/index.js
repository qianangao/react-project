import React from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import {withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import {login} from '../../actions/user'
import './login.less'



class Login extends React.Component{
  formRef=React.createRef()

  onFinish = values => {
    this.props.login(values)
  };
  render() {
    const layout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 4
      },
    };
  return (
    this.props.isLogin?
    <Redirect to="/admin/dashboard" />
    :
    <Card title="登录页面" className="form">
    <Form
      {...layout}
      name="basic"
      ref={this.formRef}
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input disabled={this.props.isLoading}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password disabled={this.props.isLoading}/>
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={this.props.isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
    }
};
const mapState=state=>({isLoading:state.user.isLoading,
isLogin:state.user.isLogin})
export default connect(mapState, {
  login
})(Login)