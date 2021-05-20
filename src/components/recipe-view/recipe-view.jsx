import React from 'react';

export class RecipeView extends React.Component {

  render() {
    const { recipe, onBackClick } = this.props;

    return (
      <div className="recipe-view">
        <div className="recipe-image">
          <img src={recipe.ImagePath} />
        </div>
        <div className="recipe-name">
          <span className="label">Name: </span>
          <span className="value">{recipe.Name}</span>
        </div>
        <div className="recipe-description">
          <span className="label">Description: </span>
          <span className="value">{recipe.Description}</span>
        </div>
        <button onClick={() => {onBackClick(null); }}>Back</button>

       </div>
    );
  }
}