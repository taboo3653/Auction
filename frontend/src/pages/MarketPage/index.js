import React from 'react'
import { Market } from './containers'



import './index.scss'

const MarketPage = () => {
    return (
        <>
            <div className="page market-page">
                <Market />
            
                
            </div>

        </>
    )
}

/*<Button 
                    className = "market-page__add-button add-button add-button_round" 
                    variant="success"
                    size="lg"
                    as={Link}
                    to="lot-edit">
                    <FontAwesomeIcon size="1x" icon={faPlus} />
                </Button>*/

export default MarketPage;