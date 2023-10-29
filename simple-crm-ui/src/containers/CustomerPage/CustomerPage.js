import React, { useState, useEffect, useCallback } from "react";
import { getAllCustomers } from "../../services/apiService";
import CustomerTable from "../../components/CustomerTable/CustomerTable";
import CustomerToolbar from "../../components/CustomerToolbar/CustomerToolbar";
import useAuthStore from "../../stores/authStore";
import useNotificationStore from "../../stores/notificationStore";

function CustomerPage(props) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const setError = useNotificationStore((state) => state.setError);

  const loadAllCustomers = useCallback(async () => {
    getAllCustomers()
      .then(({ data }) => {
        setData(data);
      })
      .catch(err => setError(err.message, err.description))
      .finally(() => setLoading(false));
  }, [setError]);

  const reloadData = async () => {
    setLoading(true);
    await loadAllCustomers();
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        setLoading(true);
        await loadAllCustomers();
      };
      fetchData();
    }
  }, [token, loadAllCustomers]);

  return (
    <>
      <CustomerToolbar onCustomerAdded={reloadData}></CustomerToolbar>
      <CustomerTable
        data={data}
        loading={loading}
        onDataChanged={reloadData}
      ></CustomerTable>
    </>
  );
}

export default CustomerPage;
