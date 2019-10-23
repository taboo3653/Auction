import React from 'react'
import { LotEdit } from './containers'
import { withRouter } from 'react-router-dom'

import './index.scss';

const LotEditPage = ({location,history}) => {
    return (
        <div className = "page">
                <LotEdit location= {location} history = {history} />
        </div>
    )
}

export default withRouter(LotEditPage);