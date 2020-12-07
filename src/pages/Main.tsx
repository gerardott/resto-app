import React from 'react';
import { Menu, Breadcrumb, Tabs, Card } from 'antd';
import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout';
import './styles.css';
import Tab1 from './Tab1';

interface Props {
}

const Main: React.FC<Props> = (props) => {

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          <Tabs type="card" destroyInactiveTabPane>
            <Tabs.TabPane tab="Tab 1" key="1">
              <Tab1 />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2">
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2020</Footer>
    </Layout>
  )
}

export default Main;