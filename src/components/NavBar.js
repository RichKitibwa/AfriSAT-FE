import React, { useState } from 'react';
import {Navbar, Button, Container, Nav, Dropdown, Offcanvas} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { USER_ROLE } from '../utils/Constants';
import AdminSidebar from './AdminSideBar';
import ClientSideBar from './ClientSideBar';
import '../App.css';

const NavBar = ({ isAuthenticated, username, handleLogout }) => {

    const location = useLocation();
    const isTransparent = location.pathname === '/signup' || location.pathname === '/login';
    const userInitial = isAuthenticated && typeof username === 'string' ? username.charAt(0).toUpperCase() : '';

    const showSignup = location.pathname !== '/signup';
    const showLogin = location.pathname !== '/login';

    const [showDrawer, setShowDrawer] = useState(false);
    const toggleDrawer = () => setShowDrawer(!showDrawer);

    const role = localStorage.getItem('role');
    
    return (
        <>
            <Navbar 
                expand="lg" 
                bg={isTransparent ? 'transparent' : 'light'} 
                fixed="top" 
                variant={isTransparent ? 'dark' : 'light'} 
                className="navbar"
            >
                <Container>
                    {isAuthenticated && (
                        <Button variant="outline-none" onClick={toggleDrawer} className="me-2 d-lg-none">
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                    )}
                
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
                            <></>  
                        )} 
                    </Nav>
                    </Navbar.Collapse>
                    {isAuthenticated && (
                        <Dropdown>
                           <Dropdown.Toggle variant="dark" id="dropdown-basic" className="user-initials">
                               {userInitial}
                           </Dropdown.Toggle>

                           <Dropdown.Menu className="user-dropdown-menu">
                               <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                               <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
                           </Dropdown.Menu>
                       </Dropdown>  
                    )}
                </Container>
            </Navbar>
            <Offcanvas show={showDrawer} onHide={toggleDrawer} className="custom-offcanvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {isAuthenticated && role === USER_ROLE.ADMIN ?
                        <AdminSidebar onLinkClick={toggleDrawer}/> : 
                        <ClientSideBar onLinkClick={toggleDrawer}/>}
                </Offcanvas.Body>
            </Offcanvas>
        </>
  );
};

export default NavBar;
