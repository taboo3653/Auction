import React from 'react'
import { connect } from 'react-redux'
import { LotCarousel } from '../../components'
import './index.scss'

const LotInformation = ({ name, description,creatorName, images }) => {

    return (
        <div className = "lot-information">
                <h1>{name}</h1>
                <div className = "lot-information__image-container">
                    <LotCarousel imagesSrc={images}/>
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
            creatorName: lot.item && lot.item.creator.name,
            images: lot.item && lot.item.images
        }
    )
)(LotInformation); 