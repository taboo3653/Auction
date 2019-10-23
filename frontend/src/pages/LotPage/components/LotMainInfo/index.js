import React from 'react'
import { RemainTimer } from '../../../../components'

import './index.scss'

const LotMainInfo = ({ currentPrice, finishTime}) => {


    return (
        <div className="lot-main-info">
            <div className="lot-main-info__item">
                <span>Текущая цена:</span>
                <span>{currentPrice + " BYN"}</span>
            </div>
            <div className="lot-main-info__item">
                <span>До завершения:</span>
                <span><RemainTimer finishTime={finishTime} /></span>
            </div>
        </div>
    )
}

export default LotMainInfo; 