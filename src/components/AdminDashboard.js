import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Form, Button, Card, Container, Row, Col, Nav } from 'react-bootstrap';
import '../App.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
             <Row>
                <Col md={3} lg={2} className="admin-sidebar">
                   
                    <Nav defaultActiveKey="/home" className="flex-column sidebar-content">
                        <h4 className="sidebar-title">Administrator</h4>
                        <Nav.Link href="/home" className="admin-sidebar-link">Home</Nav.Link>
                        <Nav.Link eventKey="link-1" className="admin-sidebar-link">Dashboard</Nav.Link>
                        <Nav.Link eventKey="link-2" className="admin-sidebar-link">Settings</Nav.Link>
                    </Nav>
                </Col>
                <Col md={9} lg={10} className="admin-main-content">
                    <Card className="admin-form-card">
                        <Card.Body>
                            <Card.Title>Add Activation Code</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="code">
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control type="text" placeholder="code" className="full-width" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="duration">
                                    <Form.Label>Code Duration</Form.Label>
                                    <Form.Control type="number" placeholder="Number of months" className="full-width" min="1" max="12" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Cost</Form.Label>
                                    <Form.Control type="number" placeholder="cost" className="full-width" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Button variant="primary" type="submit" className="w-100">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>        
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboard;
