import React, { useEffect } from 'react'
import { LotInformation, LotAuctionBar } from '../../containers'
import { connect } from 'react-redux'
import { fetchLotById, removeLot, fetchBidsByLot, removeBids } from "../../../../redux/actions";
import { Loader } from '../../../../components' 
import { socket } from '../../../../core'

import "./index.scss"

const Lot = ({ history, location, fetchLotById, removeLot, lot, bids, lotId, fetchBidsByLot, removeBids}) => {

    useEffect(() => {
        fetchLotById(location.pathname.split('/').pop())
        .catch(() =>
            history.push("/404")        
            ); 
        return () => {  removeLot(); };
    }, [location, fetchLotById, removeLot, history]);
    
    useEffect(() => {
        const fn = () => { 
            if(lotId) fetchBidsByLot(lotId).catch(() =>
                history.push("/404")        
                ); 
        }

        fn();
        socket.on('SERVER:BIDS_UPDATED', fn);
    
        return () => {
            socket.off('SERVER:BIDS_UPDATED', fn);
            removeBids();
        }
    }, [fetchBidsByLot, removeBids, lotId, history])

    return (
        <>
            {(!lot || !bids) ?
                <Loader /> :
                <div className="lot container">
                    <div className ="row">
                        <div className = "col-lg-7 mt-3 mb-3">
                            <div className="lot__information">
                                <LotInformation />
                            </div>
                        </div>
                        <div className = "col-lg-5 mt-3 mb-3"> 
                            <div className="lot__auction-bar">
                                <LotAuctionBar />
                            </div>
                        </div>
                    </div>
                </div> 
            }
        </>
    )
}

export default connect(
    ({ lot }) => ({ 
        
        lot: lot.item,
        lotId: lot.item && lot.item._id,
        bids: lot.bids.items
    
    }), { fetchLotById, removeLot, fetchBidsByLot, removeBids }
)(Lot); 