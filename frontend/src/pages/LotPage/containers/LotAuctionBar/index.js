import React from 'react'
import { connect } from 'react-redux'


import { BetMaker } from '../../components'
import { BidList } from '../../containers'

import { RemainTimer } from '../../../../components'
import { fetchMakeBid } from '../../../../redux/actions'
import isOverTime from '../../../../utils/isOverTime'

import "./index.scss"

const LotAuctionBar = ({ lotId, startPrice, currentPrice, minStep, finishTime, creatorId, userId, fetchMakeBid,bidsIsLoading }) => {


    const handleMakeBid = (bidValue) => {
        fetchMakeBid({
            value: bidValue,
            user: userId,
            lot: lotId
        });
    }

    return (
        <div className="lot-auction-bar">
            <div className="lot-auction-bar__item auction-secondary-info">
                <div className="auction-secondary-info__item">
                    <span>Стартовая цена:</span>
                    <span>{startPrice + " BYN"}</span>
                </div>
                <div className="auction-secondary-info__item">
                    <span>Минимальный шаг цены:</span>
                    <span>{minStep + " BYN"}</span>
                </div>
            </div>
            <div className="lot-auction-bar__item auction-main-info">
                <div className="auction-main-info__item">
                    <span>Текущая цена:</span>
                    <span>{currentPrice + " BYN"}</span>
                </div>
                <div className="auction-main-info__item">
                    <span>До завершения:</span>
                    <span><RemainTimer finishTime = {finishTime} /></span>
                </div>
            </div>
            <div>

            </div>
            
            {(
                userId && 
                creatorId && 
                userId !== creatorId && 
                !isOverTime(finishTime)
            ) ? (
                <div className="lot-auction-bar__item">
                    <BetMaker currentPrice = {currentPrice+minStep} minStep = {minStep} onSubmit = {handleMakeBid} disabled={bidsIsLoading} />
                </div>
                ):
                ''
            }

            <div className="lot-auction-bar__item">
                <BidList />
            </div>

        </div>


    );
}

export default connect(
    ({ lot,user }) => ({
        lotId: lot.item && lot.item._id,
        startPrice: lot.item && lot.item.startPrice,
        currentPrice: lot.item && lot.item.currentPrice,
        minStep: lot.item && lot.item.minStep,
        finishTime: lot.item && lot.item.finishTime,
        creatorId: lot.item && lot.item.creator._id,
        userId: user.data && user.data._id,
        bidsIsLoading: lot.bids.isLoading
    }),{ fetchMakeBid}
)(LotAuctionBar); 