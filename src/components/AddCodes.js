import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import AdminSidebar from './AdminSideBar';

const AddCodes = () => {

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
            const apiAddCodeUrl = `${process.env.REACT_APP_API_BASE_URL}/api/activation-codes/add-code`;
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post(apiAddCodeUrl, formData,{
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
        <div className="dashboard">
            <Row className="admin-dashboard-container">
                <Col md={3} lg={2} className="d-none d-lg-block sidebar">
                        <AdminSidebar />
                </Col>  
                <Col md={9} lg={10} className="admin-main-content">   
                    <Row>
                        <Col md={5} className="mb-5">
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
                                            <Form.Select
                                                className="full-width"
                                                value={formData.duration}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select duration</option>
                                                <option value="1 month">1 month</option>
                                                <option value="2 months">2 months</option>
                                                <option value="3 months">3 months</option>
                                                <option value="6 months">6 months</option> 
                                            </Form.Select>     
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
                </Col>  
            </Row>  
        </div>                  
    )
}

export default AddCodes;
