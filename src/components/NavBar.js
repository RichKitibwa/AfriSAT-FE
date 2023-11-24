import React from 'react';
import {Navbar, Button, Container, Nav, Dropdown} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const NavBar = ({ isAuthenticated, username, handleLogout }) => {

    const location = useLocation();
    const isTransparent = location.pathname === '/signup' || location.pathname === '/login';
    const userInitial = isAuthenticated && typeof username === 'string' ? username.charAt(0).toUpperCase() : '';

    const showSignup = location.pathname !== '/signup';
    const showLogin = location.pathname !== '/login';

    return (
        <Navbar 
            expand="lg" 
            bg={isTransparent ? 'transparent' : 'light'} 
            fixed="top" 
            variant={isTransparent ? 'dark' : 'light'} 
            className="navbar"
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-logo ms-4">AfriSAT</Navbar.Brand>

                {!isAuthenticated && (
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                )}
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-4">
                    {!isAuthenticated ? (
                        <>
                            {showSignup && (
                                <Link to="/signup">
                                    <Button variant="dark" className="nav-button me-4">Sign Up</Button>
                                </Link>
                            )}
                           {showLogin && (
                                <Link to="/login">
                                    <Button variant="dark" className="nav-button me-4">Login</Button>
                                </Link>
                           )}  
                        </>
                    ) : (
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic" className="user-dropdown">
                                {userInitial}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>    
                    )} 
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
};

export default NavBar;
