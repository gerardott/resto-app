import React, { useContext } from 'react';
import { Tabs, Row } from 'antd';
import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout';
import './styles.css';
import Tab1 from './Tab1';
import LayoutEditorTab from './LayoutEditorTab';
import UserDropdown from '../components/UserDropdown';
import ReservationsTab from './ReservationsTab';
import WelcomeForm from './WelcomeForm';
import { User } from '../models/User';
import { CurrentUserContext, RestaurantContext } from '../services/Contexts';
import { Restaurant } from '../models/Restaurant';

interface Props {
}

const Main: React.FC<Props> = () => {
  const currentUser = useContext<User>(CurrentUserContext);
  const restaurant = useContext<Restaurant>(RestaurantContext);
  console.log('Main', currentUser);

  return (
    <Layout className="layout">
      <Header>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <div className="logo" />
          <UserDropdown displayName={currentUser?.displayName} />
        </Row>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          {restaurant?.name ? (
            <Tabs type="card" destroyInactiveTabPane>
              <Tabs.TabPane tab="Layout Editor" key="0">
                <LayoutEditorTab />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Reservation Managment" key="1">
                <ReservationsTab />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Tab 2" key="2">
                <Tab1 />
              </Tabs.TabPane>
            </Tabs>
          ) : (
            <WelcomeForm />
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2020</Footer>
    </Layout>
  )
}

export default Main;