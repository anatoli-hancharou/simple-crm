import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Tooltip, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigation, Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
import useAuthStore from "../../stores/authStore";

const { Header, Content, Footer, Sider } = Layout;
const menuItems = [
  {
    key: "1",
    icon: React.createElement(UserOutlined),
    label: <Link to="/customers">Main</Link>,
  },
];

const MainLayout = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = useAuthStore((state) => state.logout);

  const navigation = useNavigation();

  return (
    <Layout hasSider>
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
          defaultSelectedKeys={["1"]}
          theme="dark"
          mode="inline"
          items={menuItems}
        />
        <Tooltip placement="rightTop" title={"Logout"}>
          <Button
            onClick={() => logout(null)}
            className={styles.LogoutButton}
            ghost
            size="large"
            icon={<LogoutOutlined />}
          ></Button>
        </Tooltip>
      </Sider>
      <Layout className={styles.SiteLayout}>
        {/* <Header className={styles.Header}
          style={{
            background: colorBgContainer,
          }}
        /> */}
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
