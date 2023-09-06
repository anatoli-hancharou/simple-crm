import { Modal, Form, Input, DatePicker, Select } from "antd";
import { useEffect } from "react";
import { CustomerStatusProps } from "../../constants/customer-status";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function CustomerPopup(props) {
  const [form] = Form.useForm();

  useEffect(() =>
   {form.setFieldsValue(props.values)}, 
   [props.values]
  );

  return (
    <Modal 
      forceRender 
      title={props.title}
      open={props.open}
      onCancel={props.onCancel}
      width={800}
    >
      <Form
        {...layout}
        form={form}
        name="form_in_modal"
        size="middle"
      >
        <Form.Item
          name="name"
          label="Customer"
          rules={[
            {
              required: true,
              message: 'Please input the name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone"
          rules={[
            {
              required: true,
              message: 'Please input the phone number!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input the address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select
            options={Object.keys(CustomerStatusProps).map(
              (key) => ({ label: CustomerStatusProps[key].name.toUpperCase(), value: key })
            )}
          />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CustomerPopup;