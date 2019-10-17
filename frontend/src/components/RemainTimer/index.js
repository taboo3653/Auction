import React, {useState} from 'react'
import PropTypes from "prop-types";
import { differenceInDays, formatDistanceStrict  } from 'date-fns';
import { ru } from 'date-fns/locale'
import getDiffTimeInFormat  from '../../utils/getDiffTimeInFormat';
import { useInterval } from '../../utils/useInterval';


const RemainTimer = ({finishTime}) => {

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

    return <span>{timeToEnd}</span>
}

RemainTimer.propTypes = {
    finishTime: PropTypes.string 
};

export default RemainTimer;
