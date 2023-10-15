import { EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import CustomerStatus from "../../components/CustomerStatus/CustomerStatus";
import { CustomerStatusLookup } from "../../constants/customer-status";
import { updateCustomer } from "../../services/apiService";
import useParamsStore from "../../stores/paramsStore";
import CustomerPopup from "../CustomerPopup/CustomerPopup";
import styles from "./CustomerTable.module.css";

const CustomerTable = ({ data, loading, onCustomerAdded }) => {
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();
  const setParams = useParamsStore((state) => state.setParams);
  const tableParams = useParamsStore((state) => state.tableParams);

  const handleCancel = () => {
    setCustomerPopupOpen(false);
  };

  const onEditClick = (rowData) => {
    setSelectedRowData({ ...rowData, dueDate: dayjs(rowData.dueDate) });
    setCustomerPopupOpen(true);
  };

  const onUpdateCustomer = async (customer) => {
    await updateCustomer(selectedRowData.id, customer);
    setCustomerPopupOpen(false);
    onCustomerAdded();
  };

  const onTableChange = (pagination, filters, sorter, extra) => {
    setParams({
      filters: filters,
      sorters: { ...tableParams?.sorters, [sorter.field]: sorter.order },
    });
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: CustomerStatusLookup.map(({ label, value }) => ({
        text: label,
        value,
      })),
      filteredValue: tableParams?.filters?.status,
      onFilter: (value, record) => record.status === value,
      render: (_, { status }) => (
        <>
          <CustomerStatus status={status} />
        </>
      ),
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      defaultSortOrder: "descend",
      sortOrder: tableParams?.sorters?.dueDate,
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      render: (_, { dueDate }) => dayjs(dueDate).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => {
        return (
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onEditClick(record)}
          />
        );
      },
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
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
        onChange={onTableChange}
      />
      <CustomerPopup
        title="Edit customer"
        open={isCustomerPopupOpen}
        onCancel={handleCancel}
        onCreate={onUpdateCustomer}
        values={selectedRowData}
      ></CustomerPopup>
    </>
  );
};

export default CustomerTable;
