import { Table, Input } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import CustomerStatus from "../CustomerStatus/CustomerStatus";
import { CustomerStatusLookup } from "../../constants/customer-status";
import { deleteCustomer, updateCustomer } from "../../services/apiService";
import useParamsStore from "../../stores/paramsStore";
import CustomerPopup from "../../containers/CustomerPopup/CustomerPopup";
import styles from "./CustomerTable.module.css";
import EditorCell from "../EditorCell/EditorCell";

const { TextArea } = Input;

const CustomerTable = ({ data, loading, onDataChanged }) => {
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

  const onDeleteClick = async (recordId) => {
    await deleteCustomer(recordId);
    onDataChanged();
  };

  const onUpdateCustomer = async (customer) => {
    await updateCustomer(selectedRowData.id, customer);
    setCustomerPopupOpen(false);
    onDataChanged();
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
      render: (_, record) => (
        <EditorCell
          onEditClick={onEditClick.bind(this, record)}
          onDeleteClick={onDeleteClick.bind(this, record.id)}
        />
      ),
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
            <TextArea
              value={record.description}
              disabled={true}
              style={{
                color: "#2d030e",
                fontStyle: "italic",
                backgroundColor: "#f4f4f4",
              }}
            ></TextArea>
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
