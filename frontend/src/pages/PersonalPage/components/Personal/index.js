import React from 'react'
import { PersonalInfo, PersonalLots } from '../'

import './index.scss'

const Personal = () => {
    return (
        <div className = "personal">
            <div className = "personal__item"><PersonalInfo /></div>
            <div className = "personal__item"><PersonalLots /></div>
        </div>
    );
}


export default Personal;