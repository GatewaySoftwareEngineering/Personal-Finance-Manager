import React, { Suspense, useState } from "react";

import {
  Layout, Menu, Button, Col, Popover, Avatar, List
} from "antd";
import {
  MenuOutlined,
  BankOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { logout } from '../../features/users/userSlice';
import { 
  Switch, Route, Link, withRouter, useLocation 
} from "react-router-dom";

import Routes from "./Routes";
import Loading from "../basic/Loading"; 

const { Header, Content, Sider } = Layout;

function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const onLoggingOut = () => {
    dispatch(logout())
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <style>
          {`
          .ant-menu-item-selected{
            background-color: #1f2533 !important;
          }
        `}
        </style>
        <Sider
          theme="dark"
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{
            height: "100vh",
            left: 0,
            position: "fixed",
            overflow: "auto",
            background: "#2d3546",
          }}
          width={240}
        >
          <div
            className="logo"
            style={{
              minHeight: 70,
              textAlign: "center",
              paddingTop: 20,
              background: "#1f2532",
            }}
          > 
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ background: "#2d3646", marginTop: 35 }}
          >
            <Menu.Item key="/">
              <BankOutlined />
              <span>Overview</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="/transaction-history">
              <AppstoreAddOutlined />
              <span>Transaction History</span>
              <Link to="/transaction-history" />
            </Menu.Item> 
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            transition: "all 0.2s",
            marginLeft: collapsed ? 80 : 240,
          }}
        >
          <Header
            className="site-layout-background"
            style={{ padding: 0, display: "inherit" }}
          >
            <Col span={1} style={{ textAlign: "center" }}>
              <Button
                type="link"
                icon={
                  <MenuOutlined style={{ fontSize: 15, color: "#1f2532" }} />
                }
                onClick={toggleSidebar}
              />
            </Col>
            <Col offset={21} span={2}>
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
            </Col>
          </Header>
          <Content style={{ margin: "16px 16px", marginBottom: 0 }}>
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
