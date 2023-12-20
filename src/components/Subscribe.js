import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../App.css';
import ClientSideBar from './ClientSideBar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';


const Subscribe = () => {
    const [decoderNumber, setDecoderNumber] = useState('');
    const [decoders, setDecoders] = useState([]);
    const { duration } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDecoders = async () => {
            try {
                const apiAllDecodersUrl = `${process.env.REACT_APP_API_BASE_URL}/api/decoders/all-decoders`;
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(apiAllDecodersUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDecoders(response.data);
            } catch (error) {
                console.error('Error fetching decoders:', error);
            }
        };

        fetchDecoders();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(decoderNumber);
    };

    return (
        <div className="dashboard">
            <Row className="admin-dashboard-container">
                <Col md={3} lg={2} className="d-none d-lg-block sidebar">
                        <ClientSideBar />
                </Col>  
                <Col md={9} lg={10} className="admin-main-content">   
                    {decoders.length === 0 ? (
                        <div className="no-decoders">
                            <h4>No decoders added yet.</h4>
                            <Button onClick={() => navigate('/dashboard/add-decorder')}>Add Decoder</Button>
                        </div>
                    ) : (    
                    <Row>
                        <Col md={5} className="mb-5">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Subscribe for: {duration}</Card.Title>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formDecoderSelect">
                                            <Form.Label>Decoder Number</Form.Label>
                                            <Form.Select 
                                                aria-label="Select decoder"
                                                value={decoderNumber} 
                                                onChange={(e) => setDecoderNumber(e.target.value)}
                                                className="full-width"
                                            >
                                                <option value="">Select a decoder</option>
                                                {decoders.map((decoder, index) => (
                                                    <option key={index} value={decoder.decoderNumber}>{decoder.decoderNumber}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                            
                                        <Button variant="primary" type="submit" className="w-100">
                                            Subscribe
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col> 
                    </Row>  
                    )}
                </Col>  
            </Row>  
        </div>                
    )
}

export default Subscribe;
