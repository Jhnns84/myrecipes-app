import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { RecipeCard } from '../recipe-card/recipe-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function RecipesList(props) { 
  const { recipes, visibilityFilter } = props;
  let filteredRecipes = recipes;

  if (visibilityFilter !== '') {
    filteredRecipes = recipes.filter(recipe => recipe.Name.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!recipes) return <div className="main-view"/>;

  return <>
  <Col md={6} style={{ margin: '1em' }}>
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
  </Col>
  <div className="w-100"></div>
  {filteredRecipes.map(recipe => (
    <Col md={3} className="mb-4" key={recipe._id}>
      <RecipeCard recipe={recipe} />
    </Col>
  ))}
  </>;
}

export default connect(mapStateToProps)(RecipesList);