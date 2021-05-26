import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MealTypeView extends React.Component {

  render() {
    const { mealtypes, onBackClick } = this.props;

    return (
      <Card bg = 'light'>
        <Card.Body>
          <Card.Title>{mealtypes.Name}</Card.Title>
          <Card.Text>{mealtypes.Description}</Card.Text>
          <Button variant="outline-dark" onClick={() => {onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
      
    );
  }
}