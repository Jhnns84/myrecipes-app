import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const formRef = useRef(null);

  const handleRegister = (e) => {
    e.preventDefault();

    formRef.current.reportValidity();
    console.log(formRef.current.reportValidity());

    axios.post('https://jm-myrecipes-api.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data); 
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab   
    })
    .catch(e => {
      console.log('error registering the user')
    });

  };

  return (
    <Row className="main-view justify-content-md-center">
      <Col md={6}>
      <h2>Register to continue</h2>
      <Form ref={formRef} onSubmit={e => e.preventDefault()}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" onChange={e => setBirthday(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleRegister}>
            Submit
          </Button>
        </Form>
        <h6 className="mt-4" >Already have an account?</h6>
        <Link to={`/`}>
            <Button className="mt-2" variant="outline-secondary">Log in here</Button>
          </Link>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  registration: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }).isRequired,
  onRegister: PropTypes.func.isRequired
};
