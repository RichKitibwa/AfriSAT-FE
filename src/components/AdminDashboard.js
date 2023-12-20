import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Nav } from 'react-bootstrap';
import '../App.css';
import AdminSidebar from './AdminSideBar';

const AdminDashboard = () => {
    
    const [stats, setStats] = useState({
        subscribedUsers: 0,
        registeredUsers: 0,
        totalSales: 0,
        activeCodes: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiActiveSubscriptionsUrl = `${process.env.REACT_APP_API_BASE_URL}/api/stats/active-subscriptions`;
                const apiRegisteredUsersUrl = `${process.env.REACT_APP_API_BASE_URL}/api/stats/registered-users`;
                const apiTotalSalesUrl = `${process.env.REACT_APP_API_BASE_URL}/api/stats/total-sales`;
                const apiActiveCodesUrl = `${process.env.REACT_APP_API_BASE_URL}/api/stats/active-codes`;
                const token = localStorage.getItem('jwtToken');
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const resSubscribedUsers = await axios.get(apiActiveSubscriptionsUrl, { headers });
                const resRegisteredUsers = await axios.get(apiRegisteredUsersUrl, { headers });
                const resTotalSales = await axios.get(apiTotalSalesUrl, { headers });
                const resActiveCodes = await axios.get(apiActiveCodesUrl, { headers });

                setStats(prevStats => ({
                    ...prevStats,
                    subscribedUsers: resSubscribedUsers.data,
                    registeredUsers: resRegisteredUsers.data,
                    totalSales: resTotalSales.data,
                    activeCodes: resActiveCodes.data
                }));
            } catch (error) {
                console.error('Error fetching stats:', error);
                console.log(error.response);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
             <Row className="admin-dashboard-container">
                <Col md={3} lg={2} className="d-none d-lg-block sidebar">
                    <AdminSidebar />
                </Col>    
                <Col md={9} lg={10} className="admin-main-content">   
                    <Row>
                        <Col md={4} className="mb-4">
                            <Card className="stat-card">
                                <Card.Body>
                                    <Card.Title>Registered Users</Card.Title>
                                    <Card.Text>{stats.registeredUsers}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
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
