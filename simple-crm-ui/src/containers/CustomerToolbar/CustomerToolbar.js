import { Layout, Space, Button } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import styles from './CustomerToolbar.module.css'
import { useState } from 'react';
import CustomerPopup from '../CustomerPopup/CustomerPopup';

function CustomerToolbar(props) {

  const [isAddPopupOpen, setAddPopupState] = useState(false);

  const handleCancel = () => {
    setAddPopupState(false);
  }

  const onAddClick = () => {
    setAddPopupState(true);
  }

  return (
    <>
      <Layout className={styles.Toolbar}>
        <Space>
          <Button icon={<UsergroupAddOutlined />} onClick={onAddClick}>Add</Button>
        </Space>
      </Layout>
      <CustomerPopup title="Add customer" open={isAddPopupOpen} onCancel={handleCancel}></CustomerPopup>
    </>
  );
}

export default CustomerToolbar;