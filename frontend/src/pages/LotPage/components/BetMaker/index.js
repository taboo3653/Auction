import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import './index.scss'

const BetMaker = ({ currentPrice : minPrice, minStep, onSubmit, disabled }) => {
    
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
                    className="price-control__switcher price-control__switcher_left shadow-none"
                    disabled = { (price - minStep) < minPrice }
                    onClick={handleMinusClick}
                >-</Button>
                <span className="price-control__value">
                    {price + " BYN"}
                </span>
                <Button variant="light"
                    className="price-control__switcher price-control__switcher_right shadow-none"
                    onClick={handlePlusClick}
                >+</Button>
            </div>
            <Button
                disabled = {disabled}
                variant="success"
                className="bet-maker__apply-button shadow-none"
                onClick = {() => onSubmit(price)}
            >Сделать ставку</Button>
        </div>
    )
}

export default BetMaker; 