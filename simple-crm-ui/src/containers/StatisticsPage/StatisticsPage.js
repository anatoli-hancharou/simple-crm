import React from "react";
import StatusPieChart from "../StatusPieChart/StatusPieChart";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Row, Card, Tooltip, Space } from "antd";
import { grey } from "@ant-design/colors";
import { STATUS_DISTRIBUTION_INFO } from "../../constants/text-constants";

const StatisticsPage = () => {
  return (
    <>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={12}>
          <Card
            title={
              <Space>
                Status distribution over time
                <Tooltip title={STATUS_DISTRIBUTION_INFO}>
                  <InfoCircleOutlined
                    style={{ paddingTop: 7, color: grey[0] }}
                  />
                </Tooltip>
              </Space>
            }
            size="small"
          >
            <StatusPieChart />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StatisticsPage;
