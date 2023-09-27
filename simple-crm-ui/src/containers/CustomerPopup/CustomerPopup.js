import { Modal, Form, Input, DatePicker, Select } from "antd";
import { useEffect } from "react";
import { CustomerStatusLookup } from "../../constants/customer-status";

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

  useEffect(() => {
      {form.setFieldsValue(props.values)};
    },
    [props.values]
  );

  return (
    <Modal 
      forceRender 
      title={props.title}
      width={800}
      open={props.open}
      onCancel={() => {
        props.onCancel();
        form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {
            form.resetFields();
            await props.onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        {...layout}
        form={form}
        name={`${props.title.split(' ').join('_').toLowerCase()}`}
        size="middle"
      >
        <Form.Item
          name="customerName"
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
          name="phone"
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
        <Form.Item name="status" label="Status" initialValue={0}>
          <Select
            options={CustomerStatusLookup}
          />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Date"
          rules={[
            {
              required: true,
              message: 'Please input the date!',
            },
          ]}
        >
          <DatePicker showNow={false} showTime={{format: 'HH:mm', minuteStep: 30, hourStep: 1}} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CustomerPopup;