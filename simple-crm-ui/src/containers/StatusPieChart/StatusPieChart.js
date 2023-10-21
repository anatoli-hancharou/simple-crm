import { Pie } from "@ant-design/plots";
import React, { useState, useEffect, useCallback } from "react";
import { getStatusDistributionByOverTimeRange } from "../../services/apiService";
import {
  CustomerStatusLookup,
  CustomerStatusProps,
} from "../../constants/customer-status";
import { DatePicker, Empty } from "antd";
import dayjs from "dayjs";
import styles from './StatusPieChart.module.css'
import useNotificationStore from "../../stores/notificationStore";

const { RangePicker } = DatePicker;

const StatusPieChart = () => {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([dayjs().subtract(7, "day"), dayjs()]);
  const setError = useNotificationStore((state) => state.setError);

  const loadStatusDistribution = useCallback(async () => {
    getStatusDistributionByOverTimeRange(dates[0], dates[1])
      .then(({ data }) => {
        data = data.map(({ status, count }) => ({
          type: CustomerStatusProps[status].name.toUpperCase(),
          value: count,
        }));
        setData(data);
      })
      .catch(err => setError(err.message, err.description))
      .finally(() => {});
  }, [dates, setError]);

  useEffect(() => {
    loadStatusDistribution();
  }, [loadStatusDistribution]);

  const onRangeChanged = (dates, dateStrings) => {
    setDates(dates ?? []);
  };

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    color: ({ type }) => {
      let statusId = CustomerStatusLookup.find(
        (item) => item.label === type
      ).value;
      return CustomerStatusProps[statusId].style.color;
    },
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <>
      <RangePicker showTime defaultValue={dates} onChange={onRangeChanged} />
      {config.data.length > 0 ? <Pie {...config} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </>
  );
};

export default StatusPieChart;
