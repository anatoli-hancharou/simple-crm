import React from 'react';
import { Button, Form, Input, theme } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Login } from '../../services/apiService';
import { useNavigate } from "react-router-dom";
import styles from './LoginPage.module.css'
import useAuthStore from '../../stores/authStore';

const { useToken } = theme;

const LoginPage = () => {
  const { token } = useToken();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onLoginHandle = (creds) => {
    Login({
      email: creds.login,
      password: creds.password
    })
    .then(function (response) {
      login(response.data.token);
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
    <div className={styles.CenteredFormContainer}>
      <Form className={styles.LoginForm}
        name="login_form"
        style={{ borderRadius: token.borderRadius }}
        initialValues={{ remember: true }}
        onFinish={onLoginHandle}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className={styles.SiteFormItemIcon} />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className={styles.SiteFormItemIcon} />} placeholder="Password"/>
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item>
          <Button 
            type="primary"
            htmlType="submit"
            className={styles.LoginFormButton}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;