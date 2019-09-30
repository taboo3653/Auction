import React from 'react'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'


import "./index.scss"

const LotAuctionBar = () => {
    return (
        <div className="lot-auction-bar">
            <div className="lot-auction-bar__item auction-secondary-info">
                <div className="auction-secondary-info__item">
                    <span>Стартовая цена:</span>
                    <span>5 BYN</span>
                </div>
                <div className="auction-secondary-info__item">
                    <span>Минимальный шаг цены:</span>
                    <span>5 BYN</span>
                </div>
            </div>
            <div className="lot-auction-bar__item auction-main-info">
                <div className="auction-main-info__item">
                    <span>Текущая цена:</span>
                    <span>25 BYN</span>
                </div>
                <div className="auction-main-info__item">
                    <span>До завершения:</span>
                    <span>05:02:01</span>
                </div>
            </div>
            <div>

            </div>
            <div className="lot-auction-bar__item">
                <div className="bet-maker">
                    <div className="bet_maker__price-control price-control">
                        <Button variant="light" className="price-control__switcher price-control__switcher_left">-</Button>
                        <span className="price-control__value">
                            30 BYN
                        </span>
                        <Button variant="light" className="price-control__switcher price-control__switcher_right">+</Button>
                    </div>
                    <Button variant="success" className="bet-maker__apply-button">Сделать ставку</Button>
                </div>
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


export default LotAuctionBar;