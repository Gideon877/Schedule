import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    InboxOutlined,
    HomeOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Schedule from './Schedule';
import UpdateUser from './UpdateUser';

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
}

`

const UserMainLayout = ({userId}) => {
    const [state, setState] = useState({ collapsed: false })
    
    const onCollapse = collapsed => {
        console.log(collapsed);
        setState({ collapsed });
    };

    const [activeKey, setActiveKey] = useState('5')

    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            userId
        }
    })

    if (loading) return <p>loading</p>

    const user = data.getUser;
    const schedule = data.getUserSchedule;

    console.log({ user, schedule, activeKey });


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme='light' onClick={({ item, key, keyPath, domEvent }) => {
                    setActiveKey(key)
                    console.log({ item, key, keyPath, domEvent }, activeKey)
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
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Connections">
                        <Menu.Item key="6">Following</Menu.Item>
                        <Menu.Item key="7">Find Connection</Menu.Item>
                    </SubMenu>
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
                                    return <h4>Home Page</h4>
                                case '2':
                                    return <h4>Inbox</h4>
                                case '3':
                                    return <h4>Account</h4>
                                case '4':
                                    return <Schedule schedule={schedule} />
                                case '5':
                                    return <UpdateUser userId={userId} />
                                case '6':
                                    return <h4>Following</h4>
                                case '7':
                                    return <h4>Find Connection</h4>
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