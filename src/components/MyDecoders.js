import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import ClientSideBar from './ClientSideBar';

const MyDecoders = () => {
    const [decoders, setDecoders] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDecoders = async () => {
            setIsLoading(true);
            try {
                const apiAllDecodersUrl = `${process.env.REACT_APP_API_BASE_URL}/api/decoders/all-decoders`;
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(apiAllDecodersUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDecoders(response.data);
            } catch (error) {
                console.error('Error fetching decoders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDecoders();
    }, []);

    const handleDelete = (decoderId) => {
        
        console.log('Deleting decoder:', decoderId);
    };

    const handleAddSubscription = (decoderId) => {
        navigate('/dashboard');
    };

    return (
        <div className="dashboard">
            <Row>
                <Col md={3} lg={2} className="d-none d-lg-block sidebar">
                    < ClientSideBar />
                </Col>        
                <Col md={9} lg={10} className="client-dashboard-main"> 
                    {isLoading ? (
                        <div className="loading-animation">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading Decoders...</span>
                            </Spinner>
                        </div>
                    ) : decoders.length === 0 ? (
                            <div className="no-decoders">
                                <h2>No decoders found.</h2>
                                <Button onClick={() => navigate('/dashboard/add-decorder')}>Add Decoder</Button>
                            </div>
                    ) : (
                        decoders.map((decoder, index) => (
                            <Row key={index} className="mb-4">
                                <Col md={12}>
                                    <Card className="decoder-card">
                                        <Card.Body>
                                            <Card.Title>Decoder: {decoder.decoderNumber}</Card.Title>
                                            <Card.Text>
                                                Subscription Status: {decoder.hasSubscription ? `Active - ${decoder.daysLeft} days left` : 'No Subscription'}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => handleAddSubscription(decoder.decoderId)}>
                                                Add Subscription
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDelete(decoder.decoderId)} className="ms-2">
                                                Delete Decoder
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>    
                        ))
                    )}  
                </Col>    
            </Row>
        </div>
    );
};

export default MyDecoders;
