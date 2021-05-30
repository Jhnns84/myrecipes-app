import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    formRef.current.reportValidity();
    console.log(formRef.current.reportValidity());
    
    /* Send a request to the server for authentication*/

    axios.post('https://jm-myrecipes-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };



  return (
    <Row className="login-view justify-content-md-center">
      <Col md={6}>
        <h2>Please log in to continue</h2>
        <Form ref={formRef} onSubmit={e => e.preventDefault()}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} required/>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit} >
            Submit
          </Button>
        </Form>
        <h6 className="mt-4" >If you don't have an account:</h6>
        <Link to={`/register/`}>
            <Button className="mt-2" variant="outline-secondary">Register here</Button>
          </Link>
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
