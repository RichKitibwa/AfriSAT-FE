import React, { useState } from 'react';
import { Row, Col, Form, Button, Card, Nav } from 'react-bootstrap';
import '../App.css';
import ClientSideBar from './ClientSideBar';

const Dashboard = () => {
    const [subscriptionMonths, setSubscriptionMonths] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState({ subscribed: false, daysLeft: 0 });

    const packages = [
        { duration: '1 Month', description: 'Ideal for short-term entertainment.' },
        { duration: '2 Months', description: 'More savings for a longer period.' },
        { duration: '3 Months', description: 'Perfect for seasonal entertainment.' },
        { duration: '6 Months', description: 'Best value for half a year of fun.' }
    ];

    const renderSubscriptionStatus = () => (
        <Card className="mb-3 subscription-status">
            <Card.Body>
                <Card.Title>Welcome</Card.Title>
                <Card.Text>
                    {subscriptionStatus.subscribed
                        ? `Subscription Active - ${subscriptionStatus.daysLeft} days remaining`
                        : 'No subscriptions yet'}
                </Card.Text>
            </Card.Body>
        </Card>
    );

    return (
        <div className="dashboard">
            <Row>
                <Col md={3} className="sidebar">
                    < ClientSideBar />
                </Col>
                <Col md={9} className="client-dashboard-main">
                    <Row>
                        <Col md={12}>
                            {renderSubscriptionStatus()}
                        </Col>    
                    </Row>
                    <Row>
                        {packages.map((pkg, index) => (
                            <Col key={index} md={4} className="mb-4">
                                <Card className="package-card">
                                    <Card.Body>
                                        <Card.Title>{pkg.duration}</Card.Title>
                                        <Card.Text>{pkg.description}</Card.Text>
                                        <Button variant="primary">Select</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>    
        </div>
    );
};

export default Dashboard;
