import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Form, Button, Card, Container, Row, Col, Image, } from 'react-bootstrap';
import { USER_ROLE } from '../utils/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye as EyeIcon, faEyeSlash as EyeSlashIcon } from '@fortawesome/free-solid-svg-icons'

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const apiLoginUrl = `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`;
        const response = await axios.post(apiLoginUrl, {
          username,
          password
        });

        const token = response.data.token;
        const role = response.data.role;

        localStorage.setItem('jwtToken', token);
        localStorage.setItem('role', role);

        console.log(response.data.role)

        handleLogin(response.data.username)

        if (role === USER_ROLE.ADMIN) {
            navigate('/admin/dashboard')
        } else {
            navigate('/dashboard'); 
        }

      } catch (error) {
        console.error(error);
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
        <Container style={{ marginTop: '4rem'}}>
            <Row>
                <Col md={4} className="d-flex align-items-center justify-content-center">
                    <Image src="/signup.svg" alt="Sign Up" fluid />
                </Col>

                <Col  md={8} className="d-flex align-items-center justify-content-center">
                    <Card style={{ width: '30rem', margin: 'auto', marginTop: '2rem' }}>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                {message && (
                                    <Card className={`mb-3 text-white ${messageType === 'error' ? 'bg-danger' : 'bg-success'}`}>
                                        <Card.Body>{message}</Card.Body>
                                    </Card>
                                )}
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
                                    <div className="password-field">
                                        <Form.Control 
                                            type={passwordVisible ? "text" : "password"} 
                                            placeholder="Password" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            required 
                                            className="full-width"
                                        />
                                        <span className="password-toggle-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
                                            <FontAwesomeIcon icon={passwordVisible ? EyeIcon : EyeSlashIcon} />
                                        </span>
                                    </div>    
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                                    {isLoading ? 'Logging in...' : 'Log in'}
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
