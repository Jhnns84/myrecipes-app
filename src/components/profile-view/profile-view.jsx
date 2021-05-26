import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

  render() {
    const { user, onBackClick } = this.props;

    return (
      <Card bg = 'light'>
        <Card.Body>
          <Card.Title>{user.Userame}</Card.Title>
          
          <Button className="mt-4" variant="outline-dark" onClick={() => {onBackClick(null); }}>Back</Button>
        </Card.Body>
        
      </Card>
      
    );
  }
}