import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { auth } from '../services/firebase';

interface Props {
  displayName: string
}

const UserDropdown: React.FC<Props> = (props) => {
  const logOut = async () => {
    await auth.signOut();
  }
  
  const menu = (
    <Menu>
      <Menu.Item key="0" disabled>
        Account
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="9" onClick={logOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" >
      <Button>
        <UserOutlined />
        <span>{props.displayName}</span>
      </Button>
    </Dropdown>
  );
};

export default UserDropdown;
