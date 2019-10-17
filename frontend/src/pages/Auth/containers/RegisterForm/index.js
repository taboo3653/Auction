import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik'
import { fetchUserSignUp } from '../../../../redux/actions'
import { connect } from 'react-redux'
import { FormTextField } from '../../../../components'
import _ from 'lodash'
import "./index.scss"

const RegisterForm = ({ fetchUserSignUp }) => {

    const [serverErrorMessages, setServerErrorMessages] = useState([]);

    const handleError = (err) => {
        if (err.response.data && err.response.data.name === 'ValidationError')
            if ("errors" in err.response.data) {
                const messages = [];
                _.forEach(err.response.data.errors, val => {
                    let message; 
                    if(val.kind && val.kind === 'unique' && val.path && val.path === 'email')
                        message = 'Пользователь с таким email уже существует'
                    else  
                        message = val.message;

                    messages.push(message);
                })
                setServerErrorMessages(messages);
            }

    }

    return (
        <>
            <Formik
                initialValues={{ name: '', email: '', password: '', repeatPassword: '' }}

                validate={(values) => {
                    let errors = {};

                    if (!values.name)
                        errors.name = 'Пусто';
                    else if (!/^[0-9A-Za-z]{3,}$/i.test(values.name))
                        errors.name = 'Имя слишком короткое или имеет недопустимые символы';

                    if (!values.email)
                        errors.email = 'Пусто';
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
                        errors.email = 'Недопустимый email';

                    if (!values.password)
                        errors.password = 'Пусто';
                    else if (!/^[0-9A-Za-z]{3,}$/i.test(values.password))
                        errors.password = 'Пароль слишком короткий или имеет недопустимые символы';

                    if (values.repeatPassword !== values.password)
                        errors.repeatPassword = 'Пароли не совпадают';


                    return errors;
                }}

                onSubmit={(values, actions) => {
                    setServerErrorMessages([]);
                    fetchUserSignUp({
                        name: values.name,
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
                            <Form.Group controlId="name">
                                <FormTextField
                                    type="text"
                                    placeholder="Введите имя"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errors={errors.name}
                                    isValid={touched.name && !errors.name}
                                    isInvalid={touched.name && !!errors.name}
                                    value={values.name}
                                />
                            </Form.Group>

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

                            <Form.Group controlId="repeatPassword">
                                <FormTextField
                                    type="password"
                                    placeholder="Повторите пароль"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errors={errors.repeatPassword}
                                    isValid={touched.repeatPassword && !errors.password && !errors.repeatPassword}
                                    isInvalid={touched.repeatPassword && !!errors.repeatPassword}
                                    value={values.repeatPassword}
                                />
                            </Form.Group>

                            <Button
                                disabled={isSubmitting}
                                variant="primary"
                                type="submit" >
                                Регистрация
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


export default connect(null, { fetchUserSignUp })(RegisterForm);
