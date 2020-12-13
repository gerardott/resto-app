import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Row } from 'antd';
import { auth, createUserProfileDocument } from '../services/firebase';
import { SignUp } from '../models/SignUp';
import { useHistory } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { setCurrentUser } from 'redux/user/user.actions';

const FormItem = Form.Item;

const LoginPage: React.FC = (props: any) => {
  const history = useHistory();
  const [form] = Form.useForm<SignUp>();

  const handleSubmit = async (values: SignUp) => {
    console.log(values);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(values.email, values.password);
      await createUserProfileDocument(user, { displayName: values.managerName });
    } catch (error) {
      console.error(error);
    }
    form.resetFields();
    history.push('/');
  }

  return (
    <Card style={{width: 400, margin: '200px auto'}}>
      <Form form={form} onFinish={handleSubmit} className="login-form">
        <h2>Sign Up</h2>
        <FormItem name="managerName" rules={[{ required: true, message: 'Manager Name is required' }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="Manager Name" />
        </FormItem>
        <FormItem name="email" rules={[{ required: true, message: 'Email is required' }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="Email" />
        </FormItem>
        <FormItem name="password" rules={[{ required: true, message: 'Password is required' }]}>
          <Input size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
        </FormItem>
        <Row justify="space-between">
          {/* <Link className="login-form-forgot" to="#">
            Forgot password
          </Link> */}
        </Row>
        <Button size="large" type="primary" htmlType="submit">Log In</Button>
        {/* <div className="new-user">
          New User?<Link to="/sign/register">Register Now</Link>
        </div> */}
      </Form>
    </Card>
  );
};

export default LoginPage;