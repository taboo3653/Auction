import React from 'react'
import Card from 'react-bootstrap/Card'

import './index.scss'

const LotCard = ({name, current_price}) => {
    return (
        <Card className = "lot-card">
            <Card.Img variant="top" className = "lot-card__image" src={require('../../assets/img/vase.jpg')} />
            <Card.Body className = "lot-card__body">
                <Card.Title>{name}</Card.Title>
                <div className = "lot-card__bottom-container">
                    <Card.Text>{current_price + " BYN"}</Card.Text>
                    <Card.Text>05:05:12</Card.Text>
                </div>
            </Card.Body>
        </Card>
    )
}


export default LotCard;