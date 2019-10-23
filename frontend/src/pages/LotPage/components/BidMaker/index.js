import React, { useState, useEffect, useRef } from 'react'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import './index.scss'

const BidMaker = ({ currentPrice : minPrice, minStep, onSubmit, disabled }) => {
    
    const [price, setPrice] = useState(minPrice);

    const [showTooltip, setShowTooltip] = useState(false);
    const submitRef = useRef(null);


    useEffect(()=>{
        if(showTooltip)
           setTimeout(()=>{setShowTooltip(false)}, 2000) 
    },[showTooltip]);

    const handlePlusClick = () => {
        setPrice(price + minStep);
    }

    const handleMinusClick = () => {
        setPrice(price - minStep);
    }


    return (
        <div className="bid-maker">
            <div className="bid_maker__price-control price-control">
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
                ref = {submitRef}
                variant="success"
                className="bid-maker__apply-button shadow-none"
                onClick = {() => onSubmit(price,setShowTooltip)}
            >Сделать ставку</Button>
            <Overlay target={submitRef.current} show={showTooltip} placement="left">
                {props => (
                    <Tooltip id="bid-maker-tooltip" {...props} show = {props.show.toString()}>
                        Ставка слишком низкая
                    </Tooltip>
                )}
            </Overlay>
        </div>
    )
}

export default BidMaker; 