import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Nav } from 'react-bootstrap';
import '../App.css';

const Dashboard = () => {
    const [decoderNumber, setDecoderNumber] = useState('');
    const [subscriptionMonths, setSubscriptionMonths] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState({ subscribed: false, daysLeft: 0 });

    const renderSubscriptionForm = () => (
        <Card>
            <Card.Body>
                <h5>Subscribe to Service</h5>
                <Form>
                    <Form.Group className="mb-3" controlId="formDecoderNumber">
                        <Form.Label>Decoder Number</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter decoder number" 
                            value={decoderNumber} 
                            onChange={(e) => setDecoderNumber(e.target.value)} 
                            className="full-width"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSubscriptionMonths">
                        <Form.Label>Number of Months</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter number of months" 
                            value={subscriptionMonths} 
                            onChange={(e) => setSubscriptionMonths(e.target.value)} 
                            min="1"
                            max="12"
                            className="full-width"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Subscribe
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderSubscriptionStatus = () => (
        <Card className="mb-3">
            <Card.Body>
                {subscriptionStatus.subscribed
                    ? `Subscription Active - ${subscriptionStatus.daysLeft} days remaining`
                    : 'No subscriptions yet'}
            </Card.Body>
        </Card>
    );

    return (
        <div className="client-dashboard">
            <Row>
                <Col md={2} className="sidebar">
                    <Nav className="flex-column sidebar-nav">
                        <Nav.Link onClick={() => {}} className="client-sidebar-link">Add Decoder</Nav.Link>
                        <Nav.Link onClick={() => {}} className="client-sidebar-link">All Decoders</Nav.Link>
                    </Nav>
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={6}>
                            {renderSubscriptionStatus()}
                        </Col>    
                    </Row>
                    <Row>
                        <Col md={6}>
                            {renderSubscriptionForm()}
                        </Col>
                    </Row>
                </Col>
            </Row>    
        </div>
    );
};

export default Dashboard;
