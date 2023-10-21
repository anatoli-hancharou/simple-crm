import React, { useEffect } from "react";
import { UserOutlined, LineChartOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Tooltip, theme, notification } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigation, Outlet, NavLink, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import useAuthStore from "../../stores/authStore";
import useNotificationStore from "../../stores/notificationStore";

const { Content, Footer, Sider } = Layout;

const menuItemProps = [
  {
    icon: <UserOutlined />,
    label: "Customers",
    path: "/customers",
  },
  {
    icon: <LineChartOutlined />,
    label: "Statistics",
    path: "/statistics",
  },
];

const renderMenuItems = () => {
  return menuItemProps.map((item, index) => ({
    key: item.path,
    icon: item.icon,
    label: <NavLink to={item.path}>{item.label}</NavLink>,
  }));
};

const MainLayout = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const error = useNotificationStore((state) => state.error);

  const navigation = useNavigation();
  const location = useLocation();

  const [api, contextHolder] = notification.useNotification();

  const selectedKey = menuItemProps.find((item) =>
    location.pathname.includes(item.path)
  )?.path;

  useEffect(() => {
    if (error.message) {
      api["error"]({
        message: error.message,
        description: error.description,
      });
    }
  }, [error, api]);

  return (
    <Layout hasSider>
      {contextHolder}
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          selectedKeys={[selectedKey]}
          items={renderMenuItems()}
          theme="dark"
          mode="inline"
        />
        {isLoggedIn() && (
          <Tooltip placement="rightTop" title={"Logout"}>
            <Button
              onClick={() => logout(null)}
              className={styles.LogoutButton}
              ghost
              size="large"
              icon={<LogoutOutlined />}
            ></Button>
          </Tooltip>
        )}
      </Sider>
      <Layout className={styles.SiteLayout}>
        <Content
          className={`${styles.ContentBlock} ${
            navigation.state === "loading" ? "loading" : ""
          }`}
        >
          <Outlet />
        </Content>
        <Footer className={styles.Footer}>
          SimpleCRM ©2023 Created by Anatoli Hancharou
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
