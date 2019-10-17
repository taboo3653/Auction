import React, { useEffect } from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import { connect } from 'react-redux'
import { fetchBidsByLot,removeBids } from '../../../../redux/actions'
import { socket } from '../../../../core'

import './index.scss'

const BidList = ({ lotId, fetchBidsByLot, bids }) => {

    useEffect(() => {
        fetchBidsByLot(lotId);
        const fn = () => fetchBidsByLot(lotId)
        socket.on('SERVER:BIDS_UPDATED', fn);
    
        return () => {
            socket.off('SERVER:BIDS_UPDATED', fn);
            removeBids(lotId);
        }
    }, [fetchBidsByLot, lotId])

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

export default connect(
    ({ lot }) => ({
        lotId: lot.item && lot.item._id,
        bids: lot.bids && lot.bids.items
    }),
    { fetchBidsByLot, removeBids })(BidList); 