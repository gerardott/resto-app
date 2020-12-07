import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const UserDropdown: React.FC = (props: any) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        Account
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="9">
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" >
      <Button>
        <UserOutlined />
        <span>UserName</span>
      </Button>
    </Dropdown>
  );
};

export default UserDropdown;
