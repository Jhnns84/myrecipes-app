import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export class RecipeView extends React.Component {

  render() {
    const { recipe, onBackClick } = this.props;

    return (
      <Card bg = 'light'>
        <Card.Img variant="top" src={recipe.ImagePath} />
        <Card.Body>
          <Card.Title>{recipe.Name}</Card.Title>
          <Card.Text>{recipe.Description}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Mealtype:</Card.Subtitle>
          <Card.Text>{recipe.MealType.Name}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Cuisine:</Card.Subtitle>
          <Card.Text>{recipe.Cuisine.Name}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Difficulty:</Card.Subtitle>
          <Card.Text>{recipe.Difficulty}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Time to make:</Card.Subtitle>
          <Card.Text>{recipe.Time}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Key Ingredients:</Card.Subtitle>
          <Card.Text>{recipe.KeyIngredients.join(", ")}</Card.Text>
          <Button variant="outline-dark" onClick={() => {onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
      
    );
  }
}