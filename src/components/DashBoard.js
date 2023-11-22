import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Dashboard = () => {
    const [decoderNumber, setDecoderNumber] = useState('');
    const [subscriptionMonths, setSubscriptionMonths] = useState('');

    return (
        <Container style={{ marginTop: '8rem' }}>
            <Row>
                <Col md={6}>
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
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formSubscriptionMonths">
                                    <Form.Label>Number of Months</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter number of months" 
                                        value={subscriptionMonths} 
                                        onChange={(e) => setSubscriptionMonths(e.target.value)} 
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Subscribe
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
