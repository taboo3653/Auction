import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { differenceInDays, formatDistanceStrict  } from 'date-fns'
import getDiffTimeInFormat  from '../../utils/getDiffTimeInFormat'
import { ru } from 'date-fns/locale'
import { useInterval } from '../../utils/useInterval'


import './index.scss'

const LotCard = ({name, finishTime, currentPrice}) => {

    useInterval(() => {
        setTimeToEnd(getTimeString(new Date(finishTime),window.diffTime));
      }, 1000);

    const getTimeString = (finishDateBase, diffServerTime) => {
        const currentServerDate =  new Date((new Date())-diffServerTime);
        const finishDate = finishDateBase

        if(!finishDate || finishDate - currentServerDate < 0 )
            return "Завершён"
        else if(differenceInDays(finishDate, currentServerDate) > 0)
            return formatDistanceStrict(currentServerDate, finishDate, { unit: 'day', locale: ru })
        else
            return  getDiffTimeInFormat(finishDate-currentServerDate);
        
    }

    const [timeToEnd, setTimeToEnd] = useState(getTimeString(new Date(finishTime),window.diffTime)); 


    return (
        <Card className = "lot-card">
            <Card.Img variant="top" className = "lot-card__image" src={require('../../assets/img/vase.jpg')} />
            <Card.Body className = "lot-card__body">
                <Card.Title>{name}</Card.Title>
                <div className = "lot-card__bottom-container">
                    <Card.Text>{currentPrice + " BYN"}</Card.Text>
                    <Card.Text>{timeToEnd}</Card.Text>
                </div>
            </Card.Body>
        </Card>
    )
}


export default LotCard;