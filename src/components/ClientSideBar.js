import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


const ClientSideBar = ({ onLinkClick }) => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column sidebar-content">
            <Link to="/dashboard" onClick={onLinkClick} className="sidebar-link">
                Dashboard
            </Link>
            <Link to="/dashboard/add-decorder" onClick={onLinkClick} className="sidebar-link">
                Add Decoder
            </Link>
            <Link to="/my-decoders" onClick={onLinkClick} className="sidebar-link">
                My Decoders
            </Link>
            <Link  onClick={onLinkClick} className="sidebar-link">
                My Account
            </Link>
        </Nav>
    );
};

export default ClientSideBar;
