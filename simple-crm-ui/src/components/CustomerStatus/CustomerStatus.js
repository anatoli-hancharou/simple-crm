import { Tag } from 'antd';
import { CustomerStatusProps } from '../../constants/customer-status';

function CustomerStatus(props) {
  const statusProps = CustomerStatusProps[props.status];
  return (
    <Tag style={statusProps.style}>
      {statusProps.name.toUpperCase()}
    </Tag>
  );
}

export default CustomerStatus;