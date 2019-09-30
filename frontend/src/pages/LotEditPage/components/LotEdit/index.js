import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


import "./index.scss"

const LotEdit = () => {
    return (
        <>
            <h1>Редактирование лота</h1>
            <Form>
                <Form.Group controlId="">
                    <Form.Label>Название лота</Form.Label>
                    <Form.Control type="text" placeholder="Введите название лота" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Минимальный шаг</Form.Label>
                    <Form.Control as="select">
                        <option>1 BYN</option>
                        <option>5 BYN</option>
                        <option>10 BYN</option>
                        <option>20 BYN</option>
                        <option>50 BYN</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Стартовая цена</Form.Label>
                    <Form.Control type="text" placeholder="Введите название лота" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Описание лота</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Введите описание"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Подтвердить
                </Button>
            </Form>
        </>
    );
}


export default LotEdit;
