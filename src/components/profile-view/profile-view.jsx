import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import axios from 'axios';

export function ProfileView(props) {
  
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://jm-myrecipes-api.herokuapp.com/users/${user}`, {
    headers: { Authorization: `Bearer ${token}`} });
  };

  React.useEffect(() => {
    getUser();
  }, []);
  
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');



  const handleChange = (e) => {
    e.preventDefault();
    axios.put(`https://jm-myrecipes-api.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
      }, { 
        headers: { Authorization: `Bearer ${token}`} 
        }
      )
    .then(response => {
      const data = response.data;
      console.log(data); 
      localStorage.setItem('user', data.Username);
      window.open('/profile', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab   
    })
    .catch(e => {
      console.log('error updating the user-data')
    });
  };

  const deleteUser = (e) => {
    e.preventDefault();
    axios.delete(`https://jm-myrecipes-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error deleting the user')
    });
  };

  return (
    <Row className="main-view justify-content-md-center">
      <Col md={12}>
        <h1 className="mb-4">{user}'s Profile</h1>
        <Col md={8}>
        <Form>
          <h4>Change user details</h4>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Change username" onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Change password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" placeholder="Change email" onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleChange}>
            Submit
          </Button>
        </Form>
        <div className="mt-4">
          <h4>Delete user profile</h4>
        </div>
        
        <Button variant="danger" type="submit" onClick={deleteUser}>
          Delete
        </Button>
          </Col>
      </Col>
    </Row>
  );
}

// ProfileView.propTypes = {
//   registration: PropTypes.shape({
//     Username: PropTypes.string.isRequired,
//     Password: PropTypes.string.isRequired,
//     Email: PropTypes.string.isRequired,
//     Birthday: PropTypes.string.isRequired
//   }).isRequired,
//   onRegister: PropTypes.func.isRequired
// };



// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import { Link } from 'react-router-dom';

// export class ProfileView extends React.Component {

//   render() {
//     const { user } = this.props;

//     return (
//       <Card bg = 'light'>
//         <Card.Body>
//           <Card.Title>{this.props.user}'s profile</Card.Title>
            
//         </Card.Body>
        
//       </Card>
      
//     );
//   }
// }