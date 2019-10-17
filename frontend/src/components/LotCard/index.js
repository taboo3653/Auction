import React from 'react'
import Card from 'react-bootstrap/Card'
import { RemainTimer } from '../'


import './index.scss'

const LotCard = ({name, finishTime, currentPrice}) => {

    return (
        <Card className = "lot-card">
            <Card.Img variant="top" className = "lot-card__image" src={require('../../assets/img/vase.jpg')} />
            <Card.Body className = "lot-card__body">
                <Card.Title>{name}</Card.Title>
                <div className = "lot-card__bottom-container">
                    <Card.Text>{currentPrice + " BYN"}</Card.Text>
                    <Card.Text><RemainTimer finishTime={finishTime} /></Card.Text>
                </div>
            </Card.Body>
        </Card>
    )
}


export default LotCard;