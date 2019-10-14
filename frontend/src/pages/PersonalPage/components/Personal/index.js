import React from 'react'
import {  PersonalLots } from '../'
import { PersonalInfo } from '../../containers'
 
import './index.scss'

const Personal = () => {
    return (
        <div className = "personal">
            <div className = "personal__item info-block"><PersonalInfo /></div>
            <div className = "personal__item"><PersonalLots /></div>
        </div>
    );
}


export default Personal;