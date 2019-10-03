import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import './index.scss'

const BetMaker = ({ currentPrice : minPrice, minStep }) => {
    
    const [price, setPrice] = useState(minPrice);

    const handlePlusClick = () => {
        setPrice(price + minStep);
    }

    const handleMinusClick = () => {
        setPrice(price - minStep);
    }


    return (
        <div className="bet-maker">
            <div className="bet_maker__price-control price-control">
                <Button
                    variant="light"
                    className="price-control__switcher price-control__switcher_left"
                    disabled = { (price - minStep) < minPrice }
                    onClick={handleMinusClick}
                >-</Button>
                <span className="price-control__value">
                    {price + " BYN"}
                </span>
                <Button variant="light"
                    className="price-control__switcher price-control__switcher_right"
                    onClick={handlePlusClick}
                >+</Button>
            </div>
            <Button
                variant="success"
                className="bet-maker__apply-button"
            >Сделать ставку</Button>
        </div>
    )
}

export default BetMaker; 