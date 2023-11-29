import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


const AdminSidebar = ({ onToggleShowForm }) => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column sidebar-content">
            <h4 className="sidebar-title">Admin</h4>
            <Link to="/admin/dashboard" className="admin-sidebar-link">
                Dashboard
            </Link>
            <Link to="/admin/dashboard/add-code" className="admin-sidebar-link">
                Add Codes
            </Link>
            <Link to="/admin/dashboard/all-codes" className="admin-sidebar-link">
                View Codes
            </Link>
        </Nav>
    );
};

export default AdminSidebar;
