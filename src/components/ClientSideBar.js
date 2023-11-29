import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


const ClientSideBar = () => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column sidebar-content">
            <Link to="/dashboard" className="sidebar-link">
                Dashboard
            </Link>
            <Link to="/dashboard/add-decorder" className="sidebar-link">
                Add Decorder
            </Link>
            <Link to="" className="sidebar-link">
                All Decorders
            </Link>
            <Link to="" className="sidebar-link">
                My Account
            </Link>
        </Nav>
    );
};

export default ClientSideBar;
