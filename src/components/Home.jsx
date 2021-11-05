import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/Home.css'

export default function Home() 
{
    const [list, setList] = useState([]);
    const [searchList, setSearchList] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get('http://localhost:3001/users');
        setList(result.data);
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/users/${id}`);
        loadUsers();
    }

    return (
        <Container>
            <h3 className="mt-3 Employeehead">Employee Details</h3>
            <Form className="mt-3">
                <Row>
                    <Col xs={6}>
                        <Form.Control value= {searchList} onChange={(e) => setSearchList(e.target.value)} placeholder="Search" className="searchinput"/>
                    </Col>
                    <Col>
                        <Link to= "/create"><Button variant="primary" className="addbutton">Add Employee</Button></Link>
                    </Col>
                </Row>
            </Form>
            <Table className="striped bordered mt-3">
                <thead className= "table-dark">
                    <tr>
                        <th style= {{paddingLeft: '15px'}}>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th style= {{paddingLeft: '15px'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.filter(item => {
                        const firstname = item.firstname.toLowerCase().includes(searchList.toLowerCase())
                        const lastname = item.lastname.toLowerCase().includes(searchList.toLowerCase())
                        const email = item.email.toLowerCase().includes(searchList.toLowerCase())
                        return firstname || lastname || email
                    }).map((item, index) => {
                        return(
                            <tr>
                                <th style={{paddingTop:"20px",paddingLeft: '16px' }}>{item.id}</th>
                                <td style={{paddingTop:"20px"}}>{item.firstname}</td>
                                <td style={{paddingTop:"20px"}}>{item.lastname}</td>
                                <td style={{paddingTop:"20px"}}>{item.email}</td>
                                <td>
                                    <Link to= {`/update/${item.id}`}>
                                        <Button style= {{margin: '5px'}} variant="secondary">Edit</Button>
                                    </Link>
                                    <Button style= {{margin: '5px'}} variant="danger" onClick= {() => handleDelete(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
}


