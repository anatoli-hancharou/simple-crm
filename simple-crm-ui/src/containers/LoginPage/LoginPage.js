import React from 'react';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import { Login } from '../../services/apiService';
import { useAuth } from '../../providers/authProvider';
import { useNavigate } from "react-router-dom";
import styles from './LoginPage.module.css'

const LoginPage = () => {

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const onLoginHandle = (creds) => {
    Login({
      email: creds.login,
      password: creds.password
    })
    .then(function (response) {
      setToken(response.data.token);
      navigate("/customers", { replace: true });
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <Form className={styles.LoginForm}
      name="login_form"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onLoginHandle}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Login"
        name="login"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button 
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginPage;