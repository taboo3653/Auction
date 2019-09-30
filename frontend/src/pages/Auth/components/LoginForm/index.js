import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


import "./index.scss"

const LoginForm = () => {
    return (
        <>
            <Form>
                <Form.Group controlId="">
                    <Form.Control type="email" placeholder="E-mail" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Подтвердить
                </Button>
            </Form>
        </>
    );
}


export default LoginForm;
