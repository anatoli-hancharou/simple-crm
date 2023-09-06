import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import styles from './Layout.module.css'

const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    key: '1',
    icon: React.createElement(UserOutlined),
    label: "Main",
  }
]

const MainLayout = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={['1']} theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout className={styles.SiteLayout}>
        {/* <Header className={styles.Header}
          style={{
            background: colorBgContainer,
          }}
        /> */}
        <Content className={styles.ContentBlock}>
          {props.children}
        </Content>
        <Footer className={styles.Footer}>
          SimpleCRM ©2023 Created by Anatoli Hancharou
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;