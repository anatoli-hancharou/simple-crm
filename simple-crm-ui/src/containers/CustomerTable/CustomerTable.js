import React, { useState, useEffect } from 'react';
import { Table, Button, Layout,  } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CustomerStatus from '../../components/CustomerStatus/CustomerStatus';
import CustomerPopup from '../CustomerPopup/CustomerPopup';
import dayjs from 'dayjs';
import styles from './CustomerTable.module.css'
import { getAllCustomers } from '../../services/apiService';
import { useAuth } from '../../providers/authProvider';

const CustomerTable = () => {
  const [data, setData] = useState();
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleCancel = () => {
    setCustomerPopupOpen(false);
  };

  const onEditClick = (rowData) => {
    console.log(dayjs(rowData.dueDate));
    setSelectedRowData({...rowData, dueDate: dayjs(rowData.dueDate)});
    setCustomerPopupOpen(true);
  }

  useEffect(() => {
    if (token) {
      const fetchData = () => {
        setLoading(true);
          getAllCustomers()
          .then(({ data }) => {
            setData(data);
            setLoading(false);
            // setTableParams({
            //   ...tableParams,
            //   pagination: {
            //     ...tableParams.pagination,
            //     total: 200,
            //     // 200 is mock data, you should read it from server
            //     // total: data.totalCount,
            //   },
            // });
          });
      };
      fetchData();
    }
  }, [token]);

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
    <CustomerPopup title="Edit customer" open={isCustomerPopupOpen} onCancel={handleCancel} values={selectedRowData}></CustomerPopup>
  </>
)};

export default CustomerTable;