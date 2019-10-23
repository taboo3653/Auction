import React from 'react'
import { Market } from './containers'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


import './index.scss'

const MarketPage = () => {
    return (
        <>
            <div className="page market-page">
                <Market />
            
                <Button 
                    className = "market-page__add-button add-button add-button_round" 
                    variant="success"
                    size="lg"
                    as={Link}
                    to="lot-edit">
                    <FontAwesomeIcon size="1x" icon={faPlus} />
                </Button>
            </div>

        </>
    )
}

export default MarketPage;