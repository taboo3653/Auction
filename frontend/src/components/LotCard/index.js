import React from 'react'
import Card from 'react-bootstrap/Card'
import { RemainTimer } from '../'
import getSizedImageUrl from '../../utils/getSizedImageUrl'
import {emptyImgUrl} from '../../utils/variables'

import './index.scss'

const LotCard = ({name, finishTime, currentPrice, images}) => {

    const imageSrc = (images && images.length > 0)? images[0]:emptyImgUrl;
    const src = getSizedImageUrl(imageSrc, 250);

    return (
        <Card className = "lot-card">
            <div className="lot-card__image">
                <Card.Img variant="top"  src={src} />
            </div>
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