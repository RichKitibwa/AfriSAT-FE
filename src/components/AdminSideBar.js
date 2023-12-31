import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


const AdminSidebar = ({ onLinkClick }) => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column sidebar-content">
            <h4 className="sidebar-title">Admin</h4>
            <Link to="/admin/dashboard" onClick={onLinkClick} className="sidebar-link">
                Dashboard
            </Link>
            <Link to="/admin/dashboard/add-code" onClick={onLinkClick} className="sidebar-link">
                Add Codes
            </Link>
            <Link to="/admin/dashboard/all-codes" onClick={onLinkClick} className="sidebar-link">
                View Codes
            </Link>
        </Nav>
    );
};

export default AdminSidebar;
