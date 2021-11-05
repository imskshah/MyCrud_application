import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Container from "react-bootstrap/Container";
import '../css/addfeature.css'

export default function AddFeature (props) 
{
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
        if(firstname == '' || lastname == '' || email == '') {
            alert('All fields are required')
        } else {
            await axios.post('http://localhost:3001/users', data);
            props.history.push('/');
        }
    }

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit} className= 'mt-4 formdata'>
                <h3 className="addhead">Create User</h3>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className="addinput" type="text" placeholder="First Name" name= "firstname" value= {firstname} onChange= {handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className="addinput" type="text" placeholder="Last Name" name= "lastname" value= {lastname} onChange= {handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="addinput" type="email" placeholder="Email" name= "email" value= {email} onChange= {handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">Add</Button>
                </Form>
            </Container>
        </div>
    );
}

 
