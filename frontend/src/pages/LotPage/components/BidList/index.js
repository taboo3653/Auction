import React from 'react'

import ListGroup from 'react-bootstrap/ListGroup'

import './index.scss'

const BidList = ({ bids }) => {



    return (
        <ListGroup as="ul" className="bid-list">
            {
                (bids) ?
                bids.map((item,key)=>(
                    <ListGroup.Item key ={key} as="li" className="bid-list__item">
                        <span>{item.user.name}</span>
                        <span>{`${item.value} BYN`}</span>
                    </ListGroup.Item>
                )) : ''
            }
            
        </ListGroup>
    )
}

export default BidList; 