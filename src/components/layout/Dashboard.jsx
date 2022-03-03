import React, { Suspense, useState, useEffect } from "react";

import {
  Layout, Menu, Popover, Avatar, List, Space
} from "antd";
import {
  DollarOutlined,
  FileSyncOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { logout } from '../../features/users/userSlice';
import {
  Switch, Route, Link, withRouter, useLocation
} from "react-router-dom";

import Routes from "./Routes";
import Loading from "../basic/Loading";

const screenWidth = window.innerWidth;
const { Header, Content, Sider } = Layout;

function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [routeName, setRouteName] = useState('Overview');
  const [collapsed, setCollapsed] = useState(
    screenWidth > 992 ? false : true
  );
  console.log(screenWidth)

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  // const toggleSidebar = () => {
  //   setCollapsed(!collapsed);
  // };

  const onLoggingOut = () => {
    dispatch(logout())
  };

  const onMenuChange = (val) => {
    const { key } = val;
    onTitleChange(key)
  }

  useEffect(() => {
    onTitleChange(location.pathname)
  })

  const onTitleChange = (key) => {
    if (key === '/') setRouteName('Overview')
    else if (key === '/transaction-history') setRouteName('Transaction History')
  }


  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={240}
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className="sider_style"
        >
          <div className="logo">
            <Space>
              <DollarOutlined style={{ fontSize: '26px', display: collapsed ? 'flex' : undefined }} />
              {collapsed ? '' : <span>Finance Manager</span>}
            </Space>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            onClick={onMenuChange}
            selectedKeys={[location.pathname]}
            style={{
              fontSize: 16,
              marginTop: 35,
              backgroundColor: 'transparent',
            }}

          >
            <Menu.Item key="/">
              <PieChartOutlined />
              <span>Overview</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="/transaction-history">
              <FileSyncOutlined />
              <span>Transaction History</span>
              <Link to="/transaction-history" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            transition: "all 0.2s",
            backgroundColor: '#E5E5E5',
            marginLeft: collapsed ? 80 : 240,
          }}
        >
          <Header
            className="site-layout-background"
            style={{ padding: 0, display: "inherit" }}
          >
            <div className="header_container">
              <div className="hambargar_menu">
                <span>{routeName}</span>
                {/* <button onClick={toggleSidebar}>
                  {collapsed ?
                    <DoubleRightOutlined style={{ fontSize: 14 }} />
                    : <DoubleLeftOutlined style={{ fontSize: 14 }} />
                  }
                </button> */}
              </div>
              <Popover
                content={
                  <List>
                    <List.Item>
                      <a href="# " onClick={onLoggingOut}>
                        Logout
                      </a>
                    </List.Item>
                  </List>
                }
                trigger="hover"
                arrowPointAtCenter
                placement="bottomLeft"
              >
                <Avatar
                  src={`https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png`}
                />
              </Popover>
            </div>
          </Header>
          <Content>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 500, backgroundColor: 'transparent' }}
            >
              <Suspense fallback={<Loading />}>
                <Switch>
                  {Routes.map((route) => (
                    <Route
                      exact={route.exact}
                      key={route.key}
                      path={`${route.path}`}
                    >
                      <route.component />
                    </Route>
                  ))}
                </Switch>
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}


export default withRouter((props) => <Dashboard {...props} />);
