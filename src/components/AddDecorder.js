import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../App.css';
import ClientSideBar from './ClientSideBar';

const AddDecorder = () => {
    const [decoderNumber, setDecoderNumber] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const apiAddDecoderUrl = `${process.env.REACT_APP_API_BASE_URL}/api/decoders/add-decoder`;
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post(apiAddDecoderUrl, {
                decoderNumber
            }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.status === 201) {
                
                setMessage("Decoder added successfully.")
                setMessageType("success");

                setDecoderNumber('');

                setTimeout(() => {
                    setMessage('');
                    setMessageType('');
                }, 5000);
            }

        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred.");
            setMessageType("error");

            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <Row className="">
                <Col md={3} lg={2} className="d-none d-lg-block sidebar">
                        <ClientSideBar />
                </Col>  
                <Col md={9} lg={10} className="client-dashboard-main">   
                    <Row>
                        <Col md={5} className="mb-5">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Add Decorder</Card.Title>
                                    {message && (
                                        <Card className={`mb-3 text-white ${messageType === 'error' ? 'bg-danger' : 'bg-success'}`}>
                                            <Card.Body>{message}</Card.Body>
                                        </Card>
                                    )}
                                    <Form onSubmit={handleSubmit}>
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

                                        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                                            {isLoading ? 'Adding Decoder...' : 'Add Decoder'}
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
