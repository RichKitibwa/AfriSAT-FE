import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Form, Button, Card, Container, Row, Col, Image, } from 'react-bootstrap';
import { USER_ROLE } from '../utils/Constants';

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axios.post('/api/auth/login', {
          username,
          password
        });

        console.log(response.data)

        const token = response.data.token;
        const role = response.data.role;

        localStorage.setItem('jwtToken', token);
        console.log(response.data.role)

        handleLogin(response.data.username)

        if (role === USER_ROLE.ADMIN) {
            navigate('/admin/dashboard')
        } else {
            navigate('/dashboard'); 
        }

      } catch (error) {
        console.error(error);
      }
    };

    return (
        <Container style={{ marginTop: '4rem'}}>
            <Row>
                <Col md={4} className="d-flex align-items-center justify-content-center">
                    <Image src="/signup.svg" alt="Sign Up" fluid />
                </Col>

                <Col  md={8} className="d-flex align-items-center justify-content-center">
                    <Card style={{ width: '30rem', margin: 'auto', marginTop: '2rem' }}>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        required 
                                        className="full-width"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                        className="full-width"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    log in
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>        
        </Container>    
    );

};

export default Login;
