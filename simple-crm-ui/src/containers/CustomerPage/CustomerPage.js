import React, { useState, useEffect } from 'react';
import { getAllCustomers } from "../../services/apiService";
import CustomerTable from "../../components/CustomerTable/CustomerTable";
import CustomerToolbar from "../CustomerToolbar/CustomerToolbar";
import useAuthStore from '../../stores/authStore';

function CustomerPage(props) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);

  const loadAllCustomers = async () => {
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
    })
    .finally(() => setLoading(false));
  }

  const reloadData = async () => {
    setLoading(true);
    await loadAllCustomers();
  }

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        setLoading(true);
        await loadAllCustomers();
      };
      fetchData();
    }
  }, [token]);

  return (
    <>
      <CustomerToolbar onCustomerAdded={reloadData}>
      </CustomerToolbar>
      <CustomerTable data={data} loading={loading} onDataChanged={reloadData}>
      </CustomerTable>
    </>
  );
}

export default CustomerPage;