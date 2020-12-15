import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import { User } from '../models/User';
import { CurrentUserContext } from '../services/Contexts';
import { setRestaurant } from '../services/firebase';

interface Props {
}
const WelcomeForm: React.FC<Props> = (props) => {
  const currentUser = useContext<User>(CurrentUserContext);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log(values);
    setRestaurant(currentUser.uid, values.restaurantName);
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