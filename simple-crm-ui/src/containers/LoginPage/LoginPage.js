import React from "react";
import { Button, Form, Input, notification, theme } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../../services/apiService";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import useAuthStore from "../../stores/authStore";
import { EMAIL_REGEX } from "../../constants/regex-constants";

const { useToken } = theme;

const LoginPage = () => {
  const { token } = useToken();
  const [form] = Form.useForm();
  const registerToken = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onLoginHandle = (creds) => {
    login({
      email: creds.email,
      password: creds.password,
    })
      .then(function (response) {
        registerToken(response.data.token);
        navigate("/customers", { replace: true });
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          openNotificationWithIcon("error", "Oops...", "Incorrect email or password. Please try again.");
          form.resetFields();
        }
      });
  };

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  return (
    <div className={styles.CenteredFormContainer}>
      {contextHolder}
      <Form
        className={styles.LoginForm}
        form={form}
        name="login_form"
        style={{ borderRadius: token.borderRadius }}
        initialValues={{ remember: true }}
        onFinish={onLoginHandle}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              pattern: EMAIL_REGEX,
              message: "Email format is invalid!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className={styles.SiteFormItemIcon} />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.SiteFormItemIcon} />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.LoginFormButton}
          >
            Login
          </Button>
        </Form.Item>

        <Form.Item>
          <div className={styles.RegisterLink}>
            <Link to="/register">Register</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
