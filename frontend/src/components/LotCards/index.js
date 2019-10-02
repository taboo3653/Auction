import React from 'react'
import { LotCard } from '../'

import "./index.scss"

const LotCards = ({items}) => {
    return (
        <div className = "lot-cards">
            {
                items.map((item) => (
                    <LotCard {...item} key = {item._id} />
                ))
            }

        
        </div>
    )
}


export default LotCards;