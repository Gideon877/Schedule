import React, { useContext } from 'react';
import { List, Button, Row, Col, Progress } from 'antd';
import { ClockCircleTwoTone, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { useToasts } from 'react-toast-notifications'
import { AuthContext } from '../../context/auth-context';
import { sortWeekDays } from '../../helpers/lib'

const ButtonGroup = Button.Group;

const USER_SCHEDULE = gql`
    query schedule($userId: ID!) {
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

const Home = () => {
    const { addToast } = useToasts();
    const userId = useContext(AuthContext).userId
    const { loading, data, refetch } = useQuery(USER_SCHEDULE, {
        variables: {
            userId
        }
    })

    if (loading) return <h6>Loading.......</h6>

    const { days, user } = data.getUserSchedule || [];

    return <Row>
        <Col span={8}>
            <List
                itemLayout='vertical'
                dataSource={days}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            icon={<ClockCircleTwoTone />}
                            title={item.name}
                        />
                    </List.Item>
                )}
            />
        </Col>
    </Row>
}

export default Home;