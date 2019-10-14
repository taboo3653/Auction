import React from 'react'

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import './index.scss'

const PersonalLots = () => {
    return (
        <Tab.Container defaultActiveKey="my-lots">
            <Row className="justify-content-md-center">
                    <Nav variant="pills" className="flex-row">
                    <Col sm="auto">
                        <Nav.Item>
                            <Nav.Link eventKey="my-lots">Мои аукционы</Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col sm="auto">
                        <Nav.Item>
                            <Nav.Link eventKey="lots-with-part">Аукционы с моими ставками</Nav.Link>
                        </Nav.Item>
                    </Col>
                    </Nav>
            </Row>
            <Row>
                <Col>
                    <Tab.Content>
                        <Tab.Pane eventKey="my-lots">
                           
                        </Tab.Pane>
                        <Tab.Pane eventKey="lots-with-part">
                           
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    );
}


export default PersonalLots;