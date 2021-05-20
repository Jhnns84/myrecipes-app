import React from 'react';
import PropTypes from 'prop-types';

export class RecipeCard extends React.Component {
  render() {
    const { recipe, onRecipeClick } = this.props;
    
    return (
      <div onClick={() => onRecipeClick(recipe)} className="recipe-card">{recipe.Name}</div>
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
