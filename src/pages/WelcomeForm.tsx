import { Button, Form, Input } from 'antd';
import React from 'react';
import { User } from '../models/User';
import { updateUserProfile } from '../services/firebase';

interface Props {
  currentUser: User
}
const WelcomeForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log(values);
    updateUserProfile(props.currentUser.uid, values.restaurantName);
  }

  return (
    <div style={{ width: 400, margin: "0 auto" }}>
      <h1>Welcomer to Resto app</h1>
      <p>To continue, please enter restaurant name:</p>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="restaurantName">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">Save</Button>
      </Form>
    </div>
  )
}

export default WelcomeForm;