import React from 'react'
import { LotInformation } from './components'
import { LotAuctionBar } from './components'
import './index.scss';

const LotPage = () => {
    return (
        <div className = "lot-page page">
            <div className = "lot-page__information">
                <LotInformation />
            </div>
            <div className = "lot-page__auction-bar">
                <LotAuctionBar />
            </div>
        </div>
    )
}

export default LotPage;