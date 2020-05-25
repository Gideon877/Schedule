import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ConnectionTypePage } from '../../helpers/constants'

const Connections = ({ type }) => {
    switch (type) {
        case ConnectionTypePage.Following:
            return <h4>My Connections</h4>
            
        case ConnectionTypePage.NotFollowing:
            return <h4>Add Connections</h4>
    
        default:
            return <h4>Not Found</h4>
    }
}

Connections.propTypes = {
    type: PropTypes.string.isRequired
}
export default Connections;