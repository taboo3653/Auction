import React from 'react'
import { connect } from 'react-redux'

import { BidMaker, LotSecondaryInfo,BidList, LotMainInfo } from '../../components'

import { fetchMakeBid } from '../../../../redux/actions'
import isOverTime from '../../../../utils/isOverTime'

import "./index.scss"

const LotAuctionBar = ({ lotId, startPrice, currentPrice, minStep, finishTime, creatorId, userId, fetchMakeBid,bidsIsLoading, bids }) => {


    const handleMakeBid = (bidValue, showTooltip) => {
        fetchMakeBid({
            value: bidValue,
            user: userId,
            lot: lotId
        }).catch((err)=> {
            if(err.response.data.message === "Too little bid")
                showTooltip(true);
        });
    }

    return (
        <div className="lot-auction-bar info-block">
            <div className="lot-auction-bar__item">
                <LotSecondaryInfo startPrice = {startPrice} minStep = {minStep} />
            </div>
            <div className="lot-auction-bar__item">
                <LotMainInfo currentPrice = {currentPrice} finishTime = {finishTime}/>
            </div>
            
            {(
                userId && 
                creatorId && 
                userId !== creatorId && 
                !isOverTime(finishTime)
            ) ? (
                <div className="lot-auction-bar__item">
                    <BidMaker currentPrice = {currentPrice+minStep} minStep = {minStep} onSubmit = {handleMakeBid} disabled={bidsIsLoading} />
                </div>
                ):
                ''
            }
            
            {(isOverTime(finishTime)) ?
                <div className="lot-auction-bar__item">
                    <div className = "lot-auction-bar-winner">
                    {(bids && bids.length !== 0)? `Победитель: ${bids[0].user.name}` : "Победителя нет" }
                    </div>
                </div> : ''
            }

            {(bids && bids.length !== 0) ?
            <div className="lot-auction-bar__item">
                <BidList bids={bids}/>
            </div> : ''}

        </div>


    );
}

export default connect(
    ({ lot,user }) => ({
        lotId: lot.item && lot.item._id,
        startPrice: lot.item && lot.item.startPrice,
        minStep: lot.item && lot.item.minStep,
        finishTime: lot.item && lot.item.finishTime,
        creatorId: lot.item && lot.item.creator._id,
        userId: user.data && user.data._id,
        bidsIsLoading: lot.bids.isLoading,
        currentPrice: lot.bids.items && lot.item && (lot.bids.items.length !==0) ? lot.bids.items[0].value : lot.item.startPrice,
        bids: lot.bids.items
    }),{ fetchMakeBid}
)(LotAuctionBar); 