import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CustomerStatus from '../../components/CustomerStatus/CustomerStatus';
import CustomerPopup from '../CustomerPopup/CustomerPopup';
import { updateCustomer } from '../../services/apiService';
import dayjs from 'dayjs';
import styles from './CustomerTable.module.css'

const CustomerTable = ({ data, loading, onCustomerAdded }) => {
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();

  const handleCancel = () => {
    setCustomerPopupOpen(false);
  };

  const onEditClick = (rowData) => {
    setSelectedRowData({...rowData, dueDate: dayjs(rowData.dueDate)});
    setCustomerPopupOpen(true);
  }

  const onUpdateCustomer = async (customer) => {
    await updateCustomer(selectedRowData.id, customer);
    setCustomerPopupOpen(false);
    onCustomerAdded();
  }

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          <CustomerStatus status={status}/>
        </>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'dueDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (_, record) => {
        return <Button shape="circle" icon={<EditOutlined />} onClick={() => onEditClick(record)} /> },
    },
  ];

  return (
  <>
    <Table
      columns={columns}
      size="small"
      rowKey={(record) => record.id}
      loading={loading}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description}
          </p>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      dataSource={data}
    />
    <CustomerPopup title="Edit customer" open={isCustomerPopupOpen} onCancel={handleCancel} onCreate={onUpdateCustomer} values={selectedRowData}></CustomerPopup>
  </>
)};

export default CustomerTable;