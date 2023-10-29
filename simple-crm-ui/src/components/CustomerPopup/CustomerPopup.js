import { Modal, Form, Input, DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import { CustomerStatusLookup } from "../../constants/customer-status";
import { PHONE_NUMBER_REGEX } from "../../constants/regex-constants";

const { TextArea } = Input;

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    {
      form.setFieldsValue(props.values);
    }
  }, [props.values]);

  return (
    <Modal
      forceRender
      title={props.title}
      width={800}
      confirmLoading={loading}
      open={props.open}
      onCancel={() => {
        props.onCancel();
        form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {
            setLoading(true);
            await props.onSubmit(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          })
          .finally(() => {
            setLoading(false);
          });
      }}
    >
      <Form
        {...layout}
        form={form}
        disabled={loading}
        name={`${props.title.split(" ").join("_").toLowerCase()}`}
        size="middle"
      >
        <Form.Item
          name="customerName"
          label="Customer"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
            {
              max: 250,
              message: "Customer name shouldn't be longer than 250 symbols!",
            }
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
              message: "Please input the phone number!",
            },
            {
              pattern: PHONE_NUMBER_REGEX,
              message: "Phone number format is invalid!",
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
              message: "Please input the address!",
            },
            {
              max: 250,
              message: "Address shouldn't be longer than 250 symbols!",
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status" initialValue={0}>
          <Select options={CustomerStatusLookup} />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please input the date!",
            },
          ]}
        >
          <DatePicker
            format={"DD-MM-YYYY HH:mm"}
            inputReadOnly={true}
            showNow={false}
            showTime={{ format: "HH:mm", minuteStep: 30, hourStep: 1 }}
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea
            showCount
            maxLength={500}
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CustomerPopup;
