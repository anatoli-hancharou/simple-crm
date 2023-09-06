import React, { useState } from 'react';
import { Table, Button, Layout,  } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CustomerStatus from '../../components/CustomerStatus/CustomerStatus';
import CustomerPopup from '../CustomerPopup/CustomerPopup';
import dayjs from 'dayjs';
import styles from './CustomerTable.module.css'

const testData = [
  {
    key: 1,
    name: 'John Brown',
    phoneNumber: "+48515122337",
    address: 'New York No. 1 Lake Park',
    status: 0,
    date: '2012-11-10 14:48:00',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    phoneNumber: "+48515122337",
    address: 'London No. 1 Lake Park',
    status: 0,
    date: '2011-10-10 14:48:00',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    phoneNumber: "+48515122337",
    address: 'Jiangsu No. 1 Lake Park',
    status: 1,
    date: '2019-10-10 14:48:00',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 5,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 6,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 7,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 8,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 9,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 10,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 11,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 12,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 13,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 14,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 15,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 16,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 17,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 18,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 19,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 20,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 21,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 22,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 23,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 24,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 25,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 26,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 100,
    name: 'John Brown',
    phoneNumber: "+48515122337",
    address: 'New York No. 1 Lake Park',
    status: 0,
    date: '2012-11-10 14:48:00',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 200,
    name: 'Jim Green',
    phoneNumber: "+48515122337",
    address: 'London No. 1 Lake Park',
    status: 0,
    date: '2011-10-10 14:48:00',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 300,
    name: 'Not Expandable',
    phoneNumber: "+48515122337",
    address: 'Jiangsu No. 1 Lake Park',
    status: 1,
    date: '2019-10-10 14:48:00',
    description: 'This not expandable',
  },
  {
    key: 400,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 500,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 600,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 700,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 800,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 900,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1000,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1100,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1200,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1300,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1400,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1500,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1600,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1700,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1800,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 1900,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 2000,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 2100,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 2200,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 2300,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 2400,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 2500,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
  {
    key: 2600,
    name: 'Joe Black',
    phoneNumber: "+48515122337",
    address: 'Sydney No. 1 Lake Park',
    status: 0,
    date: '2023-10-12 14:48:00',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
];

const CustomerTable = () => {
  const [data, setData] = useState(testData);
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();

  const handleCancel = () => {
    setCustomerPopupOpen(false);
  };

  const onEditClick = (rowData) => {
    setSelectedRowData({...rowData, date: dayjs(rowData.date, 'YYYY-MM-DD HH:mm:ss')});
    setCustomerPopupOpen(true);
  }

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>
          <CustomerStatus status={status}/>
        </>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => {
        return <Button shape="circle" icon={<EditOutlined />} onClick={() => onEditClick(record)} /> },
    },
  ];

  return (
  <>
    <Table
      columns={columns}
      size="small"
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