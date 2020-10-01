import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { List, Avatar, Button } from 'antd';

const ConnectionList = ({data}) => {

    return <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
            <List.Item key={item._id}>
                <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.firstName} {item.lastName} </a>}
                    description={item.username}
                />
                <Button type="primary">Follow</Button>
            </List.Item>
        )}
    />
}

export default ConnectionList;