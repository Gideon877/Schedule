import React, { Fragment, useState, useContext } from 'react';
import { List, Avatar, Button, Row, Col, Progress } from 'antd';
import { Table, Radio, Divider, Timeline } from 'antd';
import { ClockCircleTwoTone, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { useToasts } from 'react-toast-notifications'
import { AuthContext } from '../../context/auth-context';
import { sortWeekDays } from '../../helpers/lib'

const { Column, ColumnGroup } = Table;
const columns = [
    {
        title: 'Day',
        dataIndex: 'name',
    }
];

const ButtonGroup = Button.Group;
const _ = require('lodash');

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
    const { loading, error, data, refetch } = useQuery(WEEK_SCHEDULE, {
        variables: {
            userId
        }
    })

    if (loading) return <h6>Loading.......</h6>

    const { days, user } = data.getUserSchedule;
    const dayIds = sortWeekDays(days).map(day => day._id)

    const onAddDay = (event) => {
        updateSchedule({
            variables: {
                userId, ids: [...dayIds, event]
            }
        }).then(({ data }) => (data.createSchedule)
            ? addToast('Added day from schedule', { appearance: 'success', autoDismiss: true })
            : addToast('Failed to add schedule', { autoDismiss: true, appearance: 'error' })
        ).then(() => refetch()
        ).catch((err) => {
            addToast(err.message, { autoDismiss: true, appearance: 'error' })
        });
    }

    const onRemoveDay = (event) => {
        updateSchedule({
            variables: {
                userId: user, ids: dayIds.filter(id => id != event)
            }
        })
            .then(({ data }) => (data.createSchedule)
                ? addToast('Removed day from schedule', { appearance: 'success', autoDismiss: true })
                : addToast('Failed to remove schedule', { autoDismiss: true, appearance: 'error' })
            ).then(() => refetch()
            ).catch((err) => {
                addToast(err.message, { autoDismiss: true, appearance: 'error' })
            });
    }


    const weekdays = data.schedule;

    return <Row>
        <Col span={8}>
            <List
                itemLayout="horizontal"
                dataSource={weekdays}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            icon={<ClockCircleTwoTone />}
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={<div>
                                <Progress type="circle" percent={((_.size(item.users) / 5) * 100)} width={60} /> {' '}

                                <ButtonGroup>
                                    <Button disabled={!dayIds.includes(item._id)} icon={<MinusOutlined onClick={() => onRemoveDay(item._id)} />} />
                                    <Button disabled={dayIds.includes(item._id)} icon={<PlusOutlined onClick={() => onAddDay(item._id)} />} />
                                </ButtonGroup>
                            </div>}
                        />
                    </List.Item>
                )}
            />
        </Col>
        <Col span={4}>
            <List
                itemLayout='vertical'
                dataSource={days}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            icon={<ClockCircleTwoTone />}
                            title={<a href='#'>{item.name}</a>}
                        />
                    </List.Item>
                )}
            />
        </Col>
    </Row>
}
export default Schedule;