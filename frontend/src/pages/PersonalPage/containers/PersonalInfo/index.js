import React from 'react'
import Button from 'react-bootstrap/Button'
import { exitUser } from '../../../../redux/actions'
import { connect } from 'react-redux'


import './index.scss'

const PersonalInfo = ({data, exitUser}) => {

    const handleExit = () => {
        exitUser();
    }

    return (
        <div className = "personal-info">
            <div className = "personal-info__item"><span>Имя пользователя:</span><span>{data.name}</span></div>
            <div className = "personal-info__item"><span>E-mail:</span><span>{data.email}</span></div>
            <Button 
                variant="primary" 
                className = "personal-info__button"
                onClick = {handleExit}
                >Выйти из аккаунта</Button>
        </div>
    );
}


export default connect(
    ({user}) => ({
        data: user.data,
    }),{ exitUser })(PersonalInfo);;