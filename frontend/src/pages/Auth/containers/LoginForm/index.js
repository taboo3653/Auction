import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FormTextField } from '../../../../components'
import { fetchUserSignIn } from '../../../../redux/actions'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import _ from 'lodash'

import "./index.scss"

const LoginForm = ({ fetchUserSignIn }) => {
    const [serverErrorMessages, setServerErrorMessages] = useState([]);

    const handleError = (err) => {
        const messages = [];
        if(err.response.status === 422) {
            if ("errors" in err.response.data) {
                _.forEach(err.response.data.errors, val => {
                    let message; 
                    if(val.param === 'email')
                        message = 'Недопустимый email'
                    if(val.param === 'password')
                        message = 'Недопустимый пароль'
                    messages.push(message);
                })
            }
        }

        if(err.response.status === 404)
            messages.push("Пользователя с таким email не существует");

        if(err.response.status === 401)
            messages.push("Неправильный пароль");
        
        setServerErrorMessages(messages);
    }

    return (
        <>
            <Formik
                initialValues={{ email: '', password: ''}}

                validate={(values) => {
                    let errors = {};
    
                    if (!values.email)
                        errors.email = 'Пусто';
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
                        errors.email = 'Недопустимый email';

                    if (!values.password)
                        errors.password = 'Пусто';
                    else if (!/^[0-9A-Za-z]{3,}$/i.test(values.password))
                        errors.password = 'Пароль слишком короткий или имеет недопустимые символы';

                    return errors;
                }}

                onSubmit={(values, actions) => {
                    setServerErrorMessages([]);
                    fetchUserSignIn({
                        email: values.email,
                        password: values.password
                    })
                        .catch(err => handleError(err))
                        .finally(() => actions.setSubmitting(false))
                }
                }
                render={({
                    values,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    errors,

                }) => (
                        <Form onSubmit={handleSubmit}>
                            
                            <Form.Group controlId="email">
                                <FormTextField
                                    type="text"
                                    placeholder="Введите email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errors={errors.email}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && !!errors.email}
                                    value={values.email}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <FormTextField
                                    type="password"
                                    placeholder="Введите пароль"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errors={errors.password}
                                    isValid={touched.password && !errors.password}
                                    isInvalid={touched.password && !!errors.password}
                                    value={values.password}
                                />
                            </Form.Group>

                            <Button
                                disabled={isSubmitting}
                                variant="primary"
                                type="submit" >
                                Войти
                            </Button>
                        </Form>
                    )}
            />
            <div className = "server-errors">
            {
                serverErrorMessages.map((item,key) => (
                    <div key = {key}>{item}</div>
                ))
            }
            </div>
        </>
    );
}


export default connect(null, {fetchUserSignIn})(LoginForm);
