import React from 'react'
import { LotInformation } from './components'
import { LotAuctionBar } from './components'
import './index.scss';

const LotPage = () => {
    return (
        <section className = "lot-page page">
            <div className = "lot-page__information">
                <LotInformation />
            </div>
            <div className = "lot-page__auction-bar">
                <LotAuctionBar />
            </div>
        </section>
    )
}

export default LotPage;