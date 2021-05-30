import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './recipe-card.scss';

import { Link } from 'react-router-dom';

export class RecipeCard extends React.Component {
  render() {
    const { recipe } = this.props;
    
    return (
      <Card bg = 'light'>
        {/* <Card.Img variant="top" src={recipe.ImagePath} /> */}
        <div className="image-wrapper">
          <img src={recipe.ImagePath} />
        </div>
        <Card.Body>
          <Card.Title>{recipe.Name}</Card.Title>
          {/* <Card.Text className="recipe-text">{recipe.Description}</Card.Text> */}
          <Link to={`/recipes/${recipe._id}`}>
            <Button variant="outline-dark">Open</Button>
          </Link>
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
  }).isRequired
};
