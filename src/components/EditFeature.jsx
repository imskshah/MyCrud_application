import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router";
import "../css/editfeature.css"

export default function EditFeature (props) 
{
    const { id } = useParams();
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: ''
    })

    const { firstname, lastname, email } = data;

    const handleChange = (e) => {
        setData({...data,  [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/users/${id}`, data);
        props.history.push('/');
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:3001/users/${id}`);
        setData(result.data);
    }

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit} className= 'mt-4 formdata2'>
                <h3 className="edithead">Update Employee</h3>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className="editinput" type="text" placeholder="Enter Name" name= "firstname" value= {firstname} onChange= {handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className="editinput" type="text" placeholder="Enter Username" name= "lastname" value= {lastname} onChange= {handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="editinput" type="email" placeholder="Enter Email" name= "email" value= {email} onChange= {handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">Update</Button>
                </Form>
            </Container>
        </div>
    );
}


