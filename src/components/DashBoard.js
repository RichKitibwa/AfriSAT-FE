import React, { useState } from 'react';
import { Row, Col, Form, Button, Card, Nav } from 'react-bootstrap';
import '../App.css';
import ClientSideBar from './ClientSideBar';
import { useNavigate } from 'react-router';


const Dashboard = () => {
    const [subscriptionMonths, setSubscriptionMonths] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState({ subscribed: false, daysLeft: 0 });

    const packages = [
        { duration: '1 Month', price: '$2', description: 'Ideal for short-term entertainment.' },
        { duration: '2 Months', price: '$3.50', description: 'More savings for a longer period.' },
        { duration: '3 Months', price: '$6.50', description: 'Perfect for seasonal entertainment.' },
        { duration: '6 Months', price: '$11.00', description: 'Best value for half a year of fun.' }
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
    const navigate = useNavigate();

    const handleCardClick = (pkg) => {
        navigate(`/subscribe/${pkg.duration}`);
    };

    return (
        <div className="dashboard">
            <Row>
                <Col md={3} lg={2} className="d-none d-lg-block sidebar">
                    < ClientSideBar />
                </Col>
                <Col md={9} lg={10} className="client-dashboard-main">
                    <Row>
                        <Col md={12}>
                            {renderSubscriptionStatus()}
                        </Col>    
                    </Row>
                    <Row>
                        {packages.map((pkg, index) => (
                            <Col key={index} md={4} className="mb-4">
                                    <Card className="package-card" onClick={() => handleCardClick(pkg)}>
                                        <Card.Header className="text-center">
                                            <Card.Title>{pkg.duration}</Card.Title>
                                            <h3>{pkg.price}/mo</h3>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>{pkg.description}</Card.Text>
                                            <Button variant="primary" block>Subscribe</Button>
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
