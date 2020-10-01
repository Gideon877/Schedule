import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import { Spin, Alert } from 'antd';
import ConnectionList from './ConnectionList';


const FIND_USERS = gql`
    query findUsers($userId: ID!) {
        findUsers(userId: $userId) {
            _id
            firstName
            lastName
            username
            active
            lastSeen
        }
    }
`

const FindConnections = ({ userId }) => {
    const { loading, data, refetch } = useQuery(FIND_USERS, {
        variables: { userId }
    });

    if (loading) {
        return <Spin tip="Loading...">
            <Alert
                message="Find friends"
                description="Loading connections"
                type="info"
            />
        </Spin>
    }

    return <Fragment>
        <h4>Add Connections</h4>
        <hr />
        <ConnectionList data={data.findUsers} />
    </Fragment>

}

export default FindConnections;