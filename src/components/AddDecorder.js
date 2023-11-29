import React, { useState } from 'react';
import { Row, Col, Form, Button, Card, Nav } from 'react-bootstrap';
import '../App.css';
import ClientSideBar from './ClientSideBar';

const AddDecorder = () => {
    const [decoderNumber, setDecoderNumber] = useState('');
    const [subscriptionMonths, setSubscriptionMonths] = useState('');

    return (
        <div className="dashboard">
            <Row className="admin-dashboard-container">
                <Col md={3} lg={2} className="admin-sidebar">
                        <ClientSideBar />
                </Col>  
                <Col md={9} lg={10} className="admin-main-content">   
                    <Row>
                        <Col md={5} className="mb-5">
                            <Card>
                                <Card.Body>
                                    <h5>Add Decorder</h5>
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
                        </Col> 
                    </Row>  
                </Col>  
            </Row>  
        </div>                
    )
}

export default AddDecorder;
