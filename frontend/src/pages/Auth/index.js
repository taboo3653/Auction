import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { LoginForm, RegisterForm } from './containers'
import './index.scss'

const Auth = ({ history }) => {
    return (
        <div className="page">
            <div className="auth">
                <div className="auth__content">
                    <Route 
                        exact 
                        path="/signin" 
                        render = { () => <LoginForm /> }
                        />
                    <Route
                        exact
                        path="/signup"
                        render = { () => <RegisterForm /> }
                        />
                </div>
            </div>
        </div>
    );
}

export default withRouter(Auth);