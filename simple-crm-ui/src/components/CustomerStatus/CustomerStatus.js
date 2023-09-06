import { Tag } from 'antd';
import { CustomerStatusProps } from '../../constants/customer-status';

function CustomerStatus(props) {
  const statusProps = CustomerStatusProps[props.status];
  return (
    <Tag color={statusProps.color}>
      {statusProps.name.toUpperCase()}
    </Tag>
  );
}

export default CustomerStatus;