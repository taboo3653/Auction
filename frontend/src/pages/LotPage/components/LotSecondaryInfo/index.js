import React  from 'react'

import './index.scss'

const LotSecondaryInfo = ({minStep,startPrice }) => {
    
   
    return (
        <div className="lot-secondary-info">
                <div className="lot-secondary-info__item">
                    <span>Стартовая цена:</span>
                    <span>{startPrice + " BYN"}</span>
                </div>
                <div className="lot-secondary-info__item">
                    <span>Минимальный шаг цены:</span>
                    <span>{minStep + " BYN"}</span>
                </div>
            </div>
    )
}

export default LotSecondaryInfo; 