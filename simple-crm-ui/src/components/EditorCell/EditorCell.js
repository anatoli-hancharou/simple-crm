import { Button, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const EditorCell = ({ onEditClick, onDeleteClick }) => {
  const [open, setOpen] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleDeleteConfirm = (e) => {
    onDeleteClick();
  };

  const handleDeleteCancel = (e) => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      setOpen(false);
    };

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <Space>
      <Button
        shape="circle"
        icon={<EditOutlined />}
        onClick={() => onEditClick()}
      />
      <Popconfirm
        title="Delete the customer"
        description="Are you sure to delete this customer?"
        open={open}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Yes"
        cancelText="No"
        placement="left"
      >
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => showPopconfirm()}
        />
      </Popconfirm>
    </Space>
  );
};

export default EditorCell;
