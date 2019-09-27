import React from 'react'

import "./index.scss"

const LotAuctionBar = () => {
    return (   
            <div className = "lot-auction-bar">
                <div>
                    <div>
                        <span>Стартовая цена:</span>
                        <span>5 BYN</span>
                    </div>
                    <div>
                        <span>Минимальный шаг цены</span>
                        <span>5 BYN</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Текущая цена:</span>
                        <span>25 BYN</span>
                    </div>
                    <div>
                        <span>До завершения:</span>
                        <span>05:02:01</span>
                    </div>
                </div>
                <div>
                    
                </div>
                <div>

                </div>
            </div>


    );
}


export default LotAuctionBar;