import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    InboxOutlined,
    HomeOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Schedule from './Schedule';
import UpdateUser from './UpdateUser';
import Connections from '../connections/Connections';

import { ConnectionTypePage } from '../../helpers/constants'
import Chats from '../chats/Chats';
import Home from './Home';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const GET_USER = gql`

query getUserDetails($userId: ID!) {
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

    weekdays {
        _id
        name
    }
}

`

const UserMainLayout = ({userId}) => {
    const [state, setState] = useState({ collapsed: false })
    
    const onCollapse = collapsed => {
        console.log(collapsed);
        setState({ collapsed });
    };

    const [activeKey, setActiveKey] = useState('4')

    const { loading, data, refetch } = useQuery(GET_USER, {
        variables: {
            userId
        }
    })

    if (loading) return <p>loading</p>

    const user = data.getUser;
    const schedule = data.getUserSchedule;
    const weekdays = data.weekdays

    // console.log({ user, schedule, activeKey });

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme='light' onClick={({ item, key, keyPath, domEvent }) => {
                    setActiveKey(key)
                    // console.log({ item, key, keyPath, domEvent }, activeKey)
                }} defaultSelectedKeys={activeKey} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        Home (timeline)
                        </Menu.Item>
                    <Menu.Item key="2" icon={<InboxOutlined />}>
                        Inbox
                        </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Account</Menu.Item>
                        <Menu.Item key="4">Schedule</Menu.Item>
                        <Menu.Item key="5">Update</Menu.Item>
                    </SubMenu>
                    {/** <SubMenu key="sub2" icon={<TeamOutlined />} title="Connections">
                        <Menu.Item key="6">Following</Menu.Item>
                        <Menu.Item key="7">Find Connection</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>{user.firstName} {user.lastName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {(() => {
                            switch (activeKey) {
                                case '1':
                                    return <Home />
                                case '2':
                                    return <Chats />
                                case '3':
                                    return <h4>Account</h4>
                                case '4':
                                    return <Schedule />
                                case '5':
                                    return <UpdateUser userId={userId} />
                                case '6':
                                    return <Connections userId={userId} type={ConnectionTypePage.Following} /> 
                                case '7':
                                    return <Connections userId={userId} type={ConnectionTypePage.NotFollowing} /> 
                                default:
                                   return  <h5>Not found</h5>
                            }
                        })()}
                    </div>
                </Content>


                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );

}

export default UserMainLayout;