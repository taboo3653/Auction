import React from 'react'
import { withRouter } from 'react-router-dom'

import { Lot } from './containers'

import './index.scss';

const LotPage = ({location, history}) => {
    return (
        <div className = "lot page">
           <Lot location = {location} history = {history}/>
        </div>
    )
}

export default withRouter(LotPage);