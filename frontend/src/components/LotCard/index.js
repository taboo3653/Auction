import React from 'react'
import Card from 'react-bootstrap/Card'
import { RemainTimer } from '../'
import getSizedImageUrl from '../../utils/getSizedImageUrl'
import {emptyImgUrl} from '../../utils/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


import './index.scss'

const LotCard = ({_id,name, finishTime, currentPrice, images}) => {

    const imageSrc = (images && images.length > 0)? images[0]:emptyImgUrl;
    const src = getSizedImageUrl(imageSrc, 250);

    return (
        <div className = "col-7 col-sm-6 col-md-4 col-lg-3">
            <Card className = "lot-card ">
                <div className="lot-card__image">
                    <Link  to = {"/lots/"+_id} key = {_id}>
                        <Card.Img variant="top"  src={src} />
                    </Link>
                </div>
                <Card.Body className = "lot-card__body">
                    <Link  to = {"/lots/"+_id}>
                        <Card.Title><span>{name}</span></Card.Title>
                    </Link>

                    <Link  to = {"/lot-edit/"+_id}>
                        <button type="button" className="edit-button" >
                            <FontAwesomeIcon size="1x" icon={faEdit} color="gray" />
                        </button>
                    </Link>
                    <div className = "lot-card__bottom-container">
                        <Card.Text>{currentPrice + " BYN"}</Card.Text>
                        <Card.Text><RemainTimer finishTime={finishTime} /></Card.Text>
                    </div>
                </Card.Body>
            
            </Card>
        </div>
    )
}


export default LotCard;