import React  from 'react'
import { Link } from 'react-router-dom'

import {LotCards} from '../../../../components'
import Button from 'react-bootstrap/Button'

import './index.scss'

const PersonalLots = ({creatorLots}) => {


    return (
        
        <>
        <div className = "row justify-content-center">
            <Button  
                    variant="primary"
                    as={Link}
                    to="lot-edit">
                    Создать лот
                </Button>
        </div>
        <LotCards items ={creatorLots} />
        </>


      

    );

     /* <Tab.Container defaultActiveKey="my-lots">
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
    </Tab.Container>*/
}


export default PersonalLots;