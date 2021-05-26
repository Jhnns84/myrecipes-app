import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class CuisineView extends React.Component {

  render() {
    const { cuisines, onBackClick } = this.props;

    return (
      <Card bg = 'light'>
        <Card.Body>
          <Card.Title>{cuisines.Name}</Card.Title>
          <Card.Text>{cuisines.Description}</Card.Text>
          <Button variant="outline-dark" onClick={() => {onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
      
    );
  }
}