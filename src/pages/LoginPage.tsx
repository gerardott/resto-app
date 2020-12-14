import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import { auth, createUserProfileDocument } from '../services/firebase';
import { SignUp } from '../models/SignUp';
import { useHistory } from 'react-router-dom';

const FormItem = Form.Item;

const LoginPage: React.FC = (props: any) => {
  const history = useHistory();
  const [newUser, setNewUser] = useState<boolean>(false);
  const [form] = Form.useForm<SignUp>();

  const handleSignIn = async (values: SignUp) => {
    try {
      const {user} = await auth.signInWithEmailAndPassword(values.email, values.password);
      debugger;
      if (user) {
        setTimeout(() => {
          history.push('/');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
    form.resetFields();
  }

  const handleSignUp = async (values: SignUp) => {
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

  const onRegisterClick = () => {
    setNewUser(true);
  }

  return (
    <Card style={{width: 400, margin: '200px auto'}}>
      {newUser ? (
        <Form form={form} onFinish={handleSignUp} className="login-form">
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
          <FormItem name="confirmPassword" rules={[{ required: true, message: 'Password is required' }]}>
            <Input size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
          </FormItem>
          <Button size="large" type="primary" htmlType="submit">Sign Up</Button>
        </Form>
      ) : (
        <Form form={form} onFinish={handleSignIn} className="login-form">
          <h2>Sign In</h2>
          <FormItem name="email" rules={[{ required: true, message: 'Email is required' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="Email" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: 'Password is required' }]}>
            <Input size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
          </FormItem>
          <Button size="large" type="primary" htmlType="submit">Sign In</Button>
          <div style={{marginTop: 16}}>
            New User? <Button type="link" onClick={onRegisterClick}>Register Now</Button>
          </div>
        </Form>
      )}
    </Card>
  );
};

export default LoginPage;