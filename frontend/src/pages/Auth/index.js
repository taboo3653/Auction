import React from 'react'
import { Route } from 'react-router-dom'
import { LoginForm, RegisterForm } from './components'
import './index.scss'

const Auth = () => {
    return (
        <section className = "page">
            <div className = "auth">
               <div className = "auth__content">
                    <Route exact path="/signin" component={LoginForm} />
                    <Route exact path="/signup" component={RegisterForm} />
                </div>
            </div>
        </section>
    );
}

export default Auth;