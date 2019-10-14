import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'

const NavbarCont = ({isAuth}) => (
    <Navbar sticky='top' bg="primary" variant="dark">
        <Navbar.Brand as={Link} to="/">Auction</Navbar.Brand>
        <Nav className="ml-auto">
            { isAuth ?
                <Nav.Link as={Link} to="/personal">Личный кабинет</Nav.Link> :
                <>
                    <Nav.Link as={NavLink} to="/signin">Вход</Nav.Link>
                    <Nav.Link as={NavLink} to="/signup">Регистрация</Nav.Link>
                </>
            }
        </Nav>
    </Navbar>
    
)

export default connect(
    ({user}) => ({
        isAuth: !!user.data
    })
)(NavbarCont);

