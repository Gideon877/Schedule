import React, { useContext } from 'react';
import { List, Button, Row, Col, Progress } from 'antd';
import { ClockCircleTwoTone, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { useToasts } from 'react-toast-notifications'
import { AuthContext } from '../../context/auth-context';
import { sortWeekDays } from '../../helpers/lib'

const ButtonGroup = Button.Group;

const ADD_SCHEDULE = gql`
    mutation createSchedule($userId: ID!, $ids: [ID!]!) {
        createSchedule(userId: $userId, ids: $ids)
    }
`

const WEEK_SCHEDULE = gql`
    query schedule($userId: ID!) {
        schedule {
            name
            _id
            percentage
            count
            users {
                _id
                username
                firstName
                lastName
            }
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

const Schedule = () => {
    const { addToast } = useToasts();
    const userId = useContext(AuthContext).userId
    const [updateSchedule] = useMutation(ADD_SCHEDULE);
    const { loading, data, refetch } = useQuery(WEEK_SCHEDULE, {
        variables: {
            userId
        }
    })

    if (loading) return <h6>Loading.......</h6>

    const { days, user } = data.getUserSchedule || [];
    const dayIds = sortWeekDays(days).map(day => day._id)

    const onSuccess = message => {
        refetch();
        addToast(message, { appearance: 'success', autoDismiss: true });
    }

    const onAddDay = async (event) => {
        await updateSchedule({
            variables: {
                userId, ids: [...dayIds, event]
            }
        }).then(({ data }) => (data.createSchedule)
            ? onSuccess('Added day from schedule')
            : addToast('Failed to add schedule', { autoDismiss: true, appearance: 'error' })
        ).catch((err) => {
            addToast(err.message, { autoDismiss: true, appearance: 'error' })
        });
    }

    const onRemoveDay = (event) => {
        updateSchedule({
            variables: {
                userId: user, ids: dayIds.filter(id => id !== event)
            }
        })
            .then(({ data }) => (data.createSchedule)
                ? onSuccess('Removed day from schedule')
                : addToast('Failed to remove schedule', { autoDismiss: true, appearance: 'error' })
            ).catch((err) => {
                addToast(err.message, { autoDismiss: true, appearance: 'error' })
            });
    }


    return <Row>
        <Col span={4}>
            {(data && data.schedule)   && <List
                itemLayout="horizontal"
                dataSource={data.schedule}
                renderItem={item => (
                    <List.Item id={item._id}>
                        <List.Item.Meta
                            key={item._id}
                            icon={<ClockCircleTwoTone />}
                            title={item.name}
                            description={<div id={item._id}>
                                <Progress type="circle" percent={item.percentage} width={60} key={item._id} /> {'  '}
                                <ButtonGroup>
                                    <Button id={item._id} disabled={!dayIds.includes(item._id)} icon={<MinusOutlined onClick={() => onRemoveDay(item._id)} />} />
                                    <Button id={item._id} disabled={dayIds.includes(item._id)} icon={<PlusOutlined onClick={() => onAddDay(item._id)} />} />
                                </ButtonGroup>
                            </div>}
                        />
                    </List.Item>
                )}
            /> }
        </Col>

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
export default Schedule;