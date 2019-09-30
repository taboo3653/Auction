import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


import "./index.scss"

const RegisterForm = () => {
    return (
        <>
            <Form>
                <Form.Group controlId="">
                    <Form.Control type="text" placeholder="Введите имя" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Control type="email" placeholder="Введите e-mail" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Control type="password" placeholder="Введите пароль" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Control type="password" placeholder="Повторите пароль" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Регистрация
                </Button>
            </Form>
        </>
    );
}


export default RegisterForm;
