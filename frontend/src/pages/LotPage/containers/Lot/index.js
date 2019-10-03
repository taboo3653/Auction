import React, { useEffect } from 'react'
import { LotInformation, LotAuctionBar } from '../../containers'
import { connect } from 'react-redux'
import { fetchLotById, removeLot } from "../../../../redux/actions";
import Spinner from 'react-bootstrap/Spinner'

import "./index.scss"

const Lot = ({ history, location, fetchLotById, removeLot, lot }) => {

    useEffect(() => {
        fetchLotById(location.pathname.split('/').pop())
        .catch(err =>
            history.push("/404")        
            ); 
        return () => {  removeLot(); };
    }, [location, fetchLotById, removeLot, history]);


    return (
        <>
            {(!lot) ?
                <Spinner animation="border" /> :
                <div className="lot">
                    <div className="lot__information">
                        <LotInformation />
                    </div>
                    <div className="lot__auction-bar">
                        <LotAuctionBar />
                    </div>
                </div> 
            }
        </>
    )
}

export default connect(
    ({ lot }) => ({ 
        
        lot: lot.item,
    
    }), { fetchLotById, removeLot }
)(Lot); 