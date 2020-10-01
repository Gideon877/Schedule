import React from 'react'
import PropTypes from 'prop-types'
import { ConnectionTypePage } from '../../helpers/constants'
import MyConnections from './MyConnections'
import FindConnections from './FindConnections'

const Connections = ({ type, userId }) => {
    switch (type) {
        case ConnectionTypePage.Following:
            return <MyConnections />
            
        case ConnectionTypePage.NotFollowing:
            return <FindConnections userId={userId} />
    
        default:
            return <h4>Not Found</h4>
    }
}

Connections.propTypes = {
    type: PropTypes.string.isRequired
}
export default Connections;