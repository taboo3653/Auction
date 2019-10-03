import React from 'react'
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux'

import './index.scss'

const LotInformation = ({ name, description }) => {

    return (
        <div className = "lot-information">
                <h1>{name}</h1>
                <div className = "lot-information__image-container">
                    <Image src={require('../../../../assets/img/vase.jpg')} />
                </div>
                <div className = "lot-information__description">
                    <h3>Описание:</h3>
                    <p>{description}</p>
                </div>
            </div>
    )
}

export default connect(
    ({ lot }) => (
        {
            name: lot.item.data.name,
            description: lot.item.data.description
        }
    )
)(LotInformation); 