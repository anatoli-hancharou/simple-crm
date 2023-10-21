import { Button, Form, Input, theme } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { register } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { EMAIL_REGEX } from "../../constants/regex-constants";
import useNotificationStore from "../../stores/notificationStore";

const { useToken } = theme;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const { token } = useToken();
  const navigate = useNavigate();
  const setError = useNotificationStore((state) => state.setError);

  const onRegisterHandle = (creds) => {
    register({
      email: creds.email,
      password: creds.password,
    })
    .then(function (response) {
      navigate("/login", { replace: true });
    })
    .catch(function (error) {
      if (error.response.status === 409) {
        setError('Oops...', error.response.data);
      } else {
        setError("Oops...", error.message);
      }
    });
  };

  const validatePassword = async (rule, value) => {
    if (value && value !== form.getFieldValue("password")) {
      throw new Error("Passwords do not match.");
    }
  };

  return (
    <div className={styles.CenteredFormContainer}>
      <Form
        className={styles.RegisterForm}
        form={form}
        name="register_form"
        style={{ borderRadius: token.borderRadius }}
        initialValues={{ remember: true }}
        onFinish={onRegisterHandle}
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
              message: 'Email format is invalid!',
            }
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
            {
              whitespace: true,
              message: "Password can't be empty string!",
            },
            {
              min: 5,
              message: "Password length should be not less than 5 symbols!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.SiteFormItemIcon} />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.SiteFormItemIcon} />}
            placeholder="Confirm password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.RegisterFormButton}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
