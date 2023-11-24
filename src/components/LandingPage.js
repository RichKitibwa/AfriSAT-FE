import React from 'react';
import {Typography } from '@mui/material';
import NavBar from './NavBar';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import './LandingPage.css';
import '../App.css';

const LandingPage = () => {
  const isLoggedIn = false;

  return (
    <div>
        <NavBar isLoggedIn={isLoggedIn} />
        <div className="landing-page-container">
            <Row>
                <Col xs={12}>
                    <div className="hero-section">
                        <Image className="hero-image" src="/satellite_hero.jpg" alt="Satellite" fluid/>
                        <div className="hero-text">
                            <h3>Your Gateway To <br/>Unlimited Entertainment</h3>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="my-2">    
                <Col md={6} className="offer-text">
                    <h3>Access all your favorite shows</h3>
                    <p>Unlimited Entertainment at your fingertips</p>
                </Col>
                <Col md={6} >
                    <Image src="/watching_tv.jpg" alt="watching_tv" className="card-image"/>
                </Col>
            </Row>
        </div>   
    </div>
  );
};

export default LandingPage;
