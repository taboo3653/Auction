import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import { BetMaker } from '../../components'
import { connect } from 'react-redux'

import "./index.scss"

const LotAuctionBar = ({ startPrice, currentPrice, minStep, finishTime }) => {

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
                    <span>05:02:01</span>
                </div>
            </div>
            <div>

            </div>
            <div className="lot-auction-bar__item">
                <BetMaker currentPrice = {currentPrice} minStep = {minStep} />
            </div>
            <div className="lot-auction-bar__item">
                <ListGroup as="ul" className = "bet-list">
                    <ListGroup.Item as="li" className = "bet-list__item">
                        <span>taboo1</span>
                        <span>25 BYN</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className = "bet-list__item">
                        <span>taboo1</span>
                        <span>25 BYN</span>
                    </ListGroup.Item> <ListGroup.Item as="li" className = "bet-list__item">
                        <span>taboo1</span>
                        <span>25 BYN</span>
                    </ListGroup.Item> <ListGroup.Item as="li" className = "bet-list__item">
                        <span>taboo1</span>
                        <span>25 BYN</span>
                    </ListGroup.Item>
                </ListGroup>
            </div>

        </div>


    );
}

export default connect(
    ({ lot }) => ({
        startPrice: lot.item.data.start_price,
        currentPrice: lot.item.data.current_price,
        minStep: lot.item.data.min_step,
        finishTime: new Date(lot.item.data.finish_time)
    })
)(LotAuctionBar); 