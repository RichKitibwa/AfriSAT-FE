import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Form, Button, Card, Container, Row, Col, Image, } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const SignUp = ({ handleLogin }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
        setCountries(countryList().getData());
    }, []);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axios.post('/api/auth/signup', {
          username,
          email,
          phoneNumber,
          country,
          password
        });
  
        setUserId(response.data.userId);

        handleLogin(response.data.username)

        navigate('/dashboard'); 

      } catch (error) {
        if (error.response && error.response.data) {
            setErrorMessage(error.response.data);
        } else {
            setErrorMessage('An error occurred during signup.');
        }
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
                                {errorMessage && (
                                    <Card className="error-card">
                                         <Card.Body>
                                             {errorMessage}
                                         </Card.Body>
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

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                        className="full-width"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Select 
                                        options={countries}
                                        value={countries.find(country => country.label === country)}
                                        onChange={(country) => setCountry(country.label)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter phone number" 
                                        value={phoneNumber} 
                                        onChange={(e) => setPhoneNumber(e.target.value)} 
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
                                    Sign up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>        
        </Container>    
    );

};

export default SignUp;