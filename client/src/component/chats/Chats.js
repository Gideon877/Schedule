import React, { useContext, Fragment } from 'react';
import { useQuery } from 'react-apollo';
import { AuthContext } from '../../context/auth-context';
import gql from 'graphql-tag';
import { List, Button, Row, Col, Progress, Avatar, Divider } from 'antd';
import { MessageFilled } from '@ant-design/icons';

const USER_CHATS = gql`
    query getUserChats($userId: ID!) {
       getUserChats(userId: $userId) {
            _id
            messages {
                _id
            }
       }

       users {
           _id
           firstName
           lastName
           email
       }
    }
`

const Chats = () => {
    const userId = useContext(AuthContext).userId
    const { loading, refetch, data } = useQuery(USER_CHATS, {
        variables: { userId }
    })

    if (loading) return <h5>Loading chats.....</h5>

    // console.log(data, userId)
    const { users } = data || [];

    return <Row>
        <Col span={8}>
            {/** <h4 align='center'>List of active chats</h4> */}
            <List
                dataSource={users}
                renderItem={item => (
                    ( userId !== item._id) && <List.Item key={item._id}>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={<a href="https://ant.design">{item.firstName} {item.lastName}</a>}
                            description={item.email}
                        />
                        <div>
                            <Button type='primary' size='middle'> chat</Button>
                        </div>
                    </List.Item>
                )}
            />
            <Divider type='vertical' dashed/>
        </Col>
        <Col span={8}>
            {/** <h4 align='center'>Openned chats/List of messages</h4> */}
        </Col>
    </Row>
}

export default Chats;