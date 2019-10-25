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
            <div className = "personal-info container">
                <div className = "personal-info__item row"><span className="col-6">Имя пользователя:</span><span className="col-6">{data.name}</span></div>
                <div className = "personal-info__item row"><span className="col-6">E-mail:</span><span className="col-6">{data.email}</span></div>
                
                <Button 
                    variant="primary" 
                    className = "personal-info__button"
                    onClick = {handleExit}
                    >
                    Выйти из аккаунта
                </Button>
                    
            </div>
    );
}


export default connect(
    ({user}) => ({
        data: user.data,
    }),{ exitUser })(PersonalInfo);;