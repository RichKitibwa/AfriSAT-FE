import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Form, Button, Card, Row, Col, Nav } from 'react-bootstrap';
import '../App.css';

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        code: '',
        duration: '',
        cost: ''
    })

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post('/api/activation-codes/add-code', formData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        
            if (response.status === 200) {
                setFormData({code: '', duration: '', cost: ''});
                setMessage("Activation code added successfully.")
                setMessageType("success");

                setTimeout(() => {
                    setMessage('');
                    setMessageType('');
                }, 5000);
            }
        } catch (error) {
            setMessage(error.response.data.message || "An error occurred.");
            setMessageType("error");

            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 5000);
        }
    }
    return (
        <div className="admin-dashboard">
             <Row>
                <Col md={3} lg={2} className="admin-sidebar">
                   
                    <Nav defaultActiveKey="/home" className="flex-column sidebar-content">
                        <h4 className="sidebar-title">Administrator</h4>
                        <Nav.Link href="/home" className="admin-sidebar-link">View Codes</Nav.Link>
                    </Nav>
                </Col>
                <Col md={9} lg={10} className="admin-main-content">
                    <Card className="admin-form-card">
                        <Card.Body>
                            <Card.Title>Add Activation Code</Card.Title>
                            {message && (
                                <Card className={`mb-3 text-white ${messageType === 'error' ? 'bg-danger' : 'bg-success'}`}>
                                    <Card.Body>{message}</Card.Body>
                                </Card>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="code">
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control type="text" placeholder="code" className="full-width" value={formData.code} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="duration">
                                    <Form.Label>Code Duration</Form.Label>
                                    <Form.Control type="number" placeholder="Number of months" className="full-width" value={formData.duration} onChange={handleChange}  min="1" max="12" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="cost">
                                    <Form.Label>Cost</Form.Label>
                                    <Form.Control type="number" placeholder="cost" className="full-width" value={formData.cost} onChange={handleChange} min="1" />
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
