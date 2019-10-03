import React from 'react'
import { withRouter } from 'react-router-dom'

import { Lot } from './containers'

import './index.scss';

const LotPage = ({location, history}) => {
    return (
        <section className = "lot page">
           <Lot location = {location} history = {history}/>
        </section>
    )
}

export default withRouter(LotPage);