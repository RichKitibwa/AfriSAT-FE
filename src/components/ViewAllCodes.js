import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Table, Button, Row, Col } from 'react-bootstrap';
import AdminSidebar from './AdminSideBar';
import '../App.css';

const AllCodes = () => {
    const [codes, setCodes] = useState([]);

    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const apiAllCodesUrl = `${process.env.REACT_APP_API_BASE_URL}/api/activation-codes/all-codes`;
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(apiAllCodesUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setCodes(response.data);
            } catch (error) {
                console.error('Error fetching activation codes:', error);
            }
        };
    
        fetchCodes();
    }, []);

    return (
        <div className="all-codes">
            <Row>
                <Col md={3} lg={2}>
                    <AdminSidebar />
                </Col>
                <Col md={9} lg={10}>
                    {codes.length > 0 ? (
                        <Table striped bordered hover responsive className="my-3">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Cost</th>
                                    <th>Duration</th>
                                    <th>Submitted On</th>
                                    <th>Assigned Decoder</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {codes.map((code, index) => (
                                    <tr key={index}>
                                        <td>{code.code}</td>
                                        <td>${code.cost.toFixed(2)}</td>
                                        <td>{code.duration}</td>
                                        <td>{code.submittedOn}</td>
                                        <td>{code.assignedDecoderId}</td>
                                        <td>{code.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-center my-3">No codes to display</p>
                    )}
                </Col>
            </Row>
        </div>

    )

}

export default AllCodes;
