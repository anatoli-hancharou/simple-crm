import { Layout, Space, Button } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import styles from "./CustomerToolbar.module.css";
import { useState } from "react";
import CustomerPopup from "../CustomerPopup/CustomerPopup";
import { addCustomer } from "../../services/apiService";

function CustomerToolbar({ onCustomerAdded }) {
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);

  const handleCancel = () => {
    setAddPopupOpen(false);
  };

  const onAddClick = () => {
    setAddPopupOpen(true);
  };

  const onCreateCustomer = async (customer) => {
    await addCustomer(customer);
    setAddPopupOpen(false);
    onCustomerAdded();
  };

  return (
    <>
      <Layout className={styles.Toolbar}>
        <Space>
          <Button icon={<UsergroupAddOutlined />} onClick={onAddClick}>
            Add
          </Button>
        </Space>
      </Layout>
      <CustomerPopup
        title="Add customer"
        open={isAddPopupOpen}
        onCancel={handleCancel}
        onSubmit={onCreateCustomer}
      ></CustomerPopup>
    </>
  );
}

export default CustomerToolbar;
