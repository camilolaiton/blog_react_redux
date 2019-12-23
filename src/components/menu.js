import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/index.css';

const menu = () => {
    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg">

                <Navbar.Brand className="nabvar">Menu</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link > 
                            <Link to='/'>Usuarios</Link>
                        </Nav.Link>
                        <Nav.Link > 
                            <Link to='/tareas'>Tareas</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    );
};

export default menu;