import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class RecipeCard extends React.Component {
  render() {
    const { recipe, onRecipeClick } = this.props;
    
    return (
      <Card bg = 'light'>
        <Card.Img variant="top" src={recipe.ImagePath} />
        <Card.Body>
          <Card.Title>{recipe.Name}</Card.Title>
          <Card.Text>{recipe.Description}</Card.Text>
          <Button onClick={() => onRecipeClick(recipe)} variant="outline-dark">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Cuisine: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Mealtype: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Difficulty: PropTypes.string.isRequired,
    Time: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    KeyIngredients: PropTypes.array,
    Featured: PropTypes.bool
  }).isRequired,
  onRecipeClick: PropTypes.func.isRequired
};
