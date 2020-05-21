import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const GET_USER = gql`

query getUserSchedule($userId: ID!) {
    getUser(userId: $userId ) {
        firstName
        lastName
        username
        email
        password
        active
        createdAt
        updatedAt
        userType
    }

    getUserSchedule(userId: $userId) {
        _id
        user
        days {
            name 
            _id
        }
    }
}

`

const UserHome = () => {
    const [state, setState] = useState({ collapsed: false })

    const onCollapse = collapsed => {
        console.log(collapsed);
        setState({ collapsed });
    };

    const {} = useQuery()

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme='light' onClick={({ item, key, keyPath, domEvent }) => {
                    console.log({ item, key, keyPath, domEvent })
                }} defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Home (timeline)
                        </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Inbox
                        </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Account</Menu.Item>
                        <Menu.Item key="4">Schedule</Menu.Item>
                        <Menu.Item key="5">Update</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Connections">
                        <Menu.Item key="6">Following</Menu.Item>
                        <Menu.Item key="8">Find Connection</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
            </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );

}

export default UserHome;