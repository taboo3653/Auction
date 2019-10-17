import React from 'react'
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux'

import './index.scss'

const LotInformation = ({ name, description,creatorName }) => {

    return (
        <div className = "lot-information">
                <h1>{name}</h1>
                <div className = "lot-information__image-container">
                    <Image src={require('../../../../assets/img/vase.jpg')} />
                </div>
                <div className = "lot-information__creator">
                    <strong>Продавец:</strong>
                    <p>{creatorName}</p>
                </div>
                <div className = "lot-information__description">
                    <strong>Описание:</strong>
                    <p>{description}</p>
                </div>
            </div>
    )
}

export default connect(
    ({ lot }) => (
        {
            name: lot.item && lot.item.name,
            description: lot.item && lot.item.description,
            creatorName: lot.item && lot.item.creator.name
        }
    )
)(LotInformation); 