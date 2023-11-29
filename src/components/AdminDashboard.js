import React, { useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Nav } from 'react-bootstrap';
import '../App.css';
import AdminSidebar from './AdminSideBar';

const AdminDashboard = () => {
    
    const stats = {
        subscribedUsers: 1234,
        totalSales: 987654,
        activeCodes: 2000
    }

    return (
        <div className="dashboard">
             <Row className="admin-dashboard-container">
                <Col md={3} lg={2} className="sidebar">
                    <AdminSidebar />
                </Col>    
                <Col md={9} lg={10} className="admin-main-content">   
                    <Row>
                        <Col md={4} className="mb-4">
                            <Card className="stat-card">
                                <Card.Body>
                                    <Card.Title>Subscribed Users</Card.Title>
                                    <Card.Text>{stats.subscribedUsers}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="stat-card">
                                <Card.Body>
                                    <Card.Title>Total Sales</Card.Title>
                                    <Card.Text>${stats.totalSales}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4} className="mb-4">
                            <Card className="stat-card">
                                <Card.Body>
                                    <Card.Title>Active Codes</Card.Title>
                                    <Card.Text>{stats.activeCodes}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="mb-4">
                            <Card className="large-stat-card">
                                <Card.Body>
                                    <Card.Title>Recent Activity Log</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboard;
