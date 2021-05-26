import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './recipe-view.scss';

import { Link } from 'react-router-dom';

export class RecipeView extends React.Component {

  render() {
    const { recipe, onBackClick } = this.props;

    return (
      <Card bg = 'light'>
        <div className="image-view">
          <Card.Img variant="top" src={recipe.ImagePath} />
        </div>
        <Card.Body>
          <Card.Title>{recipe.Name}</Card.Title>
          <Card.Text className="mb-4">{recipe.Description}</Card.Text>
          <Row>
            <Col>
              <Card.Subtitle className="mb-2 text-muted">Mealtype:</Card.Subtitle>
              {/* <Card.Text>{recipe.MealType.Name}</Card.Text> */}
              <Link to={`/mealtypes/${recipe.MealType.Name}`}>
                <Button className="mb-3" variant="link">{recipe.MealType.Name}</Button>
              </Link>
            </Col>
            <Col>
              <Card.Subtitle className="mb-2 text-muted">Cuisine:</Card.Subtitle>
              {/* <Card.Text>{recipe.Cuisine.Name}</Card.Text> */}
              <Link to={`/cuisines/${recipe.Cuisine.Name}`}>
                <Button className="mb-3" variant="link">{recipe.Cuisine.Name}</Button>
              </Link>
            </Col>
            <Col>
              <Card.Subtitle className="mb-2 text-muted">Difficulty:</Card.Subtitle>
              <Card.Text>{recipe.Difficulty}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
            <Card.Subtitle className="mb-2 text-muted">Time to make:</Card.Subtitle>
            <Card.Text>{recipe.Time}</Card.Text>
            </Col>
            <Col md={8}>
              <Card.Subtitle className="mb-2 text-muted">Key Ingredients:</Card.Subtitle>
              <Card.Text>{recipe.KeyIngredients.join(", ")}</Card.Text>
            </Col>
          </Row>
          <Button className="mt-4" variant="outline-dark" onClick={() => {onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
      
    );
  }
}